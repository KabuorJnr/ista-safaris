# ISTA Safaris

A travel companion for Taita Taveta, Kenya, built to match the Figma Make design. React + Vite + TypeScript, Leaflet/OpenStreetMap, Supabase Auth, offline PWA.

Fonts: DM Serif Display (headings) and Manrope (text), self hosted through Fontsource under the SIL Open Font License. Icons: Lucide (ISC) plus three small custom icons in `src/components/icons.tsx`.

## Run
    npm install
    cp .env.example .env   # add Supabase URL and publishable key
    npm run dev
    npm run build

## Supabase
Create a project, run `supabase/migrations/001_profiles_and_deletion_requests.sql`, and set the two env vars. Without them the app runs but sign in and sign up show a "not connected" notice.

## Before launch
- Replace every `[PLACEHOLDER]` in the legal pages with real business details and have them reviewed by a lawyer.
- The photos and logo in `public/images` and `public/icons` were captured from the screen recording of the design, so they are screen resolution only. Replace them with the original high resolution files and confirm you have the rights to use them (for example the Unsplash licence, if that is where Figma Make took them from).
- Figures copied from the design are marked `CHECK` in `src/data/content.ts` (ratings, sighting and lodge counts, the 482 MB pack size). Replace them with real data or remove them before launch. The weather line in the hero is live from Open-Meteo and hides itself when offline.
- The smart suggestion text and the nearby distances are fixed copy from the design, not calculated from the visitor's location.
- Verify place coordinates in `src/data/places.ts`.
- Routing uses the public OSRM demo and Nominatim, which are for light use only; use your own or a paid provider for production.
