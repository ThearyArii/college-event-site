# Converge — College Event Website

React + Firebase site for a college fest: home page with countdown, schedule,
a registration form that saves to a database, a gallery, and an organizer
login that lists everyone who registered.

## 1. Install

```bash
npm install
```

## 2. Connect Firebase (the "backend")

1. Go to https://console.firebase.google.com and create a project.
2. Click the **</>** (web app) icon to register a new web app.
3. Copy the `firebaseConfig` object it gives you into
   `src/firebase/config.js`, replacing the placeholder values.
4. In the left sidebar:
   - **Build → Firestore Database → Create database** (start in test mode).
   - **Build → Authentication → Sign-in method → Email/Password → Enable**.
   - **Build → Authentication → Users → Add user** — this is the login you'll
     use on the `/admin` page to view registrations.

## 3. Run it

```bash
npm run dev
```

Open the printed local URL. The registration form on `/register` writes to a
`registrations` collection in Firestore; `/admin` reads it back after you log
in with the account you created in step 2.

## 4. Customize

- Fest name / dates: `src/pages/Home.jsx` and `src/components/CountdownTicket.jsx`
  (change `EVENT_DATE`).
- Schedule: `src/pages/Schedule.jsx` — it's a plain array, edit the events directly.
- Colors / fonts: `tailwind.config.js`.
- Gallery photos: `src/pages/Gallery.jsx` (currently placeholder blocks).

## 5. Deploy (optional, free)

```bash
npm run build
```

Then either:
- **Firebase Hosting**: `npm i -g firebase-tools`, `firebase login`, `firebase init hosting` (point it at `dist`), `firebase deploy`
- **Vercel/Netlify**: connect the repo, build command `npm run build`, output dir `dist`

## Project structure

```
src/
  firebase/config.js   → Firebase keys go here
  components/          → NavBar, Footer, CountdownTicket
  pages/
    Home.jsx            → hero + countdown + highlights
    Schedule.jsx         → 3-day event schedule (static data)
    Register.jsx          → form → writes to Firestore
    Gallery.jsx            → photo grid (placeholders)
    Admin.jsx               → login + table of registrations
```
