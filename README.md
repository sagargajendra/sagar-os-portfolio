# SAGAR OS — Interactive Operating System Portfolio

A premium, highly interactive personal portfolio website styled as a fully functioning operating system. The interface adapts dynamically to the visitor's screen size:
*   **Desktop Mode**: An OS desktop environment with custom wallpapers, draggable and resizable windowed applications, desktop shortcuts, a taskbar/dock (supporting Windows and macOS styles), and a system clock.
*   **Mobile Mode**: An Android-inspired launcher with an interactive profile picture widget, bottom navigation dock, app grid, and slide-out full-screen app views.

👉 **Recruiter Mode Dashboard**: Includes a quick slide-out dashboard overlay designed to summarize all core candidate facts (skills, education, internships, projects) in under 20 seconds.

---

## 🚀 Key Features

*   **Draggable & Resizable Window Manager**: Custom mouse drag handles, double-click headers to maximize/restore, and corner drag-resizing built in pure vanilla JS.
*   **OS Style Switcher (Personalities)**:
    *   *Windows Mode*: Bottom taskbar, active window tabs, Start Menu launcher, and clock tray.
    *   *macOS Mode*: Top status menu bar, floating zoom-on-hover bottom Dock, and left traffic-light window controls.
    *   *Linux Terminal Mode*: Minimalist design, monospace terminal typography, and custom borders.
*   **"Ask Me" AI-style Assistant**: A local, rule-based chatbot with a typing indicator, suggestion chips, and parsed queries ensuring factually accurate answers from the resume dataset.
*   **File Explorer App**: Interactive directory routing (`C:\`, `C:\Certificates`, `C:\Projects`, etc.) allowing double-click preview of PDFs inside a built-in modal viewer.
*   **Adaptive Responsive Layout**: Instantly switches between the Desktop environment and the Mobile launcher when resizing the screen.
*   **Light & Dark Theme**: Toggle theme configurations seamlessly. Uses custom AI-generated matching light and dark wallpapers.

---

## 🛠️ Technology Stack

Built with a focus on performance, accessibility, and zero-dependencies:
*   **Structure**: Semantic HTML5 markup
*   **Style**: Advanced CSS3 (CSS Custom Variables, Flexbox, CSS Grid, Backdrop Filters for glassmorphism, Keyframes animations)
*   **Logic**: Vanilla ES6+ JavaScript (Draggable/resizable classes, Local Chatbot logic, Dynamic DOM management)
*   **Assets**: Lightweight, responsive SVG vector graphics for all system icons

*Benefits: Zero dependencies, zero build steps, instant load times, and can be opened locally via the `file://` protocol.*

---

## 📁 File Structure

```text
Sagar Portfolio/
│
├── index.html        # Core HTML structure, templates, and SVG icons
├── style.css         # Styling system, theme variables, and layouts
├── app.js            # Stacking context, Window Manager, and app controllers
├── data.js           # Authoritative portfolio database & chatbot rules
├── README.md         # Repository documentation
│
└── assets/           # PDF credentials and multimedia assets
    ├── profile_pic.jpeg
    ├── Sagar_G_Resume.pdf
    ├── Sagar G NSS Certificate.pdf
    ├── SJU Elixir 2.O Certificate.pdf
    ├── SJU Elixir 3.O Certificate.pdf
    ├── SJU Media Volunteer Certificate.pdf
    ├── wallpaper.jpg
    ├── wallpaper_light.jpg
    ├── cert_java_beginners.pdf
    ├── cert_ai_introduction.pdf
    ├── cert_cybersecurity_foundation.pdf
    ├── cert_cybersecurity_awareness.pdf
    ├── internship_eco_dispose.pdf
    ├── research_cybercrime_bengaluru.pdf
    │
    └── Media/        # Event photos, leadership highlights, and screenshots
        ├── Elixir 2.O.jpeg
        ├── Elixir 3 (1).jpeg to Elixir 3 (7).jpeg
        ├── INK (1).jpeg to INK (8).jpeg (screenshots)
        ├── KS (1).jpeg to KS (12).jpeg (Kannada Sangha highlights)
        └── NSS (1).jpeg to NSS (5).jpeg (community service highlights)
```

---

## 💻 Running Locally

No installation or environment setup is needed. You can open and run this project in two ways:

### Option A: Local HTTP Server (Recommended)
To run the server locally on port 8000 using Python (pre-installed on Windows/macOS):
1. Open your terminal in the project directory.
2. Run the following command:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to `http://localhost:8000`.

### Option B: Direct Double-Click
You can double-click `index.html` in your file explorer to open it directly via the `file://` protocol. (Note: Some browsers may restrict PDF preview modal rendering locally due to CORS security policies on iframe file loads).

---

## ⚙️ Customizing Content

All data rendered on the site is loaded from a structured config file:
1. Open [data.js](data.js) in your text editor.
2. Edit the fields under `profile`, `skills`, `education`, `experience`, `projects`, and `certificates`.
3. Customize the chatbot's answers by editing the keys inside the `askMeAnswers` object.
