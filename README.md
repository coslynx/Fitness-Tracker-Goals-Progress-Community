<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Fitness Tracker MVP
</h1>
<h4 align="center">A web application to help users achieve their fitness goals with goal setting, progress tracking, and a supportive community.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="">
  <img src="https://img.shields.io/badge/Frontend-TypeScript,_React,_TailwindCSS-red" alt="">
  <img src="https://img.shields.io/badge/Backend-Express.js-blue" alt="">
  <img src="https://img.shields.io/badge/Database-PostgreSQL_with_Supabase-black" alt="">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/Fitness-Tracker-Goals-Progress-Community?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/Fitness-Tracker-Goals-Progress-Community?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/Fitness-Tracker-Goals-Progress-Community?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview

This repository contains the code for the Fitness Tracker MVP, a web application designed to empower individuals on their fitness journey. The MVP aims to address the challenges of staying motivated, accountable, and connected during fitness endeavors by providing a platform for goal setting, progress tracking, and social interaction.

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase follows a modular architectural pattern with separate directories for different functionalities, ensuring easier maintenance and scalability.             |
| 📄 | **Documentation**  | The repository includes a README file that provides a detailed overview of the Minimum Viable Product (MVP), its dependencies, and usage instructions.|
| 🔗 | **Dependencies**   | The codebase relies on various external libraries and packages such as React, uuid, esbuild, and eslint, which are essential for building and styling the UI components, and handling external services.|
| 🧩 | **Modularity**     | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for different functionalities such as background, components, and content.|
| 🧪 | **Testing**        | Implement unit tests using frameworks like Jest or React Testing Library to ensure the reliability and robustness of the codebase.       |
| ⚡️  | **Performance**    | The performance of the system can be optimized based on factors such as the browser and hardware being used. Consider implementing performance optimizations for better efficiency.|
| 🔐 | **Security**       | Enhance security by implementing measures such as input validation, data encryption, and secure communication protocols.|
| 🔀 | **Version Control**| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | **Integrations**   | Interacts with browser APIs, external services through HTTP requests, and includes integrations with speech recognition and synthesis APIs.|
| 📶 | **Scalability**    | Design the system to handle increased user load and data volume, utilizing caching strategies and cloud-based solutions for better scalability.           |

## 📂 Structure

```text
├── src
│   ├── core
│   │   ├── config
│   │   │   └── database.ts
│   │   ├── domain
│   │   │   ├── entities
│   │   │   │   └── goal
│   │   │   │       └── Goal.ts
│   │   │   ├── usecases
│   │   │   │   └── goals
│   │   │   │       ├── CreateGoalUseCase.ts
│   │   │   │       ├── GetGoalsUseCase.ts
│   │   │   │       ├── UpdateGoalUseCase.ts
│   │   │   │       └── DeleteGoalUseCase.ts
│   │   │   └── repositories
│   │   │       └── goals
│   │   │           └── IGoalRepository.ts
│   │   └── application
│   │       └── services
│   │           └── goalService.ts
│   ├── infrastructure
│   │   ├── adapters
│   │   │   ├── database
│   │   │   │   └── prisma
│   │   │   │       ├── prisma.ts
│   │   │   │       ├── migrations
│   │   │   │       │   └── _init_.ts
│   │   │   │       └── schema.prisma
│   │   │   ├── api
│   │   │   │   ├── controllers
│   │   │   │   │   └── GoalController.ts
│   │   │   │   └── routes
│   │   │   │       └── goals.ts
│   │   └── gateways
│   │       ├── database
│   │       │   └── prisma
│   │       │       └── GoalRepository.ts
│   │       └── api
│   │           └── GoalMapper.ts
│   ├── presentation
│   │   ├── pages
│   │   │   ├── api
│   │   │   │   ├── auth
│   │   │   │   │   └── [...nextauth].ts
│   │   │   │   └── goals
│   │   │   │       ├── [id]
│   │   │   │       │   └── route.ts
│   │   │   │       └── route.ts
│   │   │   └── app
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── goals
│   │   │       │   └── page.tsx
│   │   │       ├── dashboard
│   │   │       │   └── page.tsx
│   │   │       ├── progress
│   │   │       │   └── page.tsx
│   │   │       ├── community
│   │   │       │   └── page.tsx
│   │   │       └── settings
│   │   │           └── page.tsx
│   │   └── components
│   │       ├── layout
│   │       │   ├── Header.tsx
│   │       │   ├── Footer.tsx
│   │       │   ├── Sidebar.tsx
│   │       │   └── Layout.tsx
│   │       ├── ui
│   │       │   ├── Button.tsx
│   │       │   ├── Card.tsx
│   │       │   ├── Modal.tsx
│   │       │   ├── Input.tsx
│   │       │   ├── Select.tsx
│   │       │   └── Spinner.tsx
│   │       └── features
│   │           ├── auth
│   │           │   ├── LoginForm.tsx
│   │           │   └── SignupForm.tsx
│   │           ├── goals
│   │           │   ├── GoalCard.tsx
│   │           │   ├── GoalForm.tsx
│   │           │   └── GoalList.tsx
│   │           ├── progress
│   │           │   ├── ProgressChart.tsx
│   │           │   └── ProgressLog.tsx
│   │           ├── dashboard
│   │           │   ├── DashboardStats.tsx
│   │           │   └── RecentActivity.tsx
│   │           └── community
│   │               ├── CommunityFeed.tsx
│   │               └── UserProfile.tsx
│   ├── lib
│   │   ├── api
│   │   │   └── client.ts
│   │   ├── hooks
│   │   │   ├── useUser.ts
│   │   │   └── useGoals.ts
│   │   └── utils
│   │       ├── formatters.ts
│   │       ├── validators.ts
│   │       └── calculations.ts
│   ├── styles
│   │   ├── globals.css
│   │   └── theme.ts
│   ├── types
│   │   ├── generation.d.ts
│   │   ├── goal.ts
│   │   ├── progress.ts
│   │   └── user.ts
│   ├── context
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── services
│   │   ├── goalService.ts
│   │   ├── progressService.ts
│   │   └── userService.ts
│   ├── functions
│   │   └── projects
│   │       ├── create.ts
│   │       ├── structure.ts
│   │       └── tech.ts
│   ├── public
│   │   ├── fonts
│   │   └── images
│   └── prisma
│       └── schema.prisma
├── config
│   └── api.ts
├── scripts
│   ├── seed-database.ts
│   └── generate-sitemap.ts
├── .github
│   └── workflows
│       ├── ci.yml
│       └── deploy.yml
└── docs
    ├── API.md
    └── ARCHITECTURE.md

```

## 💻 Installation

### 🔧 Prerequisites
- Node.js v18+
- npm 8+ 
- PostgreSQL 15+
- Docker 20.10+ 

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/Fitness-Tracker-Goals-Progress-Community.git
   cd Fitness-Tracker-Goals-Progress-Community
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in the necessary environment variables in the `.env` file, including:
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google Client ID.
   - `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google Client Secret.
   - `SUPABASE_URL`: Your Supabase URL.
   - `SUPABASE_KEY`: Your Supabase API Key.
4.  Start the development server:
    ```bash
    npm run dev
    ```
5. Access the application:
   - Web interface: [http://localhost:3000](http://localhost:3000)
   - API endpoint: [http://localhost:3000/api](http://localhost:3000/api)

## 🏗️ Usage

### ⚙️ Configuration

- **`next.config.js`:**  This file contains Next.js configurations for image optimization, routing, and other settings.
- **`.env`:** This file stores environment variables like database connection details, API keys, and other sensitive information.

### 📚 Examples

- **Create a new goal:**
  ```bash
  curl -X POST http://localhost:3000/api/goals \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -d '{"type": "weight_loss", "target": 10, "deadline": "2024-12-31"}' 
  ```

- **Log progress towards a goal:**
  ```bash
  curl -X POST http://localhost:3000/api/progress \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -d '{"goalId": "goal_id_here", "value": 2, "date": "2023-06-15"}' 
  ```

## 🌐 Hosting

### 🚀 Deployment Instructions

#### Deploying to Vercel

1. **Create a Vercel account:**
   - Visit [https://vercel.com/](https://vercel.com/) and sign up for a free account.
2. **Initialize Vercel:**
   ```bash
   npm install -g vercel
   vercel init
   ```
3. **Connect your project:**
   - Follow the on-screen prompts to connect your GitHub repository or local project to Vercel.
4. **Deploy your application:**
   ```bash
   vercel deploy
   ```
5. **Configure environment variables:**
   - Navigate to your project's settings on Vercel and add the following environment variables:
     - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google Client ID.
     - `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google Client Secret.
     - `SUPABASE_URL`: Your Supabase URL.
     - `SUPABASE_KEY`: Your Supabase API Key.

### 🔑 Environment Variables
  Provide a comprehensive list of all required environment variables, their purposes, and example values:
  
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google Client ID.
  - `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google Client Secret.
  - `SUPABASE_URL`: Your Supabase URL.
  - `SUPABASE_KEY`: Your Supabase API Key.

## 📜 API Documentation

### 🔍 Endpoints

- **POST /api/auth/register**
  - Description: Register a new user
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST /api/auth/login**
  - Description: Login an existing user
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST /api/goals**
  - Description: Create a new fitness goal
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "target": number, "deadline": date }`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`

- **GET /api/goals**
  - Description: Retrieve a list of all goals for the current user
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[ { "id": string, "type": string, "target": number, "deadline": date, "progress": number }, ... ]`

- **GET /api/goals/:id**
  - Description: Retrieve a specific goal by ID
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`

- **PUT /api/goals/:id**
  - Description: Update a specific goal by ID
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "target": number, "deadline": date }`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`

- **DELETE /api/goals/:id**
  - Description: Delete a specific goal by ID
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{ "message": "Goal deleted successfully" }`

- **POST /api/progress**
  - Description: Log progress towards a goal
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "goalId": string, "value": number, "date": date }`
  - Response: `{ "message": "Progress logged successfully" }`

### 🔒 Authentication

1. Register a new user or login to receive a JWT token.
2. Include the token in the Authorization header for all protected routes:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
3. Tokens expire after a set time, and you can refresh them to continue accessing protected routes.

### 📝 Examples

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"type": "weight_loss", "target": 10, "deadline": "2024-12-31"}'

# Response
{
  "id": "goal123",
  "type": "weight_loss",
  "target": 10,
  "deadline": "2024-12-31",
  "progress": 0
}
```

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: Fitness-Tracker-Goals-Progress-Community

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>