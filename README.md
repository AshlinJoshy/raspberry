# AdScreen MVP

A digital billboard advertising platform MVP connecting screen owners with advertisers.

## Tech Stack
- Frontend: React 18 + TypeScript + Vite
- Styling: Tailwind CSS
- State Management: React Query
- Routing: React Router v6
- Forms: React Hook Form + Zod

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Copy `.env.example` to `.env` and add your Supabase credentials.
    ```bash
    cp .env.example .env
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

4.  **Database Setup:**
    Run the SQL commands in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor.

## Features implemented

- **Authentication:** Login, Signup (Advertiser/Screen Owner).
- **Screen Owner:** Dashboard, Add/Edit Screens, Approvals.
- **Advertiser:** Dashboard, Upload Creatives, Create Campaigns.
- **Player App:** Standalone player at `/player/:screenId`.

## Virtual Monitor Testing

To simulate a screen:
1.  Register a screen in the Screen Owner dashboard.
2.  Get the Screen ID.
3.  Open a new browser window to `http://localhost:5173/player/<YOUR_SCREEN_ID>`.
