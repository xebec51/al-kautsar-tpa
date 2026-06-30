# CLAUDE.md

# Al-Kautsar TPA

## Project Overview

Al-Kautsar TPA is a Smart TV application for teaching Islamic education (TPA) at Masjid Al-Kautsar.

The application runs inside the built-in browser of a VIDAA Smart TV and should feel like a native TV application.

The teacher controls the application using only the Smart TV remote.

---

# Core Principles

- Keep the project simple.
- Avoid over-engineering.
- Implement only what is currently needed.
- Prefer reusable components.
- Prioritize readability over visual decoration.
- Optimize for Smart TV first, desktop second.

---

# Technology

- React
- Vite
- TypeScript
- Tailwind CSS v3
- React Router

Store application content in JSON files.

---

# User Interface

Everything visible to users must be written in **Bahasa Indonesia**.

Source code, folder names, variables, comments, and Git commits use **English**.

---

# Smart TV Design Rules

This is **not** a website.

This is a Smart TV application.

Always prioritize:

- fullscreen layout
- dark theme
- high contrast
- large typography
- simple navigation
- comfortable reading from several meters away

Avoid:

- tiny text
- hover interactions
- complicated menus
- unnecessary dialogs
- unnecessary animations

---

# Prayer Screen

Each prayer is displayed on a single screen.

Display:

- Judul
- Arab
- Latin
- Arti Bahasa Indonesia

Arabic is always the primary visual focus.

Do not split Arabic, Latin, and translation into different pages.

Use approximately 85–90% of the screen width.

Avoid excessive empty space.

Do not vertically center educational content.

---

# Navigation

The Smart TV remote is the only input device.

Supported keys:

- ArrowUp
- ArrowDown
- ArrowLeft
- ArrowRight
- Enter
- Escape / Back

Use DOMRect-based spatial navigation.

Do not depend on browser tab order.

---

# Project Structure

Use feature-based architecture.

Example:

src/
  components/
  features/
    prayer/
    dua/
    tpa/
    settings/
  hooks/
  layouts/
  navigation/
  pages/
  styles/
  utils/

---

# Roadmap

1. Project Foundation
2. TV Navigation Engine
3. Prayer Module
4. Daily Dua
5. TPA Materials
6. Settings
7. JSON Content Management
8. Polish & Production

---

# Non Goals

Do not implement unless explicitly requested:

- Presenter Mode
- Companion apps
- Multi-device synchronization
- WebSocket
- Firebase Realtime
- Complex dashboards

---

# Development Workflow

For every milestone:

1. Briefly explain the implementation plan.
2. Implement completely.
3. Run TypeScript.
4. Run ESLint.
5. Run production build.
6. Fix issues automatically.
7. Perform a short self-review.

Do not ask for confirmation between these steps.

Leave the repository in a clean, production-ready state.

## Finalization Rule

Unless explicitly instructed otherwise, every milestone must be considered complete before stopping.

Before finishing:

- review the implementation,
- simplify unnecessary code,
- fix inconsistencies,
- remove dead code,
- verify TypeScript,
- verify ESLint,
- verify production build.

Do not leave partially implemented features.