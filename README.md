# Lithuanian Club of Cleveland — Website

Next.js 14 · TypeScript · Tailwind · Supabase · Cloudflare Pages

## Quick Start

### 1. Clone and install
```bash
git clone https://github.com/astankus28/lithuanian-club.git
cd lithuanian-club
npm install
```

### 2. Supabase setup
1. Create a new project at supabase.com (same org as CLAC is fine)
2. SQL Editor → New Query → paste `supabase/schema.sql` → Run
3. Settings → API → copy your Project URL, anon key, and service role key

### 3. Environment variables
Copy `.env.local.example` to `.env.local` and fill in your values:
```bash
cp .env.local.example .env.local
```

### 4. Run locally
```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin

## Deployment (Cloudflare Pages)

1. Push repo to GitHub (`astankus28/lithuanian-club`)
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
3. Select `astankus28/lithuanian-club`
4. **Framework preset:** Next.js
5. **Build command:** `npm run build`
6. **Build output directory:** `.next`
7. Add all environment variables under Settings → Environment Variables

## Admin Dashboard

Visit `/admin` — login with your `ADMIN_PASSWORD`.

| Section | What you can do |
|---------|----------------|
| Events | Add, edit, delete, publish/draft events |
| Menu | Manage all menu items by category |
| Bookings | View and update status of space inquiries |
| Messages | Read and reply to contact form submissions |
| Members | Manage membership signups, activate/lapse |
| Gallery | Add/remove images (paste public image URLs) |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL + RLS)
- **Auth:** Cookie-based admin password (no Supabase auth needed)
- **Hosting:** Cloudflare Pages
- **Fonts:** Cinzel Decorative, Cinzel, IM Fell English (Google Fonts)
- **Styling:** Tailwind CSS with custom Lithuanian color palette
