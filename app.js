/* ==========================================
   SAGAR OS — CORE OPERATING SYSTEM LOGIC
   ========================================== */

// Global App State
const state = {
  theme: 'dark',
  personality: 'win', // win, mac, linux
  openWindows: new Set(),
  activeWindow: null,
  mobileActiveApp: null,
  currentFmFolder: 'root' // root, certs, projects, docs
};

let topZIndex = 100;

// Helper: check if device is mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initSystem();
});

function initSystem() {
  // Sync clocks initially and run interval
  syncClocks();
  setInterval(syncClocks, 1000);

  // Setup OS personalization and initial state
  loadSettings();
  setupEnvironment();

  // Populate data in all components
  populateData();

  // Bind event listeners
  bindEvents();

}

/* --- Environment & Setup --- */
function setupEnvironment() {
  const isMob = isMobile();
  const mobEnv = document.getElementById('mobile-env');
  const deskEnv = document.getElementById('desktop-env');

  if (isMob) {
    mobEnv.classList.remove('hidden');
    deskEnv.classList.add('hidden');
    // Hide macOS dock if present
    const macDock = document.getElementById('taskbar-dock-mac');
    if (macDock) macDock.remove();
  } else {
    deskEnv.classList.remove('hidden');
    mobEnv.classList.add('hidden');
    handleOSPersonalityChange(state.personality);
  }
}

// Window resizing listener
window.addEventListener('resize', () => {
  setupEnvironment();
});

// Load settings from localStorage if available, or use defaults
function loadSettings() {
  state.theme = localStorage.getItem('sagar-os-theme') || 'dark';
  state.personality = localStorage.getItem('sagar-os-personality') || 'win';
  
  // Apply initial theme classes
  applyTheme(state.theme);
}

function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('sagar-os-theme', theme);
  
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  } else {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }
}

/* --- Populators --- */
function populateData() {
  // 1. About Me content
  document.getElementById('about-summary-text').textContent = PORTFOLIO_DATA.profile.summary;
  
  // Education timeline in About
  const eduTimeline = document.getElementById('about-education-timeline');
  eduTimeline.innerHTML = PORTFOLIO_DATA.education.map(edu => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-title">${edu.degree}</div>
      <div class="timeline-subtitle">${edu.institution} (${edu.duration})</div>
      <div class="timeline-desc">${edu.details}</div>
    </div>
  `).join('');

  // 2. Projects Explorer List
  const projList = document.getElementById('projects-sidebar-list');
  projList.innerHTML = PORTFOLIO_DATA.projects.map((proj, idx) => `
    <button class="project-nav-item ${idx === 0 ? 'active' : ''}" data-id="${proj.id}" onclick="appManager.selectProject('${proj.id}')">
      <span class="project-nav-name">${proj.name}</span>
      <span class="project-nav-tech">${proj.tech.slice(0, 3).join(' • ')}</span>
    </button>
  `).join('');
  
  // Load initial project details
  if (PORTFOLIO_DATA.projects.length > 0) {
    appManager.selectProject(PORTFOLIO_DATA.projects[0].id);
  }

  // 2b. Technical Events Explorer List
  const techEventsList = document.getElementById('tech-events-sidebar-list');
  if (techEventsList && PORTFOLIO_DATA.technicalEvents) {
    techEventsList.innerHTML = PORTFOLIO_DATA.technicalEvents.map((event, idx) => `
      <button class="project-nav-item ${idx === 0 ? 'active' : ''}" data-id="${event.id}" onclick="appManager.selectTechnicalEvent('${event.id}')">
        <span class="project-nav-name">${event.name}</span>
        <span class="project-nav-tech">${event.tech.slice(0, 3).join(' • ')}</span>
      </button>
    `).join('');
    
    // Load initial technical event details
    if (PORTFOLIO_DATA.technicalEvents.length > 0) {
      appManager.selectTechnicalEvent(PORTFOLIO_DATA.technicalEvents[0].id);
    }
  }

  // 3. Certificates viewer
  const certContainer = document.getElementById('cert-list-container');
  if (certContainer) {
    const techCerts = PORTFOLIO_DATA.certificates.filter(c => c.category === 'technical');
    const eventCerts = PORTFOLIO_DATA.certificates.filter(c => c.category === 'events');

    let html = `
      <div class="cert-section-header" style="font-weight:700; margin:5px 0 10px 0; color:var(--color-teal); border-bottom:1px solid var(--border-color); padding-bottom:4px; font-size:12px;">Technical & Internship Certificates</div>
      ${techCerts.map(cert => `
        <div class="cert-row">
          <div class="cert-info">
            <span class="cert-icon">🏆</span>
            <div>
              <div class="cert-name">${cert.name}</div>
              <div class="cert-issuer">${cert.issuer} (${cert.date})</div>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')">View</button>
        </div>
      `).join('')}

      <div class="cert-section-header" style="font-weight:700; margin:20px 0 10px 0; color:var(--color-emerald); border-bottom:1px solid var(--border-color); padding-bottom:4px; font-size:12px;">Events & Activities Certificates</div>
      ${eventCerts.map(cert => `
        <div class="cert-row">
          <div class="cert-info">
            <span class="cert-icon">🎗️</span>
            <div>
              <div class="cert-name">${cert.name}</div>
              <div class="cert-issuer">${cert.issuer} (${cert.date})</div>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')">View</button>
        </div>
      `).join('')}
    `;
    certContainer.innerHTML = html;
  }

  // 4. File Manager
  appManager.renderFileManagerFolder('root');

  // 5. Chatbot greeting
  const chatMessages = document.getElementById('chat-messages-container');
  chatMessages.innerHTML = `
    <div class="chat-bubble chat-bubble-bot">${PORTFOLIO_DATA.askMeAnswers.greeting}</div>
  `;
  appManager.renderChatChips();

  // 6. Recruiter Mode fields
  document.getElementById('recruiter-about-text').innerHTML = PORTFOLIO_DATA.profile.summary + ' <span class="recruiter-action-arrow" onclick="appManager.handleRecruiterLink(\'about\')" title="Open About Candidate App">↗</span>';
  
  // Skills list in Recruiter
  const recruiterSkills = document.getElementById('recruiter-skills-container');
  recruiterSkills.innerHTML = PORTFOLIO_DATA.skills.map(sk => `
    <div class="recruiter-skill-wrapper">
      <div class="recruiter-skill-cat">${sk.category}</div>
      <div class="recruiter-skill-items">
        ${sk.items.map(item => `<span class="tech-badge">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // Experience list in Recruiter
  const recruiterExp = document.getElementById('recruiter-experience-container');
  recruiterExp.innerHTML = PORTFOLIO_DATA.experience.map(exp => {
    const redirectAttr = (exp.redirectType && exp.redirectId)
      ? `<span class="recruiter-action-arrow" onclick="appManager.handleRecruiterLink('${exp.redirectType}', '${exp.redirectId}')" title="View Related Details">↗</span>`
      : '';
    return `
      <div class="recruiter-exp-item">
        <div class="recruiter-exp-header">
          <span class="recruiter-exp-role">${exp.role} ${redirectAttr}</span>
          <span class="recruiter-exp-dur">${exp.duration}</span>
        </div>
        <div class="recruiter-exp-company">${exp.company}</div>
        <ul class="recruiter-exp-highlights">
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');

  // Projects list in Recruiter
  const recruiterProj = document.getElementById('recruiter-projects-container');
  recruiterProj.innerHTML = PORTFOLIO_DATA.projects.map(proj => `
    <div class="recruiter-project-card">
      <div class="recruiter-project-title">${proj.name} — ${proj.subtitle} <span class="recruiter-action-arrow" onclick="appManager.handleRecruiterLink('projects', '${proj.id}')" title="View Project Details">↗</span></div>
      <div class="recruiter-project-tech">Tech: ${proj.tech.join(', ')}</div>
      <p class="recruiter-project-desc">${proj.purpose}</p>
    </div>
  `).join('');

  // Technical Events list in Recruiter
  const recruiterTechEvents = document.getElementById('recruiter-tech-events-container');
  if (recruiterTechEvents && PORTFOLIO_DATA.technicalEvents) {
    recruiterTechEvents.innerHTML = PORTFOLIO_DATA.technicalEvents.map(event => `
      <div class="recruiter-project-card">
        <div class="recruiter-project-title">${event.name} — ${event.subtitle} <span class="recruiter-action-arrow" onclick="appManager.handleRecruiterLink('tech-events', '${event.id}')" title="View Event Details">↗</span></div>
        <div class="recruiter-project-tech">Tech: ${event.tech.join(', ')}</div>
        <p class="recruiter-project-desc">${event.purpose}</p>
      </div>
    `).join('');
  }

  // Education list in Recruiter
  const recruiterEdu = document.getElementById('recruiter-education-container');
  recruiterEdu.innerHTML = PORTFOLIO_DATA.education.map(edu => `
    <div class="recruiter-edu-item">
      <div class="recruiter-edu-degree">${edu.degree}</div>
      <div class="recruiter-edu-inst">${edu.institution} | ${edu.duration}</div>
    </div>
  `).join('');

  // Certifications list in Recruiter
  const recruiterCerts = document.getElementById('recruiter-certs-container');
  if (recruiterCerts) {
    recruiterCerts.innerHTML = PORTFOLIO_DATA.certificates.map(cert => `
      <div class="recruiter-cert-item" style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span>${cert.category === 'technical' ? '🏆' : '🎗️'} ${cert.name}</span>
          <span class="text-secondary" style="margin-left: 8px;">${cert.issuer} (${cert.date})</span>
        </div>
        <span class="recruiter-action-arrow" onclick="appManager.handleRecruiterLink('certificates', '${cert.pdfUrl}')" title="View Certificate PDF">↗</span>
      </div>
    `).join('');
  }
}

/* --- Clock and Date synchronizations --- */
function syncClocks() {
  const now = new Date();
  
  // Format Time: e.g. 12:45 PM
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const timeStr = `${hours}:${minutes} ${ampm}`;
  
  // Format Date: e.g. Sunday, August 16
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateStr = now.toLocaleDateString('en-US', options);

  // Update Desktop Clock
  const deskClock = document.getElementById('system-clock-display');
  if (deskClock) {
    deskClock.innerHTML = `<div>${timeStr}</div><div style="font-size: 10px; text-align: right; opacity: 0.7;">${dateStr}</div>`;
  }

  // Update Mobile Clock
  const mobClock = document.getElementById('mobile-clock');
  if (mobClock) {
    mobClock.textContent = `${hours}:${minutes}`;
  }
}

/* --- Action Listeners & Event Bindings --- */
function bindEvents() {
  // Desktop Shortcut Clicks
  const shortcuts = [
    { id: 'shortcut-about', winId: 'about' },
    { id: 'shortcut-projects', winId: 'projects' },
    { id: 'shortcut-tech-events', winId: 'tech-events' },
    { id: 'shortcut-files', winId: 'files' },
    { id: 'shortcut-askme', winId: 'askme' },
    { id: 'shortcut-certificates', winId: 'certificates' },
    { id: 'shortcut-creative', winId: 'creative' },
    { id: 'shortcut-settings', winId: 'settings' }
  ];

  shortcuts.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) {
      el.addEventListener('click', () => appManager.openWindow(s.winId));
    }
  });

  // Resume Shortcut
  const resumeShortcut = document.getElementById('shortcut-resume');
  if (resumeShortcut) {
    resumeShortcut.addEventListener('click', () => {
      appManager.previewPDF(PORTFOLIO_DATA.profile.resumeUrl, "Sagar G Resume");
    });
  }

  // LinkedIn and GitHub Desktop Shortcuts
  const linkedinShortcut = document.getElementById('shortcut-linkedin');
  if (linkedinShortcut) {
    linkedinShortcut.addEventListener('click', () => {
      window.open(PORTFOLIO_DATA.profile.linkedin, '_blank');
    });
  }
  const githubShortcut = document.getElementById('shortcut-github');
  if (githubShortcut) {
    githubShortcut.addEventListener('click', () => {
      window.open(PORTFOLIO_DATA.profile.github, '_blank');
    });
  }

  const locationShortcut = document.getElementById('shortcut-location');
  if (locationShortcut) {
    locationShortcut.addEventListener('click', () => {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PORTFOLIO_DATA.profile.location)}`;
      window.open(mapsUrl, '_blank');
    });
  }

  // LinkedIn and GitHub Mobile Shortcuts
  const mobLinkedin = document.getElementById('mobile-app-linkedin');
  if (mobLinkedin) {
    mobLinkedin.addEventListener('click', () => {
      window.open(PORTFOLIO_DATA.profile.linkedin, '_blank');
    });
  }
  const mobGithub = document.getElementById('mobile-app-github');
  if (mobGithub) {
    mobGithub.addEventListener('click', () => {
      window.open(PORTFOLIO_DATA.profile.github, '_blank');
    });
  }

  // Recruiter Dashboard Shortcut
  const recruiterShortcut = document.getElementById('shortcut-recruiter');
  if (recruiterShortcut) {
    recruiterShortcut.addEventListener('click', () => toggleRecruiterMode(true));
  }
  const recruiterTray = document.getElementById('tray-recruiter-shortcut');
  if (recruiterTray) {
    recruiterTray.addEventListener('click', () => toggleRecruiterMode(true));
  }
  const recruiterClose = document.getElementById('btn-close-recruiter');
  if (recruiterClose) {
    recruiterClose.addEventListener('click', () => toggleRecruiterMode(false));
  }

  // Start Menu controls
  const startBtn = document.getElementById('taskbar-start');
  const startMenu = document.getElementById('start-menu');
  if (startBtn && startMenu) {
    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startMenu.classList.toggle('hidden');
    });
    
    // Clicking outside start menu closes it
    document.addEventListener('click', () => {
      startMenu.classList.add('hidden');
    });
    
    startMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  const startRecruiterBtn = document.getElementById('start-btn-recruiter');
  if (startRecruiterBtn) {
    startRecruiterBtn.addEventListener('click', () => {
      startMenu.classList.add('hidden');
      toggleRecruiterMode(true);
    });
  }

  // Window System Controls Binding (Close, Min, Max, Active click)
  const windows = document.querySelectorAll('.window');
  windows.forEach(win => {
    const winId = win.id.replace('win-', '');
    
    // Close button
    const closeBtn = win.querySelector('.win-btn-close');
    if (closeBtn) closeBtn.addEventListener('click', () => appManager.closeWindow(winId));

    // Minimize button
    const minBtn = win.querySelector('.win-btn-minimize');
    if (minBtn) minBtn.addEventListener('click', () => appManager.minimizeWindow(winId));

    // Maximize button
    const maxBtn = win.querySelector('.win-btn-maximize');
    if (maxBtn) maxBtn.addEventListener('click', () => appManager.maximizeWindow(winId));

    // Focus on click
    win.addEventListener('mousedown', () => appManager.focusWindow(winId));

    // Make windows draggable & resizable
    setupDraggable(win);
    setupResizable(win);
  });

  // Theme Settings Bindings
  const themeChoices = document.querySelectorAll('.btn-theme-choice');
  themeChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      themeChoices.forEach(c => c.classList.remove('active'));
      choice.classList.add('active');
      applyTheme(choice.dataset.theme);
    });
  });

  // OS Style Personalities Bindings
  const personalityChoices = document.querySelectorAll('.btn-personality-choice');
  personalityChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      personalityChoices.forEach(c => c.classList.remove('active'));
      choice.classList.add('active');
      const style = choice.dataset.style;
      state.personality = style;
      localStorage.setItem('sagar-os-personality', style);
      handleOSPersonalityChange(style);
    });
  });

  // About App buttons inside window
  const aboutResumeBtn = document.getElementById('btn-about-resume');
  if (aboutResumeBtn) {
    aboutResumeBtn.addEventListener('click', () => {
      appManager.previewPDF(PORTFOLIO_DATA.profile.resumeUrl, "Sagar G Resume");
    });
  }
  const aboutContactBtn = document.getElementById('btn-about-contact');
  if (aboutContactBtn) {
    aboutContactBtn.addEventListener('click', () => {
      appManager.openWindow('askme');
      appManager.simulateBotResponse('contact');
    });
  }

  // Chatbot Form Submit
  const chatForm = document.getElementById('chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const textEl = document.getElementById('chat-input-text');
      const text = textEl.value.trim();
      if (!text) return;
      
      textEl.value = '';
      appManager.sendUserMessage(text);
    });
  }

  // PDF Previewer Close button
  const pdfCloseBtn = document.getElementById('pdf-modal-close');
  if (pdfCloseBtn) {
    pdfCloseBtn.addEventListener('click', () => {
      const modal = document.getElementById('pdf-viewer-modal');
      modal.classList.add('hidden');
      document.getElementById('pdf-viewer-frame').src = '';
      const imgEl = document.getElementById('pdf-viewer-img');
      if (imgEl) imgEl.src = '';
    });
  }

  // ==================== MOBILE INTERFACE EVENT BINDINGS ====================
  
  // Mobile Widget Profile click
  const mobProfileWidget = document.getElementById('mobile-profile-widget');
  if (mobProfileWidget) {
    mobProfileWidget.addEventListener('click', () => {
      document.getElementById('mobile-profile-summary').textContent = PORTFOLIO_DATA.profile.summary;
      document.getElementById('mobile-profile-modal').classList.remove('hidden');
    });
  }
  
  const mobProfileClose = document.getElementById('mobile-profile-close');
  if (mobProfileClose) {
    mobProfileClose.addEventListener('click', () => {
      document.getElementById('mobile-profile-modal').classList.add('hidden');
    });
  }

  // Mobile apps launcher binding
  const mobileApps = [
    { id: 'mobile-app-askme', type: 'askme' },
    { id: 'mobile-app-projects', type: 'projects' },
    { id: 'mobile-app-tech-events', type: 'technical-events' },
    { id: 'mobile-app-files', type: 'files' },
    { id: 'mobile-app-certificates', type: 'certificates' },
    { id: 'mobile-app-creative', type: 'creative' },
    { id: 'mobile-app-settings', type: 'settings' }
  ];

  mobileApps.forEach(app => {
    const el = document.getElementById(app.id);
    if (el) {
      el.addEventListener('click', () => appManager.openMobileApp(app.type));
    }
  });

  // Mobile Bottom Dock Action sheets
  const phoneBtn = document.getElementById('mobile-dock-phone');
  if (phoneBtn) {
    phoneBtn.addEventListener('click', () => {
      appManager.showMobileActionSheet('Contact Number', PORTFOLIO_DATA.profile.phone, [
        { label: `Call: ${PORTFOLIO_DATA.profile.phone}`, action: () => window.open(`tel:${PORTFOLIO_DATA.profile.phone}`) },
        { label: 'Copy Number', action: () => copyText(PORTFOLIO_DATA.profile.phone) }
      ]);
    });
  }

  const emailBtn = document.getElementById('mobile-dock-email');
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      appManager.showMobileActionSheet('Email Address', PORTFOLIO_DATA.profile.email, [
        { label: 'Send Email', action: () => window.open(`mailto:${PORTFOLIO_DATA.profile.email}`) },
        { label: 'Copy Email Address', action: () => copyText(PORTFOLIO_DATA.profile.email) }
      ]);
    });
  }

  const locationApp = document.getElementById('mobile-app-location');
  if (locationApp) {
    locationApp.addEventListener('click', () => {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PORTFOLIO_DATA.profile.location)}`;
      appManager.showMobileActionSheet('Location', PORTFOLIO_DATA.profile.location, [
        { label: 'Open in Maps', action: () => window.open(mapsUrl, '_blank') },
        { label: 'Copy Location Text', action: () => copyText(PORTFOLIO_DATA.profile.location) }
      ]);
    });
  }

  // Bind dock Ask Me and Files
  const dockAskme = document.getElementById('mobile-dock-askme');
  if (dockAskme) dockAskme.addEventListener('click', () => appManager.openMobileApp('askme'));
  const dockFiles = document.getElementById('mobile-dock-files');
  if (dockFiles) dockFiles.addEventListener('click', () => appManager.openMobileApp('files'));

  // Mobile Back Button
  const mobBack = document.getElementById('mobile-app-back');
  if (mobBack) {
    mobBack.addEventListener('click', () => {
      document.getElementById('mobile-app-overlay').classList.add('hidden');
      state.mobileActiveApp = null;
    });
  }

  // Mobile Recruiter Widget
  const mobRecruiterWidget = document.getElementById('mobile-recruiter-widget');
  if (mobRecruiterWidget) {
    mobRecruiterWidget.addEventListener('click', () => toggleRecruiterMode(true));
  }

  // Mobile Resume app Grid Icon
  const mobResume = document.getElementById('mobile-app-resume');
  if (mobResume) {
    mobResume.addEventListener('click', () => {
      appManager.previewPDF(PORTFOLIO_DATA.profile.resumeUrl, "Sagar G Resume");
    });
  }

  // Cancel action sheet
  const actionSheetCancel = document.getElementById('action-sheet-cancel');
  if (actionSheetCancel) {
    actionSheetCancel.addEventListener('click', () => {
      document.getElementById('action-sheet-modal').classList.add('hidden');
    });
  }

  // Profile Picture Fullscreen Viewer (Lightbox)
  const lightboxModal = document.getElementById('image-lightbox-modal');
  const lightboxImg = document.getElementById('image-lightbox-src');
  const lightboxClose = document.getElementById('lightbox-close-btn');

  document.body.addEventListener('click', (e) => {
    const avatar = e.target.closest('.about-avatar, .start-avatar, .widget-avatar, .recruiter-avatar, .mobile-profile-avatar');
    if (avatar && lightboxModal && lightboxImg) {
      lightboxImg.src = avatar.src;
      lightboxModal.classList.remove('hidden');
    }
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.add('hidden');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.add('hidden');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && !lightboxModal.classList.contains('hidden')) {
      lightboxModal.classList.add('hidden');
    }
  });
}

/* --- Drag & Resize Window Implementations --- */
function setupDraggable(win) {
  const header = win.querySelector('.window-header');
  if (!header) return;

  header.addEventListener('mousedown', dragStart);

  function dragStart(e) {
    // Don't drag on window controls
    if (e.target.closest('.win-btn')) return;
    if (win.classList.contains('maximized')) return;

    appManager.focusWindow(win.id.replace('win-', ''));

    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const rect = win.getBoundingClientRect();
    const startLeft = rect.left;
    const startTop = rect.top;

    document.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', dragEnd);

    function dragging(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      win.style.left = `${startLeft + dx}px`;
      win.style.top = `${startTop + dy}px`;
    }

    function dragEnd() {
      document.removeEventListener('mousemove', dragging);
      document.removeEventListener('mouseup', dragEnd);
    }
  }

  // Double click header to maximize
  header.addEventListener('dblclick', (e) => {
    if (e.target.closest('.win-btn')) return;
    appManager.maximizeWindow(win.id.replace('win-', ''));
  });
}

function setupResizable(win) {
  // Add a resize handle in CSS via pseudo element ::after
  win.classList.add('window-resizable');

  win.addEventListener('mousedown', resizeStart);

  function resizeStart(e) {
    const rect = win.getBoundingClientRect();
    const isNearBottomRight = (e.clientX > rect.right - 16) && (e.clientY > rect.bottom - 16);
    
    if (!isNearBottomRight) return;
    if (win.classList.contains('maximized')) return;

    appManager.focusWindow(win.id.replace('win-', ''));
    e.preventDefault();

    const startWidth = rect.width;
    const startHeight = rect.height;
    const startX = e.clientX;
    const startY = e.clientY;

    document.addEventListener('mousemove', resizing);
    document.addEventListener('mouseup', resizeEnd);

    function resizing(e) {
      const dw = e.clientX - startX;
      const dh = e.clientY - startY;
      
      const newWidth = Math.max(320, startWidth + dw);
      const newHeight = Math.max(240, startHeight + dh);
      
      win.style.width = `${newWidth}px`;
      win.style.height = `${newHeight}px`;
    }

    function resizeEnd() {
      document.removeEventListener('mousemove', resizing);
      document.removeEventListener('mouseup', resizeEnd);
    }
  }
}

/* --- Recruiter Mode Toggle --- */
function toggleRecruiterMode(active) {
  const recEnv = document.getElementById('recruiter-env');
  const isMob = isMobile();

  if (active) {
    recEnv.classList.remove('hidden');
    document.getElementById('desktop-env').classList.add('hidden');
    document.getElementById('mobile-env').classList.add('hidden');
  } else {
    recEnv.classList.add('hidden');
    if (isMob) {
      document.getElementById('mobile-env').classList.remove('hidden');
    } else {
      document.getElementById('desktop-env').classList.remove('hidden');
    }
  }
}

/* --- OS Personalities Toggler --- */
function handleOSPersonalityChange(personality) {
  // Remove existing personalities
  document.body.classList.remove('win-personality', 'mac-personality', 'linux-personality');
  document.body.classList.add(`${personality}-personality`);
  
  // Manage macOS Menu Bar & Dock
  const topMenuBar = document.getElementById('mac-top-bar');
  if (topMenuBar) topMenuBar.remove();
  const macDock = document.getElementById('taskbar-dock-mac');
  if (macDock) macDock.remove();

  if (personality === 'mac') {
    // 1. Create top menu bar
    const menuBar = document.createElement('div');
    menuBar.id = 'mac-top-bar';
    menuBar.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:28px; background:var(--glass-bg); backdrop-filter:blur(var(--glass-blur)); -webkit-backdrop-filter:blur(var(--glass-blur)); border-bottom:1px solid var(--border-color); display:flex; align-items:center; justify-content:space-between; padding:0 16px; z-index:997; font-size:12px; font-weight:500;';
    menuBar.innerHTML = `
      <div style="display:flex; gap:16px;">
        <span style="font-weight:700;"></span>
        <span style="font-weight:600;">Sagar OS</span>
        <span class="text-secondary" style="cursor:pointer;" onclick="appManager.openWindow('about')">About</span>
        <span class="text-secondary" style="cursor:pointer;" onclick="appManager.openWindow('projects')">Projects</span>
        <span class="text-secondary" style="cursor:pointer;" onclick="appManager.openWindow('tech-events')">Exhibitions</span>
        <span class="text-secondary" style="cursor:pointer;" onclick="appManager.openWindow('askme')">Ask Me AI</span>
      </div>
      <div id="mac-clock-area" style="font-weight:500; font-size:12px; opacity:0.8;"></div>
    `;
    document.getElementById('desktop-env').prepend(menuBar);

    // Clock update specifically for Mac menu bar
    const macClock = document.getElementById('mac-clock-area');
    const updateMacClock = () => {
      const d = new Date();
      macClock.textContent = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };
    updateMacClock();
    setInterval(updateMacClock, 1000);

    // 2. Hide Windows standard taskbar and create macOS Dock
    document.getElementById('desktop-taskbar').style.display = 'none';

    const dock = document.createElement('div');
    dock.id = 'taskbar-dock-mac';
    dock.innerHTML = `
      <button class="mac-dock-item" onclick="appManager.openWindow('about')" title="About Me" style="font-size:24px;">👤</button>
      <button class="mac-dock-item" onclick="appManager.openWindow('projects')" title="Projects" style="font-size:24px;">💻</button>
      <button class="mac-dock-item" onclick="appManager.openWindow('tech-events')" title="Technical Events & Activities" style="font-size:24px;">🏆</button>
      <button class="mac-dock-item" onclick="appManager.openWindow('files')" title="Files" style="font-size:24px;">📁</button>
      <button class="mac-dock-item" onclick="appManager.openWindow('askme')" title="Ask Me Assistant" style="font-size:24px;">🤖</button>
      <button class="mac-dock-item" onclick="appManager.openWindow('certificates')" title="Certificates" style="font-size:24px;">🏆</button>
      <button class="mac-dock-item" onclick="appManager.openWindow('settings')" title="Settings" style="font-size:24px;">⚙️</button>
      <button class="mac-dock-item" onclick="window.open(PORTFOLIO_DATA.profile.linkedin, '_blank')" title="LinkedIn Profile" style="font-size:24px;">🔗</button>
      <button class="mac-dock-item" onclick="window.open(PORTFOLIO_DATA.profile.github, '_blank')" title="GitHub Profile" style="font-size:24px;">🐙</button>
      <div style="width:1px; height:32px; background:rgba(255,255,255,0.2); margin:0 4px;"></div>
      <button class="mac-dock-item" onclick="toggleRecruiterMode(true)" title="Recruiter Mode" style="font-size:24px;">👔</button>
    `;
    document.getElementById('desktop-env').appendChild(dock);

    // Style dock items
    const dockItems = dock.querySelectorAll('.mac-dock-item');
    dockItems.forEach(item => {
      item.style.cssText = 'transition: transform 0.2s ease; width: 44px; height: 44px; display:flex; align-items:center; justify-content:center;';
      item.addEventListener('mouseenter', () => item.style.transform = 'scale(1.2) translateY(-6px)');
      item.addEventListener('mouseleave', () => item.style.transform = 'none');
    });

  } else {
    // Restore default Windows taskbar
    document.getElementById('desktop-taskbar').style.display = 'flex';
  }
}

/* --- Copy to Clipboard helper --- */
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

/* ==================== APPLICATION MANAGER ==================== */
const appManager = {
  
  // Open window in Desktop mode
  openWindow(id) {
    const win = document.getElementById(`win-${id}`);
    if (!win) return;

    win.classList.remove('hidden');
    win.classList.remove('minimized');
    state.openWindows.add(id);

    // Render taskbar tabs
    this.renderTaskbarTabs();
    this.focusWindow(id);
  },

  // Close window in Desktop mode
  closeWindow(id) {
    const win = document.getElementById(`win-${id}`);
    if (!win) return;

    win.classList.add('hidden');
    state.openWindows.delete(id);
    if (state.activeWindow === id) {
      state.activeWindow = null;
    }

    this.renderTaskbarTabs();
  },

  // Minimize window
  minimizeWindow(id) {
    const win = document.getElementById(`win-${id}`);
    if (!win) return;
    
    win.classList.add('minimized');
    this.renderTaskbarTabs();
  },

  // Maximize / Restore Window size
  maximizeWindow(id) {
    const win = document.getElementById(`win-${id}`);
    if (!win) return;
    
    win.classList.toggle('maximized');
  },

  // Bring window to the front
  focusWindow(id) {
    const win = document.getElementById(`win-${id}`);
    if (!win) return;

    // Focus class manipulation
    document.querySelectorAll('.window').forEach(w => {
      w.classList.remove('window-active');
    });
    
    topZIndex++;
    win.style.zIndex = topZIndex;
    win.classList.add('window-active');
    state.activeWindow = id;

    this.renderTaskbarTabs();
  },

  // Render open windows tabs on taskbar
  renderTaskbarTabs() {
    const container = document.getElementById('taskbar-apps-container');
    if (!container) return;

    if (state.personality === 'mac') {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = Array.from(state.openWindows).map(id => {
      const win = document.getElementById(`win-${id}`);
      const isActive = state.activeWindow === id && !win.classList.contains('minimized');
      const title = win.querySelector('.window-title').textContent;
      
      return `
        <button class="taskbar-app-tab ${isActive ? 'active' : ''}" onclick="appManager.handleTaskbarTabClick('${id}')">
          <span>${title}</span>
        </button>
      `;
    }).join('');
  },

  handleTaskbarTabClick(id) {
    const win = document.getElementById(`win-${id}`);
    if (!win) return;

    if (win.classList.contains('minimized')) {
      win.classList.remove('minimized');
      this.focusWindow(id);
    } else if (state.activeWindow === id) {
      this.minimizeWindow(id);
    } else {
      this.focusWindow(id);
    }
  },

  /* --- Projects Window Content Handler --- */
  selectProject(projId) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === projId);
    if (!project) return;

    // Update active state in list
    const listItems = document.querySelectorAll('#projects-sidebar-list .project-nav-item');
    listItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-id') === projId) {
        item.classList.add('active');
      }
    });

    // Render detailed sheet
    const detailPanel = document.getElementById('project-detail-panel');
    
    let demoBtn = '';
    if (project.demo) {
      demoBtn = `<a href="${project.demo}" target="_blank" rel="noopener" class="btn btn-primary">🌐 Live Demo</a>`;
    }
    
    let githubBtn = '';
    if (project.github) {
      githubBtn = `<a href="${project.github}" target="_blank" rel="noopener" class="btn btn-secondary">💻 GitHub Repo</a>`;
    }

    let pdfBtn = '';
    if (project.pdfUrl) {
      pdfBtn = `<button onclick="appManager.previewPDF('${project.pdfUrl}', '${project.name}')" class="btn btn-primary">📄 View PDF Document</button>`;
    }

    let testCasesHtml = '';
    if (project.testCases && project.testCases.length > 0) {
      testCasesHtml = `
        <div class="project-info-section" style="grid-column: 1 / -1; overflow-x:auto;">
          <h4 style="margin-bottom:8px;">System Testing & Test Cases</h4>
          <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:left; border:1px solid var(--border-color); background-color:rgba(0,0,0,0.1);">
            <thead>
              <tr style="background-color:rgba(255,255,255,0.04); border-bottom:1.5px solid var(--border-color); font-weight:700;">
                <th style="padding:6px 8px; border:1px solid var(--border-color);">Test Case</th>
                <th style="padding:6px 8px; border:1px solid var(--border-color);">Input Data</th>
                <th style="padding:6px 8px; border:1px solid var(--border-color);">Expected Output</th>
                <th style="padding:6px 8px; border:1px solid var(--border-color);">Result</th>
              </tr>
            </thead>
            <tbody>
              ${project.testCases.map(tc => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:6px 8px; border:1px solid var(--border-color); font-weight:600;">${tc.name}</td>
                  <td style="padding:6px 8px; border:1px solid var(--border-color); color:var(--text-secondary);">${tc.input}</td>
                  <td style="padding:6px 8px; border:1px solid var(--border-color); color:var(--text-secondary);">${tc.expected}</td>
                  <td style="padding:6px 8px; border:1px solid var(--border-color); color:var(--color-emerald); font-weight:700;">${tc.result}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
    let imageGallery = '';
    if (project.images && project.images.length > 0) {
      imageGallery = `
        <div class="project-info-section" style="grid-column: 1 / -1;">
          <h4>Media & Screenshots</h4>
          <div class="project-image-gallery" style="display:flex; gap:12px; overflow-x:auto; padding:8px 0; scrollbar-width:thin;">
            ${project.images.map(img => `
              <div class="gallery-image-wrapper" style="flex:0 0 140px; height:95px; border-radius:6px; overflow:hidden; border:1px solid var(--border-color); cursor:pointer; background-color:#1e1e24;" onclick="appManager.previewPDF('${img}', '${project.name} Screenshot')">
                <img src="${img}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="Screenshot" />
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    detailPanel.innerHTML = `
      <div class="project-detail-header">
        <h2>${project.name}</h2>
        <div class="project-detail-subtitle">${project.subtitle}</div>
        <div class="project-detail-meta">${project.association} | Role: <strong>${project.role}</strong></div>
      </div>
      
      <div class="tech-badges-container">
        ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
      </div>

      <div class="project-info-grid">
        <div class="project-info-section">
          <h4>Purpose & Overview</h4>
          <p>${project.purpose}</p>
        </div>
        <div class="project-info-section">
          <h4>Key Features</h4>
          <ul>
            ${project.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        ${project.description ? `
        <div class="project-info-section">
          <h4>Context & Execution</h4>
          <p>${project.description}</p>
        </div>` : ''}
        ${testCasesHtml}
        ${imageGallery}
      </div>

      <div class="project-actions">
        ${demoBtn}
        ${githubBtn}
        ${pdfBtn}
      </div>
    `;
  },

  selectTechnicalEvent(eventId) {
    const event = PORTFOLIO_DATA.technicalEvents.find(e => e.id === eventId);
    if (!event) return;

    // Update active state in list
    const listItems = document.querySelectorAll('#tech-events-sidebar-list .project-nav-item');
    listItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-id') === eventId) {
        item.classList.add('active');
      }
    });

    // Render detailed sheet
    const detailPanel = document.getElementById('tech-event-detail-panel');
    
    let githubBtn = '';
    if (event.github) {
      githubBtn = `<a href="${event.github}" target="_blank" rel="noopener" class="btn btn-secondary">💻 GitHub Repo</a>`;
    }

    let pdfBtn = '';
    if (event.pdfUrl) {
      pdfBtn = `<button onclick="appManager.previewPDF('${event.pdfUrl}', '${event.name}')" class="btn btn-primary">📄 View Certificate</button>`;
    }

    let imageGallery = '';
    if (event.images && event.images.length > 0) {
      imageGallery = `
        <div class="project-info-section" style="grid-column: 1 / -1;">
          <h4>Media & Event Gallery</h4>
          <div class="event-image-gallery" style="display:flex; gap:12px; overflow-x:auto; padding:8px 0; scrollbar-width:thin;">
            ${event.images.map(img => `
              <div class="gallery-image-wrapper" style="flex:0 0 140px; height:95px; border-radius:6px; overflow:hidden; border:1px solid var(--border-color); cursor:pointer; background-color:#1e1e24;" onclick="appManager.previewPDF('${img}', '${event.name} Photo')">
                <img src="${img}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="Gallery Photo" />
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    detailPanel.innerHTML = `
      <div class="project-detail-header">
        <h2>${event.name}</h2>
        <div class="project-detail-subtitle">${event.subtitle}</div>
        <div class="project-detail-meta">${event.association} | Role: <strong>${event.role}</strong></div>
      </div>
      
      <div class="tech-badges-container">
        ${event.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
      </div>

      <div class="project-info-grid">
        <div class="project-info-section">
          <h4>Exhibition Overview</h4>
          <p>${event.purpose}</p>
        </div>
        <div class="project-info-section">
          <h4>Highlights</h4>
          <ul>
            ${event.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        ${event.description ? `
        <div class="project-info-section">
          <h4>Event Context</h4>
          <p>${event.description}</p>
        </div>` : ''}
        ${imageGallery}
      </div>

      <div class="project-actions">
        ${pdfBtn}
        ${githubBtn}
      </div>
    `;
  },

  /* --- File Manager Handler --- */
  renderFileManagerFolder(folderId) {
    state.currentFmFolder = folderId;
    
    // Highlight folder in sidebar
    const folders = document.getElementById('fm-side-folders');
    folders.innerHTML = `
      <div class="fm-sub-item ${folderId === 'certs' || folderId === 'certs-technical' || folderId === 'certs-events' ? 'active' : ''}" onclick="appManager.renderFileManagerFolder('certs')">🗂️ Certificates</div>
      <div class="fm-sub-item ${folderId === 'certs-technical' ? 'active' : ''}" onclick="appManager.renderFileManagerFolder('certs-technical')" style="padding-left:24px; font-size:11.5px; opacity:0.95;">📁 Technical</div>
      <div class="fm-sub-item ${folderId === 'certs-events' ? 'active' : ''}" onclick="appManager.renderFileManagerFolder('certs-events')" style="padding-left:24px; font-size:11.5px; opacity:0.95;">📁 Events & Activities</div>
      <div class="fm-sub-item ${folderId === 'projects' ? 'active' : ''}" onclick="appManager.renderFileManagerFolder('projects')">🗂️ Projects</div>
      <div class="fm-sub-item ${folderId === 'technical-events' ? 'active' : ''}" onclick="appManager.renderFileManagerFolder('technical-events')">🗂️ Technical Events & Activities</div>
      <div class="fm-sub-item ${folderId === 'resume' ? 'active' : ''}" onclick="appManager.renderFileManagerFolder('resume')">🗂️ Resume</div>
      <div class="fm-sub-item ${folderId === 'docs' ? 'active' : ''}" onclick="appManager.renderFileManagerFolder('docs')">🗂️ Documents</div>
    `;

    const breadcrumbs = document.getElementById('fm-breadcrumbs');
    const viewGrid = document.getElementById('fm-grid-view');

    if (folderId === 'root') {
      breadcrumbs.textContent = 'C:\\';
      viewGrid.innerHTML = `
        <div class="fm-item" onclick="appManager.renderFileManagerFolder('certs')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Certificates</span>
        </div>
        <div class="fm-item" onclick="appManager.renderFileManagerFolder('projects')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Projects</span>
        </div>
        <div class="fm-item" onclick="appManager.renderFileManagerFolder('technical-events')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Technical Events & Activities</span>
        </div>
        <div class="fm-item" onclick="appManager.renderFileManagerFolder('resume')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Resume</span>
        </div>
        <div class="fm-item" onclick="appManager.renderFileManagerFolder('docs')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Documents</span>
        </div>
      `;
    } else if (folderId === 'certs') {
      breadcrumbs.textContent = 'C:\\Certificates';
      viewGrid.innerHTML = `
        <div class="fm-item" onclick="appManager.renderFileManagerFolder('certs-technical')" ondblclick="appManager.renderFileManagerFolder('certs-technical')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Technical Certificates</span>
        </div>
        <div class="fm-item" onclick="appManager.renderFileManagerFolder('certs-events')" ondblclick="appManager.renderFileManagerFolder('certs-events')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Events & Activities</span>
        </div>
      `;
    } else if (folderId === 'certs-technical') {
      breadcrumbs.textContent = 'C:\\Certificates\\Technical';
      const techCerts = PORTFOLIO_DATA.certificates.filter(c => c.category === 'technical');
      viewGrid.innerHTML = techCerts.map(cert => `
        <div class="fm-item" ondblclick="appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')" onclick="if(isMobile()) appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')">
          <span class="fm-item-icon">📄</span>
          <span class="fm-item-label">${cert.name.toLowerCase().replace(/ /g, '_')}.pdf</span>
        </div>
      `).join('') || '<div class="text-secondary p-4">Folder is empty</div>';
    } else if (folderId === 'certs-events') {
      breadcrumbs.textContent = 'C:\\Certificates\\Events & Activities';
      const eventCerts = PORTFOLIO_DATA.certificates.filter(c => c.category === 'events');
      viewGrid.innerHTML = eventCerts.map(cert => `
        <div class="fm-item" ondblclick="appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')" onclick="if(isMobile()) appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')">
          <span class="fm-item-icon">📄</span>
          <span class="fm-item-label">${cert.name.toLowerCase().replace(/ /g, '_')}.pdf</span>
        </div>
      `).join('') || '<div class="text-secondary p-4">Folder is empty</div>';
    } else if (folderId === 'projects') {
      breadcrumbs.textContent = 'C:\\Projects';
      viewGrid.innerHTML = PORTFOLIO_DATA.projects.map(proj => {
        const icon = proj.pdfUrl ? '📄' : '🔗';
        const label = proj.pdfUrl ? `${proj.id}.pdf` : `${proj.id}.lnk`;
        const action = proj.pdfUrl 
          ? `appManager.previewPDF('${proj.pdfUrl}', '${proj.name}')` 
          : `appManager.openWindow('projects'); appManager.selectProject('${proj.id}')`;
        return `
          <div class="fm-item" ondblclick="${action}" onclick="if(isMobile()) ${action}">
            <span class="fm-item-icon">${icon}</span>
            <span class="fm-item-label">${label}</span>
          </div>
        `;
      }).join('');
    } else if (folderId === 'technical-events') {
      breadcrumbs.textContent = 'C:\\Technical Events & Activities';
      viewGrid.innerHTML = PORTFOLIO_DATA.technicalEvents.map(event => {
        const action = `appManager.openWindow('tech-events'); appManager.selectTechnicalEvent('${event.id}')`;
        return `
          <div class="fm-item" ondblclick="${action}" onclick="if(isMobile()) ${action}">
            <span class="fm-item-icon">🔗</span>
            <span class="fm-item-label">${event.id}.lnk</span>
          </div>
        `;
      }).join('') || '<div class="text-secondary p-4">Folder is empty</div>';
    } else if (folderId === 'resume') {
      breadcrumbs.textContent = 'C:\\Resume';
      viewGrid.innerHTML = `
        <div class="fm-item" ondblclick="appManager.previewPDF('${PORTFOLIO_DATA.profile.resumeUrl}', 'Sagar G Resume')" onclick="if(isMobile()) appManager.previewPDF('${PORTFOLIO_DATA.profile.resumeUrl}', 'Sagar G Resume')">
          <span class="fm-item-icon">📄</span>
          <span class="fm-item-label">sagar_g_resume.pdf</span>
        </div>
      `;
    } else if (folderId === 'docs') {
      breadcrumbs.textContent = 'C:\\Documents';
      // Adding research paper to documents as well
      const doc = PORTFOLIO_DATA.projects.find(p => p.id === 'cybercrime-research');
      viewGrid.innerHTML = `
        <div class="fm-item" ondblclick="appManager.previewPDF('${doc.pdfUrl}', '${doc.name}')" onclick="if(isMobile()) appManager.previewPDF('${doc.pdfUrl}', '${doc.name}')">
          <span class="fm-item-icon">📄</span>
          <span class="fm-item-label">cybercrimes_bengaluru.pdf</span>
        </div>
      `;
    }
  },

  /* --- PDF Viewer Helper --- */
  previewPDF(url, title) {
    const modal = document.getElementById('pdf-viewer-modal');
    const iframe = document.getElementById('pdf-viewer-frame');
    const imageEl = document.getElementById('pdf-viewer-img');
    const titleEl = document.getElementById('pdf-viewer-title');
    const downloadLink = document.getElementById('pdf-modal-download');
    const fallbackLink = document.getElementById('pdf-fallback-link');
    const fallbackBox = document.getElementById('pdf-viewer-fallback');

    titleEl.textContent = title;
    downloadLink.href = url;
    fallbackLink.href = url;

    // Check if the URL points to an image
    const isImage = url.toLowerCase().endsWith('.jpeg') || 
                    url.toLowerCase().endsWith('.jpg') || 
                    url.toLowerCase().endsWith('.png') || 
                    url.toLowerCase().endsWith('.webp') ||
                    url.toLowerCase().endsWith('.gif');

    if (isImage) {
      // Show image, hide iframe & fallback
      iframe.style.display = 'none';
      iframe.src = '';
      fallbackBox.classList.add('hidden');
      
      imageEl.src = url;
      imageEl.style.display = 'block';
    } else {
      // Show iframe, hide image element
      imageEl.src = '';
      imageEl.style.display = 'none';
      
      iframe.style.display = 'block';
      iframe.src = url;

      // Simple check: if local file:/// protocol, browser security might block iframe preview
      if (window.location.protocol === 'file:') {
        fallbackBox.classList.remove('hidden');
      } else {
        fallbackBox.classList.add('hidden');
      }
    }

    modal.classList.remove('hidden');
  },

  /* --- Chatbot Interface Handlers --- */
  renderChatChips() {
    const chipsContainer = document.getElementById('chat-chips-container');
    const chips = [
      { text: "About Sagar", key: "about" },
      { text: "Core Skills", key: "skills" },
      { text: "Experience", key: "experience" },
      { text: "Projects", key: "projects" },
      { text: "Technical Events & Activities", key: "techEvents" },
      { text: "Education", key: "education" },
      { text: "Certifications", key: "certificates" }
    ];

    chipsContainer.innerHTML = chips.map(c => `
      <button class="chat-chip" onclick="appManager.simulateBotResponse('${c.key}', '${c.text}')">${c.text}</button>
    `).join('');
  },

  sendUserMessage(text) {
    const messagesContainer = document.getElementById('chat-messages-container');
    
    // Append User message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble chat-bubble-user';
    userMsg.textContent = text;
    messagesContainer.appendChild(userMsg);
    this.scrollToBottom();

    // Spawn Typing bubble
    const typingBubble = document.createElement('div');
    typingBubble.className = 'typing-bubble';
    typingBubble.id = 'typing-indicator';
    typingBubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    messagesContainer.appendChild(typingBubble);
    this.scrollToBottom();

    // Analyze text and answer
    setTimeout(() => {
      typingBubble.remove();
      this.processUserQuery(text);
    }, 800);
  },

  simulateBotResponse(key, labelText) {
    if (labelText) {
      // Append simulated user click
      const messagesContainer = document.getElementById('chat-messages-container');
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-bubble chat-bubble-user';
      userMsg.textContent = labelText;
      messagesContainer.appendChild(userMsg);
    }
    
    const messagesContainer = document.getElementById('chat-messages-container');
    const typingBubble = document.createElement('div');
    typingBubble.className = 'typing-bubble';
    typingBubble.id = 'typing-indicator';
    typingBubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    messagesContainer.appendChild(typingBubble);
    this.scrollToBottom();

    setTimeout(() => {
      typingBubble.remove();
      this.appendBotResponse(messagesContainer, key, false);
    }, 600);
  },

  processUserQuery(text) {
    const query = text.toLowerCase();
    let responseKey = 'default';

    if (query.includes('about') || query.includes('who are you') || query.includes('yourself')) {
      responseKey = 'about';
    } else if (query.includes('skill') || query.includes('technology') || query.includes('languages') || query.includes('stack')) {
      responseKey = 'skills';
    } else if (query.includes('experience') || query.includes('intern') || query.includes('work') || query.includes('eco dispose')) {
      responseKey = 'experience';
    } else if (query.includes('ink app') || query.includes('ink')) {
      responseKey = 'ink_app';
    } else if (query.includes('sagar os') || query.includes('sagaros') || query.includes('portfolio') || query.includes('operating system')) {
      responseKey = 'sagar_os';
    } else if (query.includes('research') || query.includes('paper') || query.includes('cyber') || query.includes('bengaluru')) {
      responseKey = 'research';
    } else if (query.includes('flipkart') || query.includes('clone') || query.includes('e-commerce')) {
      responseKey = 'flipkart_clone';
    } else if (query.includes('project')) {
      responseKey = 'projects';
    } else if (query.includes('exhibition') || query.includes('technical event') || query.includes('elixir') || query.includes('stickman') || query.includes('ambulance') || query.includes('open day')) {
      responseKey = 'techEvents';
    } else if (query.includes('education') || query.includes('college') || query.includes('university') || query.includes('school')) {
      responseKey = 'education';
    } else if (query.includes('certificate') || query.includes('certif') || query.includes('infosys') || query.includes('springboard')) {
      responseKey = 'certificates';
    } else if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('reach') || query.includes('call')) {
      responseKey = 'contact';
    } else if (query.includes('fit') || query.includes('hire') || query.includes('consider') || query.includes('why should')) {
      responseKey = 'recruiter_fit';
    } else if (query.includes('looking for') || query.includes('job') || query.includes('role')) {
      responseKey = 'looking_for';
    } else if (query.includes('feedback') || query.includes('review') || query.includes('rating') || query.includes('suggest')) {
      responseKey = 'feedback';
    }

    const messagesContainer = document.getElementById('chat-messages-container');
    this.appendBotResponse(messagesContainer, responseKey, false);
  },

  scrollToBottom() {
    const chatContainer = document.getElementById('chat-messages-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  },

  appendBotResponse(container, key, isMobile) {
    const answer = PORTFOLIO_DATA.askMeAnswers[key] || PORTFOLIO_DATA.askMeAnswers.default;
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-bubble chat-bubble-bot';
    
    let html = parseMarkdown(answer);
    
    const buttonConfig = this.getChatActionButtonConfig(key, isMobile);
    if (buttonConfig) {
      html += ` <span style="cursor: pointer; color: var(--color-blue); font-weight: bold; font-size: 14px; text-decoration: none;" onclick="${buttonConfig.action}" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'" title="${buttonConfig.label}">↗</span>`;
    }
    
    botMsg.innerHTML = html;
    container.appendChild(botMsg);
    
    if (isMobile) {
      container.scrollTop = container.scrollHeight;
    } else {
      this.scrollToBottom();
    }
  },

  getChatActionButtonConfig(key, isMobile) {
    const config = {
      about: {
        label: "Open About Candidate",
        action: isMobile 
          ? `document.getElementById('mobile-profile-summary').textContent = PORTFOLIO_DATA.profile.summary; document.getElementById('mobile-profile-modal').classList.remove('hidden');`
          : `appManager.openWindow('about');`
      },
      skills: {
        label: "Open Recruiter Mode (Skills)",
        action: `toggleRecruiterMode(true);`
      },
      experience: {
        label: "Open Recruiter Mode (Experience)",
        action: `toggleRecruiterMode(true);`
      },
      projects: {
        label: "Open Projects Explorer",
        action: isMobile 
          ? `appManager.openMobileApp('projects');`
          : `appManager.openWindow('projects');`
      },
      techEvents: {
        label: "Open Technical Events",
        action: isMobile 
          ? `appManager.openMobileApp('technical-events');`
          : `appManager.openWindow('tech-events');`
      },
      ink_app: {
        label: "View INK App Project",
        action: isMobile 
          ? `appManager.openMobileApp('projects'); setTimeout(() => { const el = document.getElementById('mob-proj-ink-app'); if(el) el.scrollIntoView({behavior: 'smooth'}); }, 300);`
          : `appManager.openWindow('projects'); appManager.selectProject('ink-app');`
      },
      sagar_os: {
        label: "View Sagar OS Project",
        action: isMobile 
          ? `appManager.openMobileApp('projects'); setTimeout(() => { const el = document.getElementById('mob-proj-sagar-os'); if(el) el.scrollIntoView({behavior: 'smooth'}); }, 300);`
          : `appManager.openWindow('projects'); appManager.selectProject('sagar-os');`
      },
      research: {
        label: "View Cybersecurity Research",
        action: isMobile 
          ? `appManager.openMobileApp('projects'); setTimeout(() => { const el = document.getElementById('mob-proj-cybercrime-research'); if(el) el.scrollIntoView({behavior: 'smooth'}); }, 300);`
          : `appManager.openWindow('projects'); appManager.selectProject('cybercrime-research');`
      },
      flipkart_clone: {
        label: "View Flipkart Clone Project",
        action: isMobile 
          ? `appManager.openMobileApp('projects'); setTimeout(() => { const el = document.getElementById('mob-proj-flipkart-clone'); if(el) el.scrollIntoView({behavior: 'smooth'}); }, 300);`
          : `appManager.openWindow('projects'); appManager.selectProject('flipkart-clone');`
      },
      education: {
        label: "Open About Candidate (Education)",
        action: isMobile 
          ? `document.getElementById('mobile-profile-summary').textContent = PORTFOLIO_DATA.profile.summary; document.getElementById('mobile-profile-modal').classList.remove('hidden');`
          : `appManager.openWindow('about');`
      },
      certificates: {
        label: "Open Certifications",
        action: isMobile 
          ? `appManager.openMobileApp('certificates');`
          : `appManager.openWindow('certificates');`
      },
      contact: {
        label: "Open About Candidate (Contact Info)",
        action: isMobile 
          ? `document.getElementById('mobile-profile-summary').textContent = PORTFOLIO_DATA.profile.summary; document.getElementById('mobile-profile-modal').classList.remove('hidden');`
          : `appManager.openWindow('about');`
      },
      recruiter_fit: {
        label: "Open Recruiter Mode",
        action: `toggleRecruiterMode(true);`
      },
      looking_for: {
        label: "Open Recruiter Mode",
        action: `toggleRecruiterMode(true);`
      }
    };
    return config[key] || null;
  },

  handleRecruiterLink(type, itemId = null) {
    toggleRecruiterMode(false);
    const isMob = isMobile();
    if (type === 'about' || type === 'skills' || type === 'hobbies') {
      if (isMob) {
        document.getElementById('mobile-profile-summary').textContent = PORTFOLIO_DATA.profile.summary;
        document.getElementById('mobile-profile-modal').classList.remove('hidden');
      } else {
        appManager.openWindow('about');
      }
    } else if (type === 'experience') {
      appManager.previewPDF(PORTFOLIO_DATA.profile.resumeUrl, 'Sagar G Resume');
    } else if (type === 'education') {
      if (isMob) {
        document.getElementById('mobile-profile-summary').textContent = PORTFOLIO_DATA.profile.summary;
        document.getElementById('mobile-profile-modal').classList.remove('hidden');
      } else {
        appManager.openWindow('about');
        setTimeout(() => {
          const eduEl = document.querySelector('#win-about .timeline');
          if (eduEl) {
            eduEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    } else if (type === 'projects') {
      if (itemId) {
        if (isMob) {
          appManager.openMobileApp('projects');
          setTimeout(() => {
            const el = document.getElementById(`mob-proj-${itemId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        } else {
          appManager.openWindow('projects');
          appManager.selectProject(itemId);
        }
      } else {
        if (isMob) {
          appManager.openMobileApp('projects');
        } else {
          appManager.openWindow('projects');
        }
      }
    } else if (type === 'tech-events') {
      if (itemId) {
        if (isMob) {
          appManager.openMobileApp('technical-events');
          setTimeout(() => {
            const el = document.getElementById(`mob-proj-${itemId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        } else {
          appManager.openWindow('tech-events');
          appManager.selectTechnicalEvent(itemId);
        }
      } else {
        if (isMob) {
          appManager.openMobileApp('technical-events');
        } else {
          appManager.openWindow('tech-events');
        }
      }
    } else if (type === 'certificates') {
      if (itemId) {
        appManager.previewPDF(itemId, 'Certificate Preview');
      } else {
        if (isMob) {
          appManager.openMobileApp('certificates');
        } else {
          appManager.openWindow('certificates');
        }
      }
    }
  },

  /* ==================== MOBILE MODE LOGIC ==================== */
  openMobileApp(appType) {
    state.mobileActiveApp = appType;
    const overlay = document.getElementById('mobile-app-overlay');
    const titleEl = document.getElementById('mobile-app-title');
    const contentEl = document.getElementById('mobile-app-content');

    // Slide overlay open
    overlay.classList.remove('hidden');

    if (appType === 'askme') {
      titleEl.textContent = 'Ask Me AI Assistant';
      contentEl.innerHTML = `
        <div class="chatbot-layout" style="height:100%;">
          <div class="chat-messages" id="mob-chat-messages" style="flex:1;">
            <div class="chat-bubble chat-bubble-bot">${PORTFOLIO_DATA.askMeAnswers.greeting}</div>
          </div>
          <div class="chat-chips-area" id="mob-chat-chips"></div>
          <div class="chat-input-area">
            <form id="mob-chat-form" class="chat-form-element">
              <input type="text" id="mob-chat-input-text" placeholder="Type a question..." autocomplete="off">
              <button type="submit" class="btn btn-primary">➔</button>
            </form>
          </div>
        </div>
      `;

      // Mobile chat handlers
      const mobMessages = document.getElementById('mob-chat-messages');
      const mobChips = document.getElementById('mob-chat-chips');
      const chips = [
        { text: "About Sagar", key: "about" },
        { text: "Core Skills", key: "skills" },
        { text: "Experience", key: "experience" },
        { text: "Projects", key: "projects" },
        { text: "Education", key: "education" },
        { text: "Certifications", key: "certificates" }
      ];
      
      mobChips.innerHTML = chips.map(c => `
        <button class="chat-chip" onclick="appManager.simulateMobileChatResponse('${c.key}', '${c.text}')">${c.text}</button>
      `).join('');

      document.getElementById('mob-chat-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const textEl = document.getElementById('mob-chat-input-text');
        const text = textEl.value.trim();
        if (!text) return;
        textEl.value = '';
        
        // Append User msg
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-bubble chat-bubble-user';
        userMsg.textContent = text;
        mobMessages.appendChild(userMsg);
        mobMessages.scrollTop = mobMessages.scrollHeight;

        // Typing indicator
        const typing = document.createElement('div');
        typing.className = 'typing-bubble';
        typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        mobMessages.appendChild(typing);
        mobMessages.scrollTop = mobMessages.scrollHeight;

        setTimeout(() => {
          typing.remove();
          
          // Match key
          let responseKey = 'default';
          const q = text.toLowerCase();
          if (q.includes('about') || q.includes('yourself')) responseKey = 'about';
          else if (q.includes('skill') || q.includes('languages') || q.includes('stack')) responseKey = 'skills';
          else if (q.includes('experience') || q.includes('work') || q.includes('intern')) responseKey = 'experience';
          else if (q.includes('exhibition') || q.includes('technical event') || q.includes('elixir') || q.includes('stickman') || q.includes('ambulance') || q.includes('open day')) responseKey = 'techEvents';
          else if (q.includes('ink app') || q.includes('ink')) responseKey = 'ink_app';
          else if (q.includes('sagar os') || q.includes('sagaros') || q.includes('portfolio') || q.includes('operating system')) responseKey = 'sagar_os';
          else if (q.includes('research') || q.includes('paper') || q.includes('cyber') || q.includes('bengaluru')) responseKey = 'research';
          else if (q.includes('flipkart') || q.includes('clone') || q.includes('e-commerce')) responseKey = 'flipkart_clone';
          else if (q.includes('project')) responseKey = 'projects';
          else if (q.includes('education') || q.includes('college')) responseKey = 'education';
          else if (q.includes('certificate') || q.includes('certif')) responseKey = 'certificates';
          else if (q.includes('contact') || q.includes('phone') || q.includes('email')) responseKey = 'contact';

          
          appManager.appendBotResponse(mobMessages, responseKey, true);
        }, 800);
      });
    } else if (appType === 'projects') {
      titleEl.textContent = 'Projects Explorer';
      contentEl.innerHTML = `
        <div class="p-4 scrollable" style="height:100%;">
          ${PORTFOLIO_DATA.projects.map(proj => {
            const githubBtn = proj.github ? `<a href="${proj.github}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="flex:1; text-align:center;">GitHub</a>` : '';
            const pdfBtn = proj.pdfUrl ? `<button onclick="appManager.previewPDF('${proj.pdfUrl}', '${proj.name}')" class="btn btn-primary btn-sm" style="flex:1; text-align:center;">Preview PDF</button>` : '';
            
            let testCasesHtml = '';
            if (proj.testCases && proj.testCases.length > 0) {
              testCasesHtml = `
                <div class="mb-3" style="overflow-x:auto;">
                  <div style="font-size:10px; font-weight:600; color:var(--text-secondary); margin-bottom:6px;">TEST CASES</div>
                  <table style="width:100%; border-collapse:collapse; font-size:9.5px; border:1px solid var(--border-color);">
                    <thead>
                      <tr style="background-color:rgba(255,255,255,0.05); text-align:left; font-weight:700;">
                        <th style="padding:4px; border:1px solid var(--border-color);">Test Case</th>
                        <th style="padding:4px; border:1px solid var(--border-color);">Input</th>
                        <th style="padding:4px; border:1px solid var(--border-color);">Expected</th>
                        <th style="padding:4px; border:1px solid var(--border-color);">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${proj.testCases.map(tc => `
                        <tr style="border-bottom:1px solid var(--border-color);">
                          <td style="padding:4px; border:1px solid var(--border-color); font-weight:600;">${tc.name}</td>
                          <td style="padding:4px; border:1px solid var(--border-color);">${tc.input}</td>
                          <td style="padding:4px; border:1px solid var(--border-color);">${tc.expected}</td>
                          <td style="padding:4px; border:1px solid var(--border-color); color:var(--color-emerald); font-weight:700;">${tc.result}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              `;
            }

            let imagesHtml = '';
            if (proj.images && proj.images.length > 0) {
              imagesHtml = `
                <div class="mb-3">
                  <div style="font-size:10px; font-weight:600; color:var(--text-secondary); margin-bottom:6px;">SCREENSHOTS</div>
                  <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:4px;">
                    ${proj.images.map(img => `
                      <img src="${img}" style="width:100px; height:70px; object-fit:cover; border-radius:4px; border:1px solid var(--border-color);" onclick="appManager.previewPDF('${img}', '${proj.name} Screenshot')" />
                    `).join('')}
                  </div>
                </div>
              `;
            }

            return `
              <div id="mob-proj-${proj.id}" class="recruiter-section mb-5" style="border-bottom:1px solid var(--border-color); padding-bottom:16px;">
                <h3 style="border-left:4px solid var(--color-orange); padding-left:8px; font-weight:700; font-size:14px;">${proj.name}</h3>
                <p class="project-detail-subtitle mb-2" style="font-size:12px; margin-top:2px;">${proj.subtitle}</p>
                <div class="tech-badges-container mb-3">
                  ${proj.tech.map(t => `<span class="tech-badge" style="font-size:9.5px; padding:2px 6px;">${t}</span>`).join('')}
                </div>
                <p class="text-secondary mb-3" style="font-size:12px; line-height:1.4;">${proj.purpose}</p>
                ${imagesHtml}
                ${testCasesHtml}
                <div class="project-actions" style="display:flex; gap:8px; width:100%;">
                  ${pdfBtn}
                  ${githubBtn}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (appType === 'files') {
      titleEl.textContent = 'Files Manager';
      contentEl.innerHTML = `
        <div class="filemanager-layout" style="height:100%;">
          <div class="filemanager-main" style="width:100%;">
            <div class="fm-breadcrumbs" id="mob-fm-breadcrumbs">C:\\</div>
            <div class="fm-grid" id="mob-fm-grid-view"></div>
          </div>
        </div>
      `;
      this.renderMobileFileManagerFolder('root');

    } else if (appType === 'certificates') {
      titleEl.textContent = 'Certifications';
      const techCerts = PORTFOLIO_DATA.certificates.filter(c => c.category === 'technical');
      const eventCerts = PORTFOLIO_DATA.certificates.filter(c => c.category === 'events');
      contentEl.innerHTML = `
        <div class="p-4 scrollable" style="height:100%;">
          <div class="certificates-list-container">
            <div style="font-weight:700; font-size:11px; margin-bottom:12px; color:var(--color-teal); border-bottom:1px solid var(--border-color); padding-bottom:4px;">TECHNICAL & INTERNSHIP</div>
            ${techCerts.map(cert => `
              <div class="cert-row" style="flex-direction:column; align-items:flex-start; gap:10px; margin-bottom:16px;">
                <div class="cert-info">
                  <span class="cert-icon">🏆</span>
                  <div>
                    <div class="cert-name" style="font-size:13px;">${cert.name}</div>
                    <div class="cert-issuer" style="font-size:11px;">${cert.issuer} (${cert.date})</div>
                  </div>
                </div>
                <button class="btn btn-secondary btn-sm btn-block text-center" onclick="appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')">View Certificate</button>
              </div>
            `).join('')}

            <div style="font-weight:700; font-size:11px; margin:20px 0 12px 0; color:var(--color-emerald); border-bottom:1px solid var(--border-color); padding-bottom:4px;">EVENTS & ACTIVITIES</div>
            ${eventCerts.map(cert => `
              <div class="cert-row" style="flex-direction:column; align-items:flex-start; gap:10px; margin-bottom:16px;">
                <div class="cert-info">
                  <span class="cert-icon">🎗️</span>
                  <div>
                    <div class="cert-name" style="font-size:13px;">${cert.name}</div>
                    <div class="cert-issuer" style="font-size:11px;">${cert.issuer} (${cert.date})</div>
                  </div>
                </div>
                <button class="btn btn-secondary btn-sm btn-block text-center" onclick="appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')">View Certificate</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (appType === 'creative') {
      titleEl.textContent = 'Creative Corner';
      contentEl.innerHTML = `
        <div class="p-4 scrollable" style="height:100%;">
          <p class="mb-4 text-secondary" style="font-size:12px; line-height:1.5;">Apart from development, Sagar G is highly passionate about video production, editing, and content creation.</p>
          <div class="creative-grid" style="grid-template-columns:1fr; gap:12px;">
            <div class="creative-card">
              <div class="creative-icon">🎬</div>
              <h4>Video Editing & AV Production</h4>
              <p>Experienced in editing, post-production, and directing visual streams. Served as an SJU Student Council Media Volunteer (2024), handling videography and editing for inter- and intra-college events.</p>
            </div>
            <div class="creative-card">
              <div class="creative-icon">🔊</div>
              <h4>Live Stream Engineering</h4>
              <p>Designed live stream setups (OBS, audio mixing, multi-cam switching) for events with over 500 participants.</p>
            </div>
            <div class="creative-card">
              <div class="creative-icon">🎤</div>
              <h4>NSS Community Outreach & Emcee</h4>
              <p>Served as an emcee for small community events in rural areas, interacted with local residents, and completed hands-on sanitation and infrastructure field work (cleaning roads, drains).</p>
            </div>
          </div>
        </div>
      `;
    } else if (appType === 'technical-events') {
      titleEl.textContent = 'Exhibitions';
      contentEl.innerHTML = `
        <div class="p-4 scrollable" style="height:100%;">
          ${PORTFOLIO_DATA.technicalEvents.map(event => {
            const githubBtn = event.github ? `<a href="${event.github}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="flex:1; text-align:center;">GitHub</a>` : '';
            const pdfBtn = event.pdfUrl ? `<button onclick="appManager.previewPDF('${event.pdfUrl}', '${event.name}')" class="btn btn-primary btn-sm" style="flex:1; text-align:center;">Certificate</button>` : '';
            
            let imagesHtml = '';
            if (event.images && event.images.length > 0) {
              imagesHtml = `
                <div class="mb-3">
                  <div style="font-size:11px; font-weight:600; color:var(--text-secondary); margin-bottom:6px;">PHOTOS</div>
                  <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:4px;">
                    ${event.images.map(img => `
                      <img src="${img}" style="width:100px; height:70px; object-fit:cover; border-radius:4px; border:1px solid var(--border-color);" onclick="appManager.previewPDF('${img}', '${event.name} Photo')" />
                    `).join('')}
                  </div>
                </div>
              `;
            }

            return `
              <div class="recruiter-section mb-5" style="border-bottom:1px solid var(--border-color); padding-bottom:16px;">
                <h3 style="border-left:4px solid var(--color-emerald); padding-left:8px; font-weight:700; font-size:14px;">${event.name}</h3>
                <p class="project-detail-subtitle mb-2" style="font-size:12px; margin-top:2px;">${event.subtitle}</p>
                <div class="tech-badges-container mb-3">
                  ${event.tech.map(t => `<span class="tech-badge" style="font-size:9.5px; padding:2px 6px;">${t}</span>`).join('')}
                </div>
                <p class="text-secondary mb-3" style="font-size:12px; line-height:1.4;">${event.purpose}</p>
                ${imagesHtml}
                <div class="project-actions" style="display:flex; gap:8px; width:100%;">
                  ${pdfBtn}
                  ${githubBtn}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (appType === 'settings') {
      titleEl.textContent = 'Personalization';
      contentEl.innerHTML = `
        <div class="p-4">
          <div class="settings-section mb-4">
            <h4>System Theme</h4>
            <div class="theme-selector" style="margin-top:10px;">
              <button class="btn btn-secondary ${state.theme === 'dark' ? 'btn-primary' : ''}" style="width:48%;" onclick="appManager.changeThemeMobile('dark', this)">🌑 Dark Theme</button>
              <button class="btn btn-secondary ${state.theme === 'light' ? 'btn-primary' : ''}" style="width:48%;" onclick="appManager.changeThemeMobile('light', this)">☀️ Light Theme</button>
            </div>
          </div>
          <div class="settings-section">
            <h4>About SAGAR OS</h4>
            <p class="text-secondary" style="margin-top:8px;">Version 1.0.0 (Build 2026.08)</p>
            <p class="text-secondary">Powered by HTML5, CSS3, and Vanilla JavaScript. Made with Google Antigravity by Sagar</p>
          </div>
        </div>
      `;
    }
  },

  simulateMobileChatResponse(key, label) {
    const mobMessages = document.getElementById('mob-chat-messages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble chat-bubble-user';
    userMsg.textContent = label;
    mobMessages.appendChild(userMsg);
    mobMessages.scrollTop = mobMessages.scrollHeight;

    // Add typing
    const typing = document.createElement('div');
    typing.className = 'typing-bubble';
    typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    mobMessages.appendChild(typing);
    mobMessages.scrollTop = mobMessages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      this.appendBotResponse(mobMessages, key, true);
    }, 600);
  },

  changeThemeMobile(theme, btnEl) {
    const buttons = btnEl.parentNode.querySelectorAll('button');
    buttons.forEach(b => b.classList.remove('btn-primary'));
    btnEl.classList.add('btn-primary');
    applyTheme(theme);
  },

  renderMobileFileManagerFolder(folderId) {
    const breadcrumbs = document.getElementById('mob-fm-breadcrumbs');
    const viewGrid = document.getElementById('mob-fm-grid-view');

    if (folderId === 'root') {
      breadcrumbs.textContent = 'C:\\';
      viewGrid.innerHTML = `
        <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('certs')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Certificates</span>
        </div>
        <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('projects')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Projects</span>
        </div>
        <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('technical-events')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Technical Events & Activities</span>
        </div>
        <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('resume')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Resume</span>
        </div>
        <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('docs')">
          <span class="fm-item-icon">📁</span>
          <span class="fm-item-label">Documents</span>
        </div>
      `;
    } else {
      // Allow going back to root on mobile
      const backToRoot = `
        <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('root')">
          <span class="fm-item-icon">⬅️</span>
          <span class="fm-item-label">Back</span>
        </div>
      `;

      if (folderId === 'certs') {
        breadcrumbs.textContent = 'C:\\Certificates';
        viewGrid.innerHTML = backToRoot + `
          <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('certs-technical')">
            <span class="fm-item-icon">📁</span>
            <span class="fm-item-label">Technical</span>
          </div>
          <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('certs-events')">
            <span class="fm-item-icon">📁</span>
            <span class="fm-item-label">Events & Activities</span>
          </div>
        `;
      } else if (folderId === 'certs-technical') {
        breadcrumbs.textContent = 'C:\\Certificates\\Technical';
        const techCerts = PORTFOLIO_DATA.certificates.filter(c => c.category === 'technical');
        viewGrid.innerHTML = `
          <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('certs')">
            <span class="fm-item-icon">⬅️</span>
            <span class="fm-item-label">Back</span>
          </div>
        ` + techCerts.map(cert => `
          <div class="fm-item" onclick="appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')">
            <span class="fm-item-icon">📄</span>
            <span class="fm-item-label">${cert.name.toLowerCase().replace(/ /g, '_')}.pdf</span>
          </div>
        `).join('');
      } else if (folderId === 'certs-events') {
        breadcrumbs.textContent = 'C:\\Certificates\\Events & Activities';
        const eventCerts = PORTFOLIO_DATA.certificates.filter(c => c.category === 'events');
        viewGrid.innerHTML = `
          <div class="fm-item" onclick="appManager.renderMobileFileManagerFolder('certs')">
            <span class="fm-item-icon">⬅️</span>
            <span class="fm-item-label">Back</span>
          </div>
        ` + eventCerts.map(cert => `
          <div class="fm-item" onclick="appManager.previewPDF('${cert.pdfUrl}', '${cert.name}')">
            <span class="fm-item-icon">📄</span>
            <span class="fm-item-label">${cert.name.toLowerCase().replace(/ /g, '_')}.pdf</span>
          </div>
        `).join('');
      } else if (folderId === 'projects') {
        breadcrumbs.textContent = 'C:\\Projects';
        viewGrid.innerHTML = backToRoot + PORTFOLIO_DATA.projects.map(proj => {
          const action = proj.pdfUrl 
            ? `appManager.previewPDF('${proj.pdfUrl}', '${proj.name}')` 
            : `appManager.openMobileApp('projects')`;
          return `
            <div class="fm-item" onclick="${action}">
              <span class="fm-item-icon">${proj.pdfUrl ? '📄' : '🔗'}</span>
              <span class="fm-item-label">${proj.id}</span>
            </div>
          `;
        }).join('');
      } else if (folderId === 'technical-events') {
        breadcrumbs.textContent = 'C:\\Technical Events & Activities';
        viewGrid.innerHTML = backToRoot + PORTFOLIO_DATA.technicalEvents.map(event => {
          const action = `appManager.openMobileApp('technical-events')`;
          return `
            <div class="fm-item" onclick="${action}">
              <span class="fm-item-icon">🔗</span>
              <span class="fm-item-label">${event.id}</span>
            </div>
          `;
        }).join('');
      } else if (folderId === 'resume') {
        breadcrumbs.textContent = 'C:\\Resume';
        viewGrid.innerHTML = backToRoot + `
          <div class="fm-item" onclick="appManager.previewPDF('${PORTFOLIO_DATA.profile.resumeUrl}', 'Sagar G Resume')">
            <span class="fm-item-icon">📄</span>
            <span class="fm-item-label">sagar_g_resume.pdf</span>
          </div>
        `;
      } else if (folderId === 'docs') {
        breadcrumbs.textContent = 'C:\\Documents';
        const doc = PORTFOLIO_DATA.projects.find(p => p.id === 'cybercrime-research');
        viewGrid.innerHTML = backToRoot + `
          <div class="fm-item" onclick="appManager.previewPDF('${doc.pdfUrl}', '${doc.name}')">
            <span class="fm-item-icon">📄</span>
            <span class="fm-item-label">cybercrimes_bengaluru.pdf</span>
          </div>
        `;
      }
    }
  },

  showMobileActionSheet(title, subtitle, options) {
    const modal = document.getElementById('action-sheet-modal');
    document.getElementById('action-sheet-title').textContent = title;
    document.getElementById('action-sheet-subtitle').textContent = subtitle;
    
    const container = document.getElementById('action-sheet-options-container');
    container.innerHTML = options.map((opt, idx) => `
      <button class="action-option-btn" id="act-opt-${idx}">${opt.label}</button>
    `).join('');

    modal.classList.remove('hidden');

    // Attach listeners
    options.forEach((opt, idx) => {
      document.getElementById(`act-opt-${idx}`).addEventListener('click', () => {
        modal.classList.add('hidden');
        opt.action();
      });
    });
  }
};

// Helper: Parse Markdown bold syntax (**text** -> <strong>text</strong>)
function parseMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
