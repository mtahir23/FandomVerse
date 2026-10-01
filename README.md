# FandomVerse

Angular single-page fandom portal for Anime, Gaming, Movies, TV Shows, K-Pop, Comics and Manga.

## Run

Requirements: Node.js and npm.

```bash
npm install
npx ng serve
```

Open `http://localhost:4200`.

## Implemented

- Home, responsive neon theme, navbar/footer, clock and visitor counter
- Seven category hubs with JSON-driven profiles, filters and sorting
- Global search across category data
- Image galleries with lightbox
- Media, videos, audio-ready media cards
- Featured articles and article detail modal
- Events and event filtering
- Trailers and release-status filtering
- Upcoming releases
- Merchandise showcase and temporary shopping cart
- LocalStorage bookmarks and bookmark export
- Rule-based FAQ chatbot
- About and Contact pages with demo contact form and map
- Dummy Login/Sign Up UI
- Floating chatbot launcher

## Data

Content is stored in `public/data/fandom-data.json`. No backend/database is required.
### Trailer gallery images
The 7 trailer cards now use 7 static poster images. The first uses the previously supplied trailer poster; the next four use the four newly supplied images; the final two intentionally duplicate supplied images as requested.
