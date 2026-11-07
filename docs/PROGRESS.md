# ISTA Safaris: progress log

This file is the hand-over record. Anyone (or any Claude Code account) continuing the project starts here, then reads `CLAUDE.md`. Update **Current state** whenever the step changes and before ending a session.

## Current state

| Item | Value |
| --- | --- |
| Active phase | Phase 0: Setup |
| Phase status | Built; one check outstanding (app on emulator) |
| Working branch | `phase-0-setup` (pushed; CI green) |
| Last phase signed off | None |
| Next step | Run the app on the `Medium_Phone_API_36.1` emulator once disk space is freed, then ask the owner to sign off Phase 0. After sign-off: merge `phase-0-setup` into `main`, branch `phase-1-design-system`, and propose the Phase 1 file tree. |
| Waiting on the owner | Free disk space on C: (emulator refused to start with 206 MB free); Phase 0 sign-off |

### Phase checklist (section 8 of `CLAUDE.md`)

- [ ] Phase 0: Setup
- [ ] Phase 1: Design system
- [ ] Phase 2: Clickable prototype (budget stage B)
- [ ] Phase 3: Backend
- [ ] Phase 4: Accounts and data
- [ ] Phase 5: Maps, location and directions
- [ ] Phase 6: Offline packs and audio guides
- [ ] Phase 7: Compliance, languages and accessibility
- [ ] Phase 8: Release preparation (budget stage D)

### How to run

- App: `cd mobile && flutter pub get && flutter run` (Android emulator or device). Checks: `flutter analyze` and `flutter test`.
- Backend: `cd backend && python -m venv .venv && .venv/Scripts/activate` (Windows) or `source .venv/bin/activate`, then `pip install -r requirements.txt`, `cp .env.example .env`, `python manage.py migrate`, `python manage.py runserver`. Tests: `python manage.py test`.
- CI: `.github/workflows/ci.yml` runs both on every push and pull request.

## Decisions

Owner answers, recorded so they are never asked twice.

| Date | Topic | Decision |
| --- | --- | --- |
| 2026-11-07 | Repository | New private GitHub repo `ista-safaris` under the owner's account. Layout as proposed: `mobile/`, `backend/`, `docs/`, `reference/web/`. |
| 2026-11-07 | Hand-over | `CLAUDE.md` carries a header pointing to this file; this file holds current state so a fork can continue at any phase. |
| 2026-11-07 | Application ID | `com.istasafaris.app` (note's example). Cannot change after the first Play upload. |
| 2026-11-07 | Play developer account | Personal for now, so the closed test needs 12 testers for 14 continuous days. |
| 2026-11-07 | Voice search | Keep. Adds the microphone permission at moment of use; audio goes to the device speech service (listed in `THIRD_PARTY.md`). |
| 2026-11-07 | Weather line | Build behind the API (`GET weather?region=`), hide when offline or no data. Paid Open-Meteo plan or removal still to decide before release. |
| 2026-11-07 | Kiswahili strings | Claude Code drafts them; a fluent reviewer must check before release. |
| 2026-11-07 | Seed places | Mudanda Rock is confirmed real. Lion Ridge is unconfirmed: keep it out of seed and published data. The six places in `reference/web/src/data/places.ts` stay, with coordinates to verify. |
| 2026-11-07 | Flutter version | Latest stable channel. |
| 2026-11-07 | Packages | Proposed list approved (see `THIRD_PARTY.md`). psycopg is LGPL-3, used unmodified as a library. |
| 2026-11-07 | Defaults | Everything else from the Phase 0 proposal approved as proposed. |

## Open questions (section 9 of `CLAUDE.md`)

| Item | Needed by | Status |
| --- | --- | --- |
| Map tile provider and offline tile rights | Phase 5 | Open |
| Routing provider | Phase 5 | Open |
| Weather: paid Open-Meteo plan or remove the line | Phase 5 | Open (built hideable meanwhile) |
| Hosting for Django, PostgreSQL and media | Phase 3 | Open |
| Email and error reporting providers | Phase 4 | Open |
| Verified attraction list with coordinates (10 to 20) | Phase 3 | Partly: Mudanda Rock confirmed, Lion Ridge unconfirmed |
| Original photos, logo and audio with usage rights | Phase 6 | Open |
| Who approves safety content and park routes | Phase 3 | Open |
| Legal text: business name, registration, address, contacts, lawyer review | Phase 7 | Open |
| Public domain for privacy policy and deletion pages | Phase 8 | Open |
| Kenya ODPC registration question | Legal review | Open |

## Placeholders in use

Record every labelled placeholder here and remove the row when it is replaced.

| Placeholder | Where | Replace with |
| --- | --- | --- |
| Logo and photos captured from screen recording | `reference/web/public/` | Original high-resolution files with rights |

## Phase log

### Phase 0: Setup (started 2026-11-07)

- Moved the web design to `reference/web/`, the budget to `docs/budget/`, the note to `CLAUDE.md`. The original PDF of the note is in `docs/`.
- Flutter upgraded to 3.47.9 stable (Dart 3.13.7). The first `flutter upgrade` left an empty `dart-sdk` cache on Windows; fixed by clearing `bin/cache` and re-running `flutter --version`.
- `mobile/`: `flutter create --platforms android`, application ID and namespace `com.istasafaris.app`, `compileSdk 36`, `targetSdk 36`, `minSdk 24`, label "ISTA Safaris". Placeholder home screen and one widget test. `dart_defines.example.json` for `--dart-define-from-file`.
- `backend/`: Django 6.1.3 project `config` with apps `accounts`, `content`, `packs`, `api` (empty until Phase 3). Settings from `.env` via django-environ; PostgreSQL through `DATABASE_URL` (SQLite fallback for local skeleton only). DRF with simplejwt auth, drf-spectacular schema at `/api/v1/schema/` and docs at `/api/v1/docs/`, `GET /api/v1/health`. Three tests.
- CI: GitHub Actions runs `flutter analyze`, `flutter test`, Django `check`, migration check and tests against PostgreSQL 16.
- Checks run locally: `flutter analyze` clean, `flutter test` 1 passed, Django tests 3 passed, `runserver` answers `/api/v1/health`. CI green on GitHub.
- Not yet checked: app running on an emulator. The AVD would not start because drive C: had only 206 MB free.
- Deviations from the design: none yet.
