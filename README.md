# SUPRSS - RSS Feed Aggregator with Real-Time Chat

A modern web application that allows users to aggregate RSS feeds and engage in real-time discussions about articles. Built with Next.js, TypeScript, Socket.IO, and MongoDB.

## Features

### Core Functionality

-   **RSS Feed Management**: Import and manage RSS feeds from various sources
-   **Real-Time Chat**: Live chat functionality for discussing articles and feeds
-   **User Authentication**: Secure authentication powered by Clerk
-   **Feed Collections**: Organize feeds into collections with different access rights
-   **Article Management**: Track read status, favorites, and personal article data
-   **User Dashboard**: Personalized dashboard with onboarding flow

### Technical Features

-   **Microservices Architecture**: Separate frontend and backend services
-   **Real-Time Communication**: Socket.IO for instant messaging
-   **Modern UI**: Built with Tailwind CSS and DaisyUI components
-   **Type Safety**: Full TypeScript implementation with Zod validation
-   **Docker Support**: Complete containerization with Docker Compose
-   **Database**: MongoDB with proper indexing and relationships

## Architecture

### Frontend (`/front`)

-   **Framework**: Next.js 15 with App Router
-   **Styling**: Tailwind CSS + DaisyUI
-   **State Management**: Zustand
-   **Authentication**: Clerk
-   **Real-time**: Socket.IO Client
-   **HTTP Client**: Axios
-   **Validation**: Zod schemas

### Backend (`/back`)

-   **Framework**: Next.js 15 API Routes
-   **Database**: MongoDB with native driver
-   **Authentication**: Clerk server-side
-   **Validation**: Zod schemas
-   **CORS**: Configured for cross-origin requests

### Socket Server

-   **Technology**: Socket.IO standalone server
-   **Features**: Room-based messaging, connection management
-   **Port**: 3001 (configurable)

## 📁 Project Structure

```
4PROJ_2/
├── front/                    # Frontend Next.js application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── feeds/       # Feed-related pages
│   │   │   └── socket-server.mjs # Socket.IO server
│   │   ├── components/      # React components
│   │   │   ├── chat/        # Chat functionality
│   │   │   ├── user/        # User management
│   │   │   └── drawer/      # Navigation drawer
│   │   ├── store/           # Zustand state management
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── package.json
├── back/                     # Backend API service
│   ├── src/
│   │   ├── app/api/         # API routes
│   │   │   ├── user/        # User management endpoints
│   │   │   └── feed/        # Feed management endpoints
│   │   ├── types/           # Shared type definitions
│   │   ├── utils/           # Database utilities
│   │   └── variables/       # Constants and messages
│   └── package.json
├── docker-compose.yml        # Container orchestration
└── Makefile                 # Development commands
```

## Technology Stack

### Frontend Dependencies

-   **Next.js 15**: React framework with App Router
-   **React 19**: Latest React with concurrent features
-   **TypeScript 5**: Type safety and developer experience
-   **Tailwind CSS 4**: Utility-first CSS framework
-   **DaisyUI**: Component library for Tailwind
-   **Socket.IO Client**: Real-time communication
-   **Clerk**: Authentication and user management
-   **Zustand**: Lightweight state management
-   **Axios**: HTTP client for API calls
-   **RSS Parser**: RSS feed parsing
-   **Zod**: Runtime type validation

### Backend Dependencies

-   **Next.js 15**: API routes and server-side functionality
-   **MongoDB**: Document database
-   **Clerk**: Server-side authentication
-   **Zod**: Schema validation
-   **TypeScript**: Type safety

### Infrastructure

-   **Docker & Docker Compose**: Containerization
-   **MongoDB 7**: Database with persistent storage
-   **Mongo Express**: Database administration interface
-   **Node.js 20**: Runtime environment

## Getting Started

### Prerequisites

-   Docker and Docker Compose
-   Node.js 20+ (for local development)
-   Clerk account for authentication

### Environment Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd 4PROJ_2
```

2. **Create environment file**
   Create a `.env` file in the root directory (.env.example for the reference):

```env
# MongoDB Configuration
MONGO_PORT=27017
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_DB=rss_app

# Application Ports
BACK_PORT=3001
FRONT_PORT=3000
SOCKET_PORT=3001

# URLs
BACK_URL=http://localhost:3001
FRONT_URL=http://localhost:3000
SOCKET_URL=http://localhost:3001
URL_FRONT=http://localhost:3000

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Mongo Express
MONGO_EXPRESS_PORT=8081
MONGO_EXPRESS_USERNAME=admin
MONGO_EXPRESS_PASSWORD=password
```

3. **Start the application**

```bash
docker-compose up -d
```

4. **Install dependencies** (if needed)

```bash
make install-front
make install-back
```

### Development Commands

```bash
# Install dependencies
make install-front
make install-back

# Add new packages
make add-front PKGS="package-name"
make add-back PKGS="package-name"

# Reinstall dependencies (clean install)
make reinstall-front
make reinstall-back
```

## Application URLs

-   **Frontend**: http://localhost:3000
-   **Backend API**: http://localhost:3001
-   **Socket.IO Server**: http://localhost:3001/chat
-   **MongoDB**: localhost:27017
-   **Mongo Express**: http://localhost:8081

## Database Schema

### Collections

#### Users

-   User profiles with Clerk integration
-   Feed and collection subscriptions
-   Article read status and favorites
-   Notification preferences

#### Feeds

-   RSS feed metadata and configuration
-   Feed status (active/inactive)
-   Feed type categorization

#### Collections

-   Grouped feeds with access control
-   User permissions (admin, read-only, etc.)
-   Update intervals and settings

#### Articles

-   Parsed RSS articles
-   Content and metadata
-   Associated feed information

#### Chat

-   Real-time messages
-   Room-based organization
-   User attribution

## API Endpoints

### User Management

-   `GET /api/user` - Get or create user profile
-   `PUT /api/user` - Update user information

### Feed Management

-   `POST /api/feed/import` - Import RSS feed

### Authentication

All API endpoints require Clerk JWT authentication via `Authorization: Bearer <token>` header.

## Key Features Explained

### RSS Feed Processing

The application uses `rss-parser` to fetch and parse RSS feeds, extracting:

-   Article titles, links, and publication dates
-   Content and snippets
-   Media attachments and thumbnails
-   Feed metadata

### Real-Time Chat

Socket.IO enables:

-   Room-based messaging for specific feeds/articles
-   Real-time message broadcasting
-   Connection state **management**
-   Cross-origin support

### User Authentication

Clerk provides:

-   Secure user authentication
-   JWT token validation
-   User profile management
-   Social login options

### State Management

Zustand handles:

-   User session state
-   Feed data caching
-   UI state management
-   Persistent storage

## Security Features

-   **JWT Authentication**: Secure API access with Clerk tokens
-   **CORS Configuration**: Controlled cross-origin requests
-   **Input Validation**: Zod schema validation on all inputs
-   **Environment Variables**: Sensitive data **protection**
-   **Docker Isolation**: Containerized services

## Deployment

The application is containerized and ready for deployment with:

-   Docker Compose for orchestration
-   Environment-based configuration
-   Persistent data volumes
-   Health checks and restart policies
