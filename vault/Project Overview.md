# Project Overview

Port A Local Co is a **Next.js web application** + **Expo mobile app** for Port Aransas, TX.

## Three Workstreams

### 1. Business Directory (Web)
A curated guide to local businesses across 5 categories:
- **Eat** — 14 restaurants, cafes, bars
- **Do** — 7 activities, charters, tours
- **Stay** — 4 hotels, resorts, rentals
- **Shop** — 4 boutiques, surf shops
- **Services** — 3 local service providers

Every listing includes scraped data: hours of operation, menus, charter pricing, rental rates, schedules, amenities, and more.

See: [[Business Directory Index]]

### 2. Task Dispatch System (Web + Mobile)
An internal workforce management tool. Managers dispatch tasks from the web admin dashboard, and workers receive push notifications on their iPhones.

- **Web Admin** — `/admin` dashboard with 3 tabs (Dispatch, Tasks, Workers)
- **Mobile App** — Expo/React Native with bottom tab navigation
- **Labor Groups** — Runner, Maintenance, All
- **Push Notifications** — via Expo Push Notification Service (free)

See: [[Mobile App — iOS Task Dispatch]], [[API Routes]]

### 3. Brand Design
Frontend styled to match [[The Palm Republic]] — Winston's coastal lifestyle apparel brand. Navy blue + coral sunset palette with Playfair Display serif headings.

See: [[Design System]]

## Repository
- Branch: `claude/scrape-business-data-wOonK`
- Framework: Next.js 16.2.1 (App Router, React 19, TypeScript 6)
- Styling: Tailwind CSS 4
- Database: SQLite via better-sqlite3
- Mobile: Expo SDK 54, React Native 0.81.5

## Related
- [[Tech Stack]]
- [[Team]]
- [[Environment Setup]]
