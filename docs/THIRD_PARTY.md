# Third-party packages and services

This list feeds the Google Play Data safety form. Add a row before adding any package; ask the owner before anything under GPL or AGPL, or anything that collects analytics. Versions are the ones pinned in `mobile/pubspec.lock` and `backend/requirements.txt`.

## Mobile app

Packages are added in the phase that first needs them. "Added" says which phase.

| Package | Licence | Purpose | Data sent off the device | Added |
| --- | --- | --- | --- | --- |
| flutter_lints | BSD-3 | Lint rules (dev only) | None | Phase 0 |
| flutter_riverpod | MIT | State management | None | Phase 1 |
| go_router | BSD-3 | Navigation | None | Phase 1 |
| flutter_svg | MIT | Custom icons | None | Phase 1 |
| lucide_icons_flutter | ISC | Icon set | None | Phase 1 |
| flutter_localizations, intl | BSD-3 | English and Kiswahili | None | Phase 1 |
| dio | MIT | HTTP client | Requests to the ISTA API only | Phase 3/4 |
| drift, sqlite3_flutter_libs | MIT | SQLite cache | None | Phase 4 |
| flutter_secure_storage | BSD-3 | Token storage | None | Phase 4 |
| connectivity_plus | BSD-3 | Offline detection | None | Phase 4 |
| flutter_map, latlong2 | BSD-3, Apache-2.0 | Maps | Visible map area to the tile provider | Phase 5 |
| geolocator | MIT | Foreground GPS | None (location never stored on the server) | Phase 5 |
| speech_to_text | BSD-3 | Voice search | Audio to the device's speech service (usually Google) | Phase 5 |
| url_launcher | BSD-3 | Dial 999/112, open legal web pages | None | Phase 2 |
| just_audio | MIT | Audio guides | None (fetches from the media CDN) | Phase 6 |
| path_provider, crypto | BSD-3 | Pack storage, SHA-256 checks | None | Phase 6 |
| sentry_flutter | MIT | Error reporting, off until the user agrees | Crash data, no personal data | Phase 7 |

Fonts: DM Serif Display and Manrope, SIL Open Font License 1.1, bundled as TTF.

## Backend

| Package | Licence | Purpose |
| --- | --- | --- |
| Django | BSD-3 | Web framework and admin |
| djangorestframework | BSD-3 | REST API |
| djangorestframework-simplejwt | MIT | JWT auth |
| drf-spectacular | BSD-3 | OpenAPI schema |
| django-environ | MIT | Settings from `.env` |
| psycopg (binary) | LGPL-3 | PostgreSQL driver, used unmodified |
| django-storages, boto3 | BSD-3, Apache-2.0 | S3-compatible media (Phase 3+) |
| requests | Apache-2.0 | Weather and routing proxies (Phase 5) |

## Outside services

| Service | Provider | Status |
| --- | --- | --- |
| Map tiles | MapTiler Cloud or Google Maps Platform | Open decision |
| Routing | To choose | Open decision |
| Weather | Open-Meteo via the API | Commercial plan needed or remove |
| Email | Transactional only | Provider to choose |
| Error reporting | Sentry or similar | Off until user consents |
