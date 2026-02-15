# CoachHub

## Setup Instructions

1.  **Install Dependencies**
    The initial automated installation was interrupted due to network issues. Please run the following command in your terminal:

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

    If you encounter network errors like `ECONNRESET`, try checking your internet connection or proxy settings.

2.  **Supabase Setup**
    - Create a new project at [supabase.com](https://supabase.com).
    - Copy `web/.env.local.example` to `web/.env.local`.
    - Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

## Project Structure

- `app/(marketing)`: Public pages (Home, Programs).
- `app/(auth)`: Authentication pages (Login, Register).
- `app/(dashboard)`: Student dashboard (Protected).
- `app/(admin)`: Admin/Coach panel (Protected).
- `lib/supabase`: Supabase database client and server utilities.

## Features Implemented (Scaffold)

- Next.js 15 App Router structure
- Tailwind CSS styling
- Supabase Auth integration (Client & Server)
- Marketing pages
- Dashboard shell
- Admin shell
