# CLAUDE.md

# Al-Kautsar TPA

## Overview

Al-Kautsar TPA is a Smart TV application developed for Islamic education (TPA).

The application is designed primarily for VIDAA Smart TVs and runs inside the built-in browser.

Although it runs inside a browser, the browser should be treated as an application runtime.

The final experience should resemble a native Smart TV application.

This application will be deployed in Masjid Al-Kautsar.

---

# Vision

Create a professional Smart TV application that helps teachers deliver TPA materials clearly and efficiently.

The application should:

- be easy to use
- require only the TV remote
- display readable content from a distance
- be maintainable
- be scalable
- eventually support other mosques

---

# Language Policy

This project uses two languages.

## Source Code

English

Including:

- variables
- functions
- components
- folders
- comments
- documentation

## User Interface

Indonesian

Everything shown to users must be Indonesian.

Examples:

Beranda

Bacaan Shalat

Doa Harian

Materi TPA

Surat Pendek

Tajwid

Pengaturan

Keluar

Do not mix English into the UI.

---

# Target Platform

Primary

VIDAA Smart TV Browser

Future

Android TV

Google TV

Desktop Browser

Tablet

Mobile

Every architectural decision should prioritize Smart TV.

---

# Core Principles

This is NOT a traditional website.

This is a Smart TV application.

Everything should prioritize TV usability.

---

# TV UX

Always use:

Large fonts

Large buttons

High contrast

Simple layouts

Comfortable spacing

Fullscreen interface

Visible focus

No tiny controls

No hover interaction

No mouse dependency

---

# Remote Navigation

Primary input:

TV Remote

Supported keys:

ArrowUp

ArrowDown

ArrowLeft

ArrowRight

Enter

Escape

Back

Never rely on mouse.

Implement a custom Focus Manager.

---

# Tech Stack

Frontend

React

Vite

TypeScript

Tailwind CSS

Routing

React Router

Animation

Framer Motion

Backend (future)

Firebase

Realtime

Firestore

WebSocket

Deployment

Vercel

---

# Architecture

Use Feature-Based Architecture.

Example

src/

assets/

components/

features/

prayer/

dua/

tajwid/

presenter/

settings/

navigation/

hooks/

layouts/

pages/

services/

styles/

types/

utils/

---

# Code Quality

Always use:

Strict TypeScript

Functional Components

Hooks

Reusable Components

Composition

Avoid:

any

duplicated logic

large files

deep nesting

---

# Styling

Use Tailwind CSS.

Never use inline styles unless necessary.

Maintain visual consistency.

---

# Performance

Optimize for Smart TVs.

Reduce JavaScript bundle size.

Avoid unnecessary rerenders.

Lazy load pages when appropriate.

---

# Accessibility

Maintain:

Semantic HTML

Keyboard navigation

Visible focus

Proper ARIA labels

---

# Data Strategy

Development

Use JSON files.

Production

Use Firebase.

Never hardcode application content inside components.

---

# Development Workflow

For every task:

Explain architecture.

Explain reasoning.

List files.

Generate code.

Explain implementation.

Suggest improvements.

---

# Milestones

Milestone 1

Project setup

Tailwind

TypeScript

Routing

Theme

Layout

Focus Manager

TV Navigation

Milestone 2

Home Screen

Milestone 3

Prayer Module

Milestone 4

Daily Dua

Milestone 5

Short Surah

Milestone 6

Tajwid

Milestone 7

Presenter Mode

Milestone 8

Admin Dashboard

Milestone 9

Firebase

Milestone 10

Realtime Synchronization

Milestone 11

Offline Support

---

# Git Convention

Use Conventional Commits.

Examples

feat:

fix:

docs:

refactor:

style:

test:

chore:

---

# Non Goals

This project is NOT:

- desktop-first
- mobile-first
- Android application

The Smart TV experience always comes first.

---

# UI Rules

Every visible text must be Indonesian.

Examples:

Beranda

Bacaan Shalat

Doa Harian

Materi TPA

Tajwid

Surat Pendek

Pengaturan

Mode Presentasi

Keluar

Never use English for user-facing content.

---

# Long-Term Goal

Build a production-ready Smart TV application for Masjid Al-Kautsar.

The application should eventually support:

- Bacaan Shalat
- Doa Harian
- Materi TPA
- Surat Pendek
- Tajwid
- Presenter Mode
- Dashboard Admin
- Realtime Synchronization
- Multiple Smart TVs
- Offline Mode

Design every feature with long-term maintainability in mind.