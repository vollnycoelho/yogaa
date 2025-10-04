# Sarvaswasthyam Yoga & Fitness

A full-stack React web application for yoga session booking and exercise library management with role-based access control.

## Overview

Sarvaswasthyam is a comprehensive yoga and fitness platform built with React, Express, and PostgreSQL. It features user authentication, session booking with payment simulation, an exercise video library, and separate dashboards for users and administrators.

## Architecture

### Frontend
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Shadcn UI with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation

### Backend
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Express Session with secure session management
- **Password Security**: bcrypt for password hashing
- **API Design**: RESTful API with proper error handling

### Design System
- **Primary Color**: Sage/Teal (150 45% 45%) for wellness aesthetics
- **Secondary Color**: Soft Purple (280 30% 60%)
- **Accent Color**: Warm Coral (25 85% 60%)
- **Typography**: Inter for headings, Lora for body text
- **Dark Mode**: Full dark mode support

## Features

### User Features
- **Authentication**: Secure login/registration with hashed passwords
- **Session Browsing**: Filter sessions by category and difficulty level
- **Booking System**: Multi-step booking flow with payment simulation
- **Exercise Library**: Video library with search and filtering
- **User Dashboard**: View and manage bookings

### Admin Features
- **Session Management**: Create, update, and delete yoga sessions
- **Booking Overview**: View all user bookings and revenue
- **Announcements**: Create announcements for users
- **Analytics**: Dashboard with key metrics

## Database Schema

### Users
- id (UUID, primary key)
- username (unique)
- password (bcrypt hashed)
- email
- role (user/admin)
- fullName

### Sessions
- id (UUID)
- title, description
- instructor, category, level
- duration, maxParticipants, currentParticipants
- price, schedule
- imageUrl

### Bookings
- id (UUID)
- userId, sessionId
- sessionDate
- status (confirmed/cancelled)

### Exercises
- id (UUID)
- title, description
- videoUrl, duration
- level, category
- thumbnailUrl

### Announcements
- id (UUID)
- title, content
- authorId

## Security

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
- **Session Management**: Secure session cookies with HTTP-only flags
- **Authentication**: Protected routes with role-based access control
- **Input Validation**: Zod schemas for all API inputs

## Test Credentials

**Admin Account:**
- Username: admin
- Password: admin123

**User Account:**
- Username: user
- Password: user123

## API Routes

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user
- GET /api/auth/me - Get current user

### Sessions
- GET /api/sessions - Get all sessions
- GET /api/sessions/:id - Get session by ID
- POST /api/sessions - Create session (admin only)
- PATCH /api/sessions/:id - Update session (admin only)
- DELETE /api/sessions/:id - Delete session (admin only)

### Bookings
- GET /api/bookings - Get user's bookings
- POST /api/bookings - Create booking
- DELETE /api/bookings/:id - Cancel booking

### Exercises
- GET /api/exercises - Get all exercises
- POST /api/exercises - Create exercise (admin only)
- PATCH /api/exercises/:id - Update exercise (admin only)
- DELETE /api/exercises/:id - Delete exercise (admin only)

### Announcements
- GET /api/announcements - Get all announcements
- POST /api/announcements - Create announcement (admin only)
- DELETE /api/announcements/:id - Delete announcement (admin only)

## Development

### Setup
1. PostgreSQL database is automatically configured
2. Run `tsx server/seed.ts` to seed initial data
3. Run `npm run dev` to start the application
4. Frontend runs on port 5000

### File Structure
- `/client` - React frontend
  - `/src/pages` - Page components
  - `/src/components` - Reusable components
  - `/src/contexts` - React contexts (Auth)
- `/server` - Express backend
  - `routes.ts` - API routes
  - `storage.ts` - Database operations
  - `seed.ts` - Database seeding
- `/shared` - Shared types and schemas

## Recent Changes

### 2024-10-02: Backend Integration & Security
- ✅ Set up PostgreSQL database with Drizzle ORM
- ✅ Implemented complete storage layer with CRUD operations
- ✅ Built RESTful API for all features
- ✅ Connected frontend to backend APIs
- ✅ Fixed critical security vulnerability: implemented bcrypt password hashing
- ✅ Added password verification during login
- ✅ Re-seeded database with securely hashed passwords
