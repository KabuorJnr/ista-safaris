<!-- Continuation header: added by Claude Code. The build note follows unchanged below it. -->
> **Picking up this project (any Claude Code account, any phase).**
> Before doing anything else:
> 1. Read `docs/PROGRESS.md` top to bottom. Its **Current state** section says which phase is active, which branch holds it, what is done, what is next, and what is waiting on the owner. Its **Decisions** section records every owner answer; do not ask those questions again.
> 2. Read this note in full, then `docs/budget/` and `reference/web/` as needed for the phase.
> 3. Run `git log --oneline -20` and `git branch -a` and check they agree with **Current state**. If they disagree, trust git and fix `docs/PROGRESS.md`.
> 4. Follow the working rules in section 2: file tree first, sign-off between phases.
>
> Keep `docs/PROGRESS.md` current: update **Current state** in the same commit as any change of step, and before ending any session. A fork should never depend on chat history.

# ISTA Safaris Android Build Note (Flutter)

Nov 7, 2026 · @Rooney Odhiambo

## 1. Purpose and how to use this note

Build the ISTA Safaris Android app in Flutter, with the Django API and admin it depends on, so that it looks like the web design in `ista-safaris.zip` and follows the stack in the project budget (25 October 2026).

Give Claude Code three inputs, placed in one repository:

| Input | Where to put it | What it decides |
| --- | --- | --- |
| This note, exported as Markdown | `CLAUDE.md` at the repository root (Claude Code reads it automatically) | How to work, what to build, in what order |
| `ISTA_Safaris_Full_Project_Budget.docx` | `docs/budget/` | Scope, stack, phases and what is out of scope |
| `ista-safaris.zip`, unzipped | `reference/web/` | Look, layout, copy, colours, fonts, images |

Order of authority: this note first, then the budget, then the web reference. Where two of them disagree, stop and ask the owner.

The web reference is a design source, not code to port. It is built with React, Supabase and public demo map services; none of these go into the Android app or the production backend.

Scope is Android first, as the budget sets out. iOS, the AI assistant, bookings and payments are Phase 2 items with their own funding decision and are out of scope here.

First message to send Claude Code:

```
Read CLAUDE.md, docs/budget/ and reference/web/ in full. Do not write any code yet.
Reply with: (1) the proposed repository file tree, (2) every package you plan to use with its licence and purpose, (3) any conflicts or open questions you found. Wait for my approval.
```

## 2. Working rules for Claude Code

Work in small, approved steps: no code is written for a phase until the owner has approved its file tree, and no phase starts until the previous one is signed off.

1. **File tree first.** At the start of every phase, list the files you will create or change and any packages you will add. Wait for approval.
2. **Sign-off between phases.** At the end of each phase, stop and report what was built, how you checked it (tests, screenshots) and what is left. Wait for an explicit "approved" before moving on.
3. **Packages need a reason.** For every package give its name, version, licence, purpose and what data it sends off the device. Ask before adding anything under GPL or AGPL, or anything that collects analytics.
4. **Never invent content.** No made-up ratings, reviews, counts, distances, drive times, file sizes, weather or claims. Show real data from the API, or hide the element. Section 7 lists the cases in the design.
5. **No secrets in the repository.** Keys go in `.env` (backend) and `--dart-define-from-file` (app). Commit only `.env.example` files.
6. **Ask, do not guess.** When this note, the budget and the design disagree, or a decision in section 9 is still open, stop and ask.
7. **Checks before "done".** Run `flutter analyze`, `flutter test` and the Django test suite, and fix every failure before reporting a phase complete.
8. **Keep a log.** Record each phase's decisions, deviations from the design and open questions in `docs/PROGRESS.md`.
9. **Git hygiene.** One branch per phase, small commits with clear messages, no force pushes, no rewriting history.

## 3. Tech stack

The budget fixes the core stack: a Flutter Android app, a Django REST API with the Django admin as the content portal, PostgreSQL, and an on-device SQLite cache for offline packs (budget sections 1, 2 and 6). The rows marked *recommended* are Claude Code's starting choice and need the owner's approval in Phase 0.

| Layer | Use | Basis |
| --- | --- | --- |
| Mobile app | Flutter (latest stable) and Dart, Android only | Budget |
| Android target | `targetSdk 36`, `minSdk 24` | Play requires API 36 for new apps from 31 Aug 2026 ([source](https://developer.android.com/google/play/requirements/target-sdk)); `minSdk` is recommended |
| State and navigation | Riverpod, go\_router | Recommended |
| HTTP client | dio, with token refresh and retry | Recommended |
| Local cache | SQLite through drift: places, safety, routes, saved items, pack index | Budget (SQLite local cache) |
| Token storage | flutter\_secure\_storage | Recommended |
| Maps | flutter\_map with tiles from a licensed provider: MapTiler Cloud or Google Maps Platform | Budget; offline tile rights must be confirmed first |
| Location | geolocator, foreground only | Budget (GPS) |
| Audio guides | just\_audio | Budget (audio player) |
| Languages | flutter\_localizations and ARB files, English and Kiswahili first | Budget (localization ready) |
| Icons | Lucide icon set (ISC licence) and three custom icons from the design | Design |
| Fonts | DM Serif Display and Manrope, bundled TTF files (SIL Open Font License) | Design |
| Error reporting | Sentry or similar, off until the user agrees | Budget (monitoring) |
| Backend | Django, Django REST Framework, Django admin | Budget |
| Database | PostgreSQL, managed, with backups | Budget |
| Auth | Email and password, JWT access and refresh tokens (djangorestframework-simplejwt) | Recommended |
| Media | S3-compatible storage and CDN for photos, audio and offline packs (django-storages) | Budget |
| Weather | Open-Meteo, called by the backend and cached | The free API is non-commercial only; commercial use needs a subscription ([source](https://open-meteo.com/en/terms)) |

Do not carry over from the web reference: React, Vite, Leaflet, Supabase, the public OSRM demo router or the public Nominatim geocoder. They are fine for a design preview and wrong for a production app.

## 4. Design reference

Match the web design's look on a phone, starting from its mobile layout (the CSS rules under `max-width: 960px` and `max-width: 560px`), not its desktop layout. The web top navigation becomes an Android bottom navigation bar in the same colours.

Where to look in `reference/web/`:

| Path | What it holds |
| --- | --- |
| `src/styles/global.css` | Every colour, font size, spacing, radius, shadow and the mobile breakpoints |
| `src/pages/` | Page structure and copy for Explore, Directions, Sign in, Sign up and the legal pages |
| `src/components/` | Each component's layout, copy and states (home, directions, auth, layout) |
| `src/components/icons.tsx` | Three custom icons to redraw: route, sparkle, thin arrow |
| `src/data/places.ts`, `src/data/content.ts` | Six seed places and the design copy marked `CHECK` |
| `public/images/`, `public/icons/logo.png` | Photos and logo captured from a screen recording, screen resolution only: placeholders |

### Colour tokens

| Token | Hex | Used for |
| --- | --- | --- |
| background | #FCFBF4 | Page background |
| card | #FDFCF6 | Cards, sheets, map overlays |
| field | #FFFFFC | Input fill |
| ink | #183828 | Headings and body text |
| forest | #23523B | Primary buttons, download card, directions band, active chip |
| forestDark | #17392B | Ask ISTA icon circle |
| terracotta | #BF553A | Map pins, secondary buttons, large eyebrows and links |
| gold | #E8C47C | Italic accent words and icons on forest |
| goldButton | #EACD85 | Download region button |
| goldCard | #DFB960 | Ask ISTA card |
| sand | #F2EFE2 | Smart suggestion card, icon buttons, selected list row |
| line | #E5E1D8 | Borders |
| lineSoft | #EBE7DF | Dividers |
| muted | #7D7E73 | Secondary text in the design |
| online | #5AB36C | Status dot |

Three design colours fail WCAG AA (4.5:1) for small text, so use darker values for text under 18 sp and keep the design values for icons, pins and large text:

| Pair | Design ratio | Use instead for small text | New ratio |
| --- | --- | --- | --- |
| Terracotta on background | 4.42 | #B04B32 | 5.19 |
| Terracotta on sand | 3.98 | #B04B32 | 4.67 |
| Muted on background | 3.97 | #6B6C61 | 5.13 |
| Navigation grey #6B786D on background | 4.47 | #6B6C61 | 5.13 |

### Type, shape and icons

- **DM Serif Display**, regular and italic: every heading, place name and card title. The second line of hero titles is italic in gold: "Go further.", "heading next?", "Know more.", "here."
- **Manrope** 400 to 800: body, labels and buttons. Eyebrows are Manrope 800, uppercase, letter spacing 0.2 em. Buttons are Manrope 800, uppercase, letter spacing 0.06 to 0.1 em.
- Bundle both fonts as TTF files in `assets/fonts/` so text renders offline. Do not fetch fonts at runtime.
- Start from the mobile sizes in the CSS (hero title 42/44, section titles 40/44, sign in and sign up titles 40/44) and map them to a Flutter `TextTheme`. Support system text scaling up to 200% without clipping.
- Radius: 6 for buttons and inputs, 12 for cards, 16 for large containers, fully rounded for chips and pills. Touch targets at least 48 dp.
- Icons: the Lucide set for standard icons; redraw the route, sparkle and thin arrow icons from `icons.tsx` as SVG assets.
- Photos in production come from the backend with alt text and credit. Only the logo is bundled in the app; replace it with the original high resolution file.

Build a debug-only **design gallery** screen showing every token and component, and compare it with screenshots of the web reference at 390 px wide before building screens.

## 5. Screens and features

The app has four bottom tabs (Explore, Map, Directions, Profile) plus the screens below. Screens marked *new* are not in the web design and must be built from the same design system, then shown to the owner as a mock-up before coding.

| Screen | Source | What it does |
| --- | --- | --- |
| Explore (home) | Design: Explore page | Header with logo and status pill; hero with weather line, title, search and voice search; Safety center button; places list with map; greeting; smart suggestion; download card; Explore nearby with filter chips and cards; Discover list; Ask ISTA card |
| Map | Design: map card on Explore | Full-screen map of the region with numbered pins and the selected place card ("View place") |
| Place detail | *New* | Photos, kind, name, description, audio guide, safety notes for that place, credits, Save, Navigate |
| Directions | Design: Directions page | Current location (with a "use my location" button), destination with place suggestions, route on the map, distance, time and step list |
| Safety center | Design: hero button (dialog) | Emergency numbers 999 and 112, park rules, approved safety notices; works offline |
| Ask ISTA | Design: Ask ISTA card | Answers drawn only from verified content in the app (places, safety, FAQs). The AI assistant is Phase 2 |
| Offline packs | *New* | Region packs with real size, version and date; download, update, delete, progress and storage used |
| Sign in | Design: Sign in page | Email and password; forgot password link (*new* reset screen) |
| Sign up | Design: Sign up page | Full name, optional phone, email, country, preferred language, password with show and hide, confirm password, one unticked consent box for age (18 or over, or guardian permission) and the terms and privacy policy |
| Profile | *New* | Edit details, language, saved places, offline packs, privacy choices, legal pages, sign out, delete account |
| Legal | Design: legal pages | Privacy policy, terms, refund policy, data and storage notice, business details, delete my data |
| First launch | *New* | Short privacy notice with equal "Allow" and "No thanks" buttons for optional error reporting |

Rules for design elements whose data does not exist yet:

- **Star ratings**: keep the space in the card layout but show a rating only when the API returns one built from real reviews. The MVP has no reviews, so ratings stay hidden.
- **Discover counts** ("64 sightings", "24 lodges"): compute from published records per category. Hide a category with no records.
- **Distances and drive times**: compute from the user's location and the routing service. Without a route, show straight-line distance labelled as such and no drive time.
- **Smart suggestion**: pick the nearest published place to the user and use that place's own tip text. Without location permission, show no suggestion.
- **Download card**: size and "updated" date come from the pack manifest, never fixed text like "482 MB".
- **Status pill**: "Offline ready" only when the current region pack is on the device; "Offline mode" with no connection; otherwise no pill.
- **Weather line**: live data, hidden when offline or when the weather service fails.
- **Ask ISTA card**: use "Your local guide." until a multilingual assistant exists; "in any language" is a claim the MVP cannot support.
- **Nearby cards**: "Mudanda Rock" and "Lion Ridge" come from the design file; publish them only if the owner confirms they are real, verified places.

Seed data for the prototype: the six places in `src/data/places.ts` (Voi, Aruba Dam, Taita Hills, Mzima Springs, Lake Jipe, Lumo Sanctuary). Their coordinates are approximate and must be verified before release.

## 6. Data, backend and integrations

The app talks to four things: the ISTA API, the media CDN that serves photos, audio and packs, the map tile provider and, only with the user's consent, the error reporting service. Weather, routing and email are reached only through the API, so their keys stay on the server and providers can be swapped.

&#91;embedded content: System architecture · app, API and outside services\]

Shaded boxes are outside providers; the highlighted API is the only part that holds third-party keys other than the restricted map key.

### Repository layout (to confirm in Phase 0)

```
ista-safaris/
  CLAUDE.md            this note
  mobile/              Flutter app (Android)
  backend/             Django project: api, content, accounts, packs apps
  docs/                budget, PROGRESS.md, THIRD_PARTY.md, API notes
  reference/web/       unzipped design reference (read only)
```

### Data model

| Model | Key fields |
| --- | --- |
| Region | name, slug, map bounds, default zoom |
| Place | region, slug, name, kind, category (wildlife, landmark, stay, culture), tagline, description, tip, latitude, longitude, published, verified by, verified at |
| PlaceImage | place, file, alt text (required), credit, licence, order |
| AudioGuide | place, language, file, duration, transcript, narrator credit |
| SafetyNotice | region or place, title, body, severity, approved by, approved at, valid until |
| CuratedRoute | place, geometry, distance, duration, notes, approved by |
| OfflinePack | region, version, size in bytes, manifest file, checksum, built at, includes map tiles (yes or no) |
| Profile | user, full name, phone (optional), country, language, age confirmed at, terms version and accepted at, privacy version |
| SavedPlace | user, place, created at |
| DeletionRequest | user, requested at, status, completed at |

Admin rules: a place or safety notice cannot be published without a verifier and date; an image cannot be published without alt text, credit and licence. This puts the budget's verification and content rights lines into the workflow.

### API (versioned under `/api/v1/`, OpenAPI schema published)

- Auth: `POST auth/register`, `POST auth/token`, `POST auth/token/refresh`, `POST auth/password-reset`, `POST auth/verify-email`
- Account: `GET` and `PATCH me`, `DELETE me` (deletes the account and personal data, confirms by email), `GET`, `POST` and `DELETE me/saved`
- Content: `GET regions`, `GET regions/{slug}/places?category=`, `GET places/{slug}`, `GET places/{slug}/routes`, `GET safety?region=`, `GET legal/{document}`
- Offline: `GET packs`, `GET packs/{id}/manifest`
- Services: `GET weather?region=` (cached for 30 minutes), `GET route?from=&to=` (proxy to the chosen routing provider)

### Offline packs

- A pack is a JSON manifest listing every record, photo, audio file and (only if licensed) map tile archive, each with URL, size and SHA-256 checksum.
- The app downloads into app storage, resumes interrupted downloads, verifies every checksum, writes records to SQLite and swaps in a new version only when complete.
- The size shown to the user is the manifest total. Packs are downloaded only when the user asks; offer a "Wi-Fi only" option.
- Until offline map rights are confirmed, packs carry content, photos and audio but not map tiles, and the app says so.

### Outside services

| Service | Choice | Notes |
| --- | --- | --- |
| Map tiles | MapTiler Cloud (budget lists Flex at US$30 a month) or Google Maps Platform | Restrict the key to the app's package name and signing certificate |
| Routing | Open decision (section 9) | Curated, admin-approved routes take priority inside parks |
| Weather | Open-Meteo via the API | Commercial use needs a subscription |
| Email | Transactional only: verification and password reset | Provider to choose |
| Error reporting | Sentry or similar | Off until the user agrees; no personal data in reports |

## 7. Compliance, privacy and Google Play

Every item below is a release blocker: the app does not go to closed testing until each one is met and listed as checked in `docs/PROGRESS.md`.

| Requirement | How the app meets it |
| --- | --- |
| Privacy policy, terms of service, refund policy | In-app screens plus public web pages; Play needs the privacy policy URL |
| Cookie policy and consent banner | The app sets no cookies. A "data and storage notice" explains what is stored on the device; the first-launch screen asks about optional error reporting with equal "Allow" and "No thanks" buttons |
| Consent boxes | Unticked by default; the API stores the timestamp and policy version of each consent |
| Age consent | Sign up requires 18 or over, or a parent or guardian's permission |
| Minimal data collection | Name, email, country, language and an optional phone number only. Location is used in the foreground, on user action, and never stored on the server |
| Audited third-party SDKs | `docs/THIRD_PARTY.md` lists each package, licence, purpose and data sent; it feeds the Play Data safety form |
| No dark patterns | Equal-weight choices, no pre-ticked boxes, sign out and delete account reachable in two taps from Profile |
| No hidden fees | The app is free and takes no payments in this phase |
| No fake reviews or unsupported claims | Section 5 rules: no ratings without real reviews, counts and sizes from data, live weather or none |
| Accessibility | Alt text on every photo, labels on every icon button for TalkBack, text contrast of at least 4.5:1 (section 4), 48 dp touch targets, full keyboard and D-pad focus order, text scaling to 200% |
| Business details | Business details screen and Play store listing |
| Unsubscribe link in emails | MVP sends transactional email only; any later marketing email needs opt-in and an unsubscribe link |
| Licensed fonts and images | Fonts under SIL Open Font License; every image carries credit and licence in the admin |
| Data deletion | Delete account in the app and on a public web page, as Play requires for apps with account creation |
| Safety positioning | Safety and route screens state that ranger guidance and park rules come first (budget section 6) |

Google Play checklist:

- [ ] Target API level 36, as required for new apps from 31 August 2026 ([source](https://developer.android.com/google/play/requirements/target-sdk))
- [ ] Signed Android App Bundle with Play App Signing; signing keys kept outside the repository
- [ ] Permissions limited to internet, foreground location and, only if voice search stays, the microphone, each requested at the moment of use
- [ ] Data safety form completed from `docs/THIRD_PARTY.md`
- [ ] Account deletion link added in Play Console
- [ ] Store listing: screenshots, short and full description without unsupported claims, privacy policy URL
- [ ] Closed test: a personal developer account created after 13 November 2023 needs at least 12 testers opted in for 14 continuous days before production; organisation accounts are exempt ([source](https://support.google.com/googleplay/android-developer/answer/14151465))

Confirm during the budgeted legal review (KES 40,000) whether ISTA must register with Kenya's Office of the Data Protection Commissioner under the Data Protection Act, 2019.

## 8. Build phases

Nine phases, each ending in a sign-off; phases 2, 3 to 7 and 8 line up with the budget's release stages B (prototype), C (MVP) and D (field pilot).

1. **Phase 0: Setup.** File tree, package list with licences, `flutter create` with the approved application ID, Django project skeleton, CI running analyze and tests.
   - Done when: an empty app runs on an emulator, the backend starts, `flutter analyze` is clean and CI is green.
2. **Phase 1: Design system.** Theme, colour tokens (with the contrast fixes), bundled fonts, buttons, inputs, chips, cards, list rows, bottom bar, custom icons, debug design gallery.
   - Done when: gallery screenshots sit beside the web reference at 390 px and the owner approves them.
3. **Phase 2: Clickable prototype (budget stage B).** Every screen in section 5 with seed data from a local repository; no backend.
   - Done when: every screen is reachable, matches the design, and every icon button has a TalkBack label.
4. **Phase 3: Backend.** Models, admin with the publishing rules, API endpoints, OpenAPI schema, seed command for 10 to 20 curated records, tests.
   - Done when: an admin can create, verify and publish a place, and API tests pass.
5. **Phase 4: Accounts and data.** Sign up, sign in, password reset, email verification, profile, saved places, SQLite cache, consent records, delete account.
   - Done when: a test user can sign up, save a place, go offline, still see it, and delete the account with all personal data removed.
6. **Phase 5: Maps, location and directions.** Map tiles, pins, place selection, GPS, route request through the API, curated routes, offline straight-line fallback.
   - Done when: on a real Android phone, a route from Voi to Taita Hills draws correctly and offline mode shows a clear fallback.
7. **Phase 6: Offline packs and audio guides.** Pack download, resume, checksum, update, delete, storage display; audio player with transcript.
   - Done when: with airplane mode on, the Tsavo pack shows places, photos, safety info and plays audio.
8. **Phase 7: Compliance, languages and accessibility.** Legal screens, first-launch notice, error reporting consent, English and Kiswahili strings, contrast and TalkBack pass, text scaling at 200%.
   - Done when: every row in section 7 is checked and recorded in `docs/PROGRESS.md`.
9. **Phase 8: Release preparation (budget stage D).** Signed release bundle, store listing, Data safety form, closed test, field GPS and offline trials, crash monitoring.
   - Done when: the closed test has run 14 days with at least 12 testers (if the account needs it) and the field trial issues are fixed or logged.

## 9. Open items for the owner

Claude Code needs these answers at the phase shown; until then it uses a clearly labelled placeholder and records it in `docs/PROGRESS.md`.

| Item | Needed by | Notes |
| --- | --- | --- |
| App name on Play and application ID (for example `com.istasafaris.app`) | Phase 0 | Cannot change after the first upload |
| Developer account type: personal or organisation | Phase 0 | Decides whether the 12 tester closed test applies |
| Languages for launch | Phase 1 | Note assumes English and Kiswahili |
| Map tile provider and offline tile rights | Phase 5 | MapTiler or Google; written confirmation before any offline map promise |
| Routing provider for in-app directions | Phase 5 | Options include a self-hosted OSRM server or a paid routing API |
| Weather: paid Open-Meteo plan or remove the weather line | Phase 5 | Free tier is non-commercial only |
| Hosting for Django, PostgreSQL and media | Phase 3 | Budget allows KES 42,000, 30,000 and 30,000 a year |
| Email and error reporting providers | Phase 4 | Budget allows KES 18,000 a year for both plus monitoring |
| Verified attraction list with coordinates (10 to 20 records) | Phase 3 | Confirm whether Mudanda Rock and Lion Ridge are real, verified places |
| Original photos, logo and audio narration with usage rights | Phase 6 | Current images are screen captures |
| Who approves safety content and park routes | Phase 3 | Name the role that signs off in the admin |
| Legal text: business name, registration, address, contacts, lawyer review | Phase 7 | Web reference pages use `[PLACEHOLDER]` text |
| Public domain for the privacy policy and deletion pages | Phase 8 | Play requires both URLs |

Sources: ISTA Safaris full project budget (uploaded file, 25 October 2026) · [Google Play target API requirements](https://developer.android.com/google/play/requirements/target-sdk) · [Google Play testing requirements for new personal accounts](https://support.google.com/googleplay/android-developer/answer/14151465) · [Open-Meteo terms of use](https://open-meteo.com/en/terms)
