# Itihasa — Digital Heritage Preservation & Cultural Information Portal

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748.svg)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Zero--Config-003B57.svg)](https://sqlite.org/)

**Itihasa** is a digital sanctuary and cultural information portal designed to document, preserve, and promote historical monuments, living festivals, oral lore, and community contributions. Styled as an exquisite intersection of a world-class cultural museum and a modern editorial travel publication.

---

## 🏛️ Features

1. **Cinematic Hero & Unified Search**: Fast cross-entity command palette (`Ctrl/Cmd + K`) indexing monuments, festivals, and oral histories.
2. **Heritage Monuments Registry (`/sites`)**: 12 pre-seeded iconic monuments (Amer Fort, Hampi, Konark, Khajuraho, Meenakshi Temple, Ajanta, Taj Mahal, Rani ki Vav, etc.) with grid/list toggles, multi-parameter filters (Category, Era, District, Conservation Status, Protection Status), sorting, and pagination.
3. **Immersive Site Details (`/sites/:slug`)**: Fullscreen photo gallery with lightbox, architectural grammar, historical chronology, visitor logistics (hours, entry fees, optimal seasons), interactive Leaflet mini-map with directions, and related events.
4. **Interactive Cultural Cartography (`/map`)**: Fullscreen Leaflet map using CartoDB Voyager tiles, category-colored pins, interactive popups, coordinate inspect drawer, and live filtering.
5. **Living Traditions & Festivals (`/events`)**: Calendar and list view toggles, traditions guide, and one-click **Add to Calendar (.ics download)**.
6. **Civilization Timeline (`/timeline`)**: Chronological spine traversing Ancient, Medieval, Colonial, and Modern epochs.
7. **Oral Histories & Audio Archives (`/stories`)**: Community narratives, stone craft guilds lore, and embedded field audio recordings.
8. **Masonry Architectural Gallery (`/gallery`)**: 20+ architectural photographs with category filters, credits, and lightbox view.
9. **Crowdsourced Stewardship (`/contribute`)**: Friendly 4-step wizard with honeypot spam protection, rate limiting, and instant feedback.
10. **Curator Administration Portal (`/admin`)**:
    - Login-protected with secure JWT and bcrypt password hashing.
    - Analytics overview and interactive charts powered by **Recharts**.
    - Review queue to approve or reject community contributions.
    - Site manager with creation form and image upload tool.
11. **Bilingual & Night Lamp Mode**:
    - Full English and Hindi translations (`i18next`).
    - Parchment Day Mode vs. Night Lamp Dark Mode.
    - LocalStorage-backed bookmarking system.

---

## 🛠️ Tech Stack

- **Monorepo**: Root workspace managing `/client` and `/server`.
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Leaflet & React-Leaflet, Recharts, i18next.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, SQLite (`dev.db`), Multer, bcryptjs, jsonwebtoken, express-rate-limit, Helmet, CORS.
- **Testing**: Vitest + Supertest for automated REST API test coverage.

---

## 🚀 Quick Start (One-Command Setup)

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 1. Install Dependencies
Run from the root directory:
```bash
# Install root, server, and client dependencies
npm install --workspace=server
npm install --workspace=client
```

### 2. Database Migration & Realistic Seeding
Run Prisma migration and execute the comprehensive seed script:
```bash
# In the /server directory:
cd server
npx prisma generate
npx prisma db push
npm run seed
cd ..
```
*Seeds 12 heritage monuments, 8 festivals, 6 oral stories, sample moderation submissions, and an administrator account.*

### 3. Start Both Servers
To run both backend API (Port `5000`) and frontend client (Port `5173`):

**Option A: Dedicated Terminals (Recommended for Windows)**
- Terminal 1: `cd server && npm run dev`
- Terminal 2: `cd client && npm run dev`

**Option B: Root Concurrent Command**
```bash
npm run dev
```

Visit **http://localhost:5173** in your web browser.

---

## 🔐 Administrator Credentials

A default curator account is pre-configured for local testing:
- **Email**: `admin@itihasa.org`
- **Password**: `admin123`
- **Portal Link**: http://localhost:5173/admin/login

> [!WARNING]
> In production deployments, immediately change the default administrator credentials and set a unique, random `JWT_SECRET` in `server/.env`.

---

## 🧪 Automated Testing

To run the automated API test suite:
```bash
cd server
npm test
```
Verifies endpoints:
- `GET /api/sites` (query filtering & pagination)
- `GET /api/sites/:slug`
- `GET /api/events` and `.ics` generation
- `GET /api/stats`
- `POST /api/submissions` (including honeypot spam deterrence)
- `POST /api/auth/login` (admin JWT issuance)

---

## 🔮 Suggested Next-Step Roadmap
1. **PWA Offline Support**: Enable ServiceWorker caching for offline monument guide access when traveling in remote valleys without cellular coverage.
2. **WebXR / 3D Photogrammetry**: Three.js / model-viewer integration for interactive 3D temple scans.
3. **AI-Powered Synthesis**: Generate contextual multilingual audio guide summaries based on visitor location.
4. **On-Site QR Beacons**: Dynamic QR generator for physical heritage sites linking directly to the corresponding Itihasa sanctuary guide.

---

## 📄 License
This cultural heritage platform is open-source under the MIT License.
