[Project Root]/
├── backend/ # Node.js + Express + TypeScript backend
│ ├── src/
│ │ ├── routes/ # API routes (/rooms, /bookings, /analytics)
│ │ ├── controllers/ # Handles incoming requests → calls services
│ │ ├── services/ # Business logic (BookingService, RoomService, AnalyticsService)
│ │ ├── models/ # Types + in-memory data store (rooms, bookings)
│ │ ├── utils/ # Pricing engine, date helpers
│ │ └── app.ts # Express app config
│ ├── index.ts # Server entry point
│ ├── package.json
│ └── tsconfig.json
│
├── frontend/ # React + Vite + TypeScript user interface
│ ├── src/
│ │ ├── api/ # API fetch wrappers (getRooms, createBooking, getAnalytics…)
│ │ ├── pages/ # RoomsPage, BookingForm, AdminView
│ │ ├── components/ # Reusable UI blocks (if added later)
│ │ ├── styles/ # Global and page-specific CSS files
│ │ ├── App.tsx # App navigation (Rooms, Book, Admin tabs)
│ │ └── main.tsx # React root
│ ├── public/
│ ├── vite.config.ts
│ └── package.json
│
├── docs/ # Documentation (README.md, ARCHITECTURE.md, etc.)
├── .gitignore
├── README.md
└── ARCHITECTURE.md

1 Frontend

Name: Workspace Booking Web App
Description:
A modern, clean UI allowing users to view rooms, create bookings, cancel bookings, and view analytics through an admin panel.

Technologies:

React

TypeScript

Vite

CSS (custom theme)

Deployment:

Netlify or Vercel

2 Backend Services
2.1 Booking Service

Name: Booking Management Service
Description:
Responsible for:

creating bookings

validating time ranges

detecting overlaps

enforcing 12-hour max rule

cancellation (>2 hours rule)

Technologies:

Node.js

Express

TypeScript

Day.js

Deployment:

Render or Railway

2.2 Room Service

Name: Room Information Service
Description:
Provides list of rooms and room details.

2.3 Analytics Service

Name: Booking Analytics Engine
Description:
Computes:

total hours used per room

total revenue

time-range filtered analytics

Uses proportional revenue distribution for partial overlaps.

4. Data Stores
   In-Memory Store

Name: In-Memory Runtime Data
Type: JavaScript Objects (no DB)
Purpose:
Stores runtime:

rooms

bookings

Key Data Structures:

rooms[]

bookings[]

6. Deployment & Infrastructure

Cloud Provider:

Backend: Render

Frontend: Netlify

Backend:

cd backend
npm install
npm run dev

Frontend:

cd frontend
npm install
npm run dev

10. Project Identification

Project Name: Craft Project
Repository URL:https://github.com/SkAliya/craft-project
Last Updated: 2025-11-18
