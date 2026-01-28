# Mora - Browsing Habits Tracker

A free web application that helps users track their browsing habits and get AI-powered insights to boost productivity.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Authentication Flow](#authentication-flow)
- [Privacy Policy System](#privacy-policy-system)
- [Database Schema](#database-schema)
- [Deployment](#deployment)

## Overview

Mora is a productivity tracking application that monitors browsing patterns and provides personalized insights using AI. Users can understand where their time goes online and receive actionable recommendations to improve focus and productivity.

## Features

- **Google OAuth Authentication**: Secure login with Google accounts
- **Privacy Policy Management**: Mandatory privacy policy acceptance
- **Browsing Data Tracking**: Monitor time spent on different websites
- **AI-Powered Insights**: Get personalized productivity recommendations using Google Gemini
- **Data Visualization**: View browsing statistics and patterns
- **Data Export**: Export browsing data for analysis
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Passport.js** - Authentication middleware
- **JWT** - Token-based authentication
- **Google OAuth 2.0** - Authentication provider

### Database
- **Supabase** - PostgreSQL database and backend services

### AI Integration
- **Google Generative AI** - AI insights using Gemini model
- **LangChain** - Markdown parsing and text processing

## Project Structure

```
Mora/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   └── App.jsx        # Main app component
│   ├── public/            # Static assets
│   └── vite.config.js     # Vite configuration
├── server/                # Backend Node.js application
│   ├── routes/           # API route handlers
│   ├── config/           # Configuration files
│   ├── utils/            # Utility functions
│   ├── schema.sql        # Database schema
│   └── index.js          # Server entry point
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Google Cloud Console account

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mora
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Database setup**
   - Create a Supabase project
   - Run the SQL schema from `server/schema.sql`
   - Add privacy policy fields:
     ```sql
     ALTER TABLE users 
     ADD COLUMN privacy_policy_accepted BOOLEAN DEFAULT FALSE,
     ADD COLUMN privacy_policy_accepted_at TIMESTAMP WITH TIME ZONE;
     ```

4. **Environment configuration**
   Create `.env` file in the server directory:
   ```env
   PORT=3001
   CLIENT_URL=https://moraextension.pages.dev
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_API_KEY=your_google_api_key
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the application**
   ```bash
   # Start server (from server directory)
   npm start

   # Start client (from client directory)
   npm run dev
   ```

## Configuration

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://mora-5znf.onrender.com/auth/google/callback`

### Google AI API Setup
1. Enable Generative AI API in Google Cloud Console
2. Create API key
3. Add to environment variables

### Supabase Configuration
1. Create new Supabase project
2. Get project URL and anon key
3. Update `server/config/database.js` with your credentials

## API Documentation

### Authentication Endpoints

#### `GET /auth/google`
Initiates Google OAuth flow
- **Response**: Redirects to Google OAuth

#### `GET /auth/google/callback`
Handles Google OAuth callback
- **Response**: Redirects to client with JWT token

#### `POST /auth/logout`
Logs out user
- **Response**: `{ success: true }`

#### `GET /auth/verify`
Verifies JWT token
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ valid: true, user: {...} }`

### Privacy Policy Endpoints

#### `GET /api/privacy/status`
Check privacy policy acceptance status
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ accepted: boolean }`

#### `POST /api/privacy/accept`
Accept privacy policy
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: true }`

### Insights Endpoints

#### `POST /api/insights/generate`
Generate AI insights from browsing data
- **Headers**: `Authorization: Bearer <token>`
- **Body**: 
  ```json
  {
    "date": "2024-01-01",
    "data": {
      "domain1.com": 3600000,
      "domain2.com": 1800000
    }
  }
  ```
- **Response**: 
  ```json
  {
    "date": "2024-01-01",
    "insights": "AI-generated insights text",
    "summary": {
      "totalTime": 90,
      "topDomains": [...]
    }
  }
  ```

### Stats Endpoints

#### `POST /api/stats/save`
Save browsing statistics
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ data: {...} }`

#### `GET /api/stats/get`
Retrieve browsing statistics
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of usage data

### Backup Endpoints

#### `POST /api/backup/create`
Create data backup
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ data: {...} }`

#### `GET /api/backup/list`
List user backups
- **Headers**: `Authorization: Bearer <token>`

## Authentication Flow

1. **User clicks "Sign in with Google"** → Redirects to `/signin`
2. **User clicks Google button** → Calls `/auth/google`
3. **Google OAuth flow** → User authorizes application
4. **Google callback** → `/auth/google/callback` processes response
5. **JWT creation** → Server creates JWT with user data
6. **Client redirect** → Redirects to `/auth/callback` with token
7. **Token processing** → Client saves token and user data
8. **Privacy check** → PrivacyPolicyGuard checks acceptance
9. **Dashboard access** → User accesses protected routes

## Privacy Policy System

### Flow
1. **After login** → PrivacyPolicyGuard checks `/api/privacy/status`
2. **If not accepted** → Redirects to `/privacy-policy`
3. **User agreement** → Must check checkbox to continue
4. **API call** → `/api/privacy/accept` updates database
5. **Redirect** → User proceeds to dashboard

### Database Fields
- `privacy_policy_accepted`: Boolean (default: false)
- `privacy_policy_accepted_at`: Timestamp

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  google_id VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  avatar VARCHAR,
  privacy_policy_accepted BOOLEAN DEFAULT FALSE,
  privacy_policy_accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Usage Data Table
```sql
CREATE TABLE usage_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### AI Insights Table
```sql
CREATE TABLE ai_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  insights TEXT NOT NULL,
  data_snapshot JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Backups Table
```sql
CREATE TABLE backups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  backup_type VARCHAR DEFAULT 'manual',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: null | UserObject,
    token: null | string,
    isAuthenticated: boolean,
    loading: boolean
  }
}
```

### Auth Actions
- `loginStart()` - Set loading state
- `loginSuccess(payload)` - Set user and token
- `loginFailure()` - Clear auth state
- `logout()` - Clear all auth data
- `setUser(user)` - Update user data

## Component Architecture

### Key Components
- **App.jsx** - Main application wrapper
- **AuthInitializer** - Loads auth state from localStorage
- **PrivacyPolicyGuard** - Protects routes requiring privacy acceptance
- **Navbar** - Navigation with auth-aware UI
- **HeroSection** - Landing page hero
- **SignIn** - Google authentication page
- **PrivacyPolicy** - Privacy policy acceptance page

### Protected Routes
Routes wrapped with `PrivacyPolicyGuard`:
- `/dashboard`
- `/profile`
- `/settings`

## Deployment

### Environment Variables
```env
# Server
PORT=3001
CLIENT_URL=https://your-domain.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_API_KEY=your_google_api_key
JWT_SECRET=your_jwt_secret

# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build Commands
```bash
# Build client
cd client
npm run build

# Start server
cd server
npm start
```

### Deployment Checklist
- [ ] Update Google OAuth redirect URIs
- [ ] Set production environment variables
- [ ] Configure CORS for production domain
- [ ] Set up SSL certificates
- [ ] Configure database for production
- [ ] Test authentication flow
- [ ] Verify AI insights functionality

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@mora-app.com or create an issue in the repository.