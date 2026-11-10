# Roles App 🚀

**Roles** is a social app to organize get-togethers with friends: create an event, invite people, split the costs and keep everyone in sync. It was built for groups who want to know who bought what and who owes whom, without spreadsheets.

> **Status: proof of concept.** Roles is a working prototype used to validate the idea before building a real product. It already has a small base of users, all friends of the author, who use it for their own get-togethers. Tests, CI checks and production hardening are intentionally left for the product version (see the [Roadmap](#️-roadmap)).

## 🔗 Live Demo

👉 **[https://carlos-alexandre-leutz.github.io/roles/](https://carlos-alexandre-leutz.github.io/roles/)**

## 🎯 The problem

Organizing a get-together with friends is chaotic. The plan lives in a WhatsApp group, someone has to remember who is bringing what, one person ends up paying for everything and the "who owes whom" conversation drags on for days (or never happens).

Roles puts it all in one place: the event, the guest list, the shopping checklist, the chat and the final bill, with the Pix key of whoever should be paid.

## 🧪 Why a proof of concept

The goal is to learn from real use before investing in a product:

- Does the group actually use it for the next get-together, or go back to the WhatsApp group?
- Which feature gets used the most: the checklist, the bill splitting or the chat?
- What blocks someone who is not on the app yet from joining? (This is why invites can be shared on WhatsApp.)

Feedback from the first users is shaping what gets built next.

## 📸 What comes next: private photos

The next big feature is **shared photo albums per event, with privacy control**. Photos from a get-together are the main thing people want to keep, but they are also the thing they are most careful about: not everyone wants every photo visible to everyone.

The idea is that each photo is visible only to the participants of that event (and, later, to the people the owner of the photo chooses), so the album stays a private memory of the group and not a public gallery.

## ✨ Features

- **Events:** create, edit and delete events with date, place and a cover (picked automatically from the title or chosen by hand).
- **Friends:** search users, send/accept/decline friend requests and invite friends to events.
- **WhatsApp invites:** share a link to the event on WhatsApp. Whoever opens it signs in (or creates an account) and joins the event, even without being a friend on the app yet.
- **Attendance:** track who is *Confirmed*, *Pending* or *Declined*.
- **Checklist:** list the items for the event, assign who brings each one, edit prices and mark items as bought.
- **Bill splitting:** equal split among the people who confirmed, showing what each person bought, their share and balance, who pays whom, and the receiver's Pix key. Payments can be registered as settled.
- **Event chat:** real-time chat per event.
- **Notifications:** in-app bell with unread counter for invites, attendance, tasks, payments, friend requests and chat.
- **Email alerts:** the same notifications can be sent by email, only to verified addresses, and each user can turn them off.
- **Account:** edit name, photo (resized in the browser) and Pix key, reset the password.
- **Mobile friendly:** layouts tested on phone-sized screens.

## 🛠️ Tech Stack

- **Frontend:** Vue 3 (Composition API & Script Setup), Vue Router, Vuex
- **Styling:** Tailwind CSS (Material Design System)
- **Backend-as-a-Service:** Firebase (Firestore and Authentication)
- **Email:** external HTTP email API
- **Build tool:** Vite
- **Hosting:** GitHub Pages

## ⚙️ Getting Started

Requires **Node 20.19+** (or 22.12+).

1. Clone the repository and install the dependencies:
   ```bash
   git clone https://github.com/Carlos-Alexandre-Leutz/roles.git
   cd roles
   npm install
   ```
2. Create a Firebase project (see [Firebase setup](#-firebase-setup)).
3. Copy `.env.example` to `.env` and fill in the values (see [Environment variables](#-environment-variables)).
4. Run the development server:
   ```bash
   npm run dev
   ```
   The app is served at `http://localhost:5173/roles/`.

## 🔥 Firebase setup

1. Create a project and register a **Web app** (without Firebase Hosting) to get the config values.
2. **Firestore Database:** create it in *Standard* edition and *production mode*.
3. **Rules:** paste the content of [`firestore.rules`](firestore.rules) in *Firestore → Rules* and publish. The rules cover events, chat messages, notifications, users and friendships.
4. **Authentication:** enable the *Email/Password* sign-in method.
5. **Authorized domains:** in *Authentication → Settings*, add the domain where the app is published (for example `carlos-alexandre-leutz.github.io`). `localhost` is already there.

## 🔐 Environment variables

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase web config |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase web config |
| `VITE_FIREBASE_PROJECT_ID` | Firebase web config |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase web config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase web config |
| `VITE_FIREBASE_APP_ID` | Firebase web config |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase web config (optional) |
| `VITE_EMAIL_API_URL` | Endpoint of the email API |
| `VITE_EMAIL_API_TOKEN` | Token of the email API |

For deployment, the same names must exist as **repository secrets** in *Settings → Secrets and variables → Actions*.

> ⚠️ Every `VITE_*` variable is embedded in the built JavaScript, so the email API token is visible to anyone who inspects the site. Limit the sending rate on the API side and rotate the token if you notice abuse.

## 🚀 Automatic Deployment (CI/CD)

Every push to `main` triggers a **GitHub Actions** workflow that:

1. Checks out the code.
2. Installs the dependencies and builds the project with the secrets above.
3. Publishes the `dist` folder to **GitHub Pages**.

## 📜 Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Serves the production build locally |
| `npm run type-check` | Type-check with `vue-tsc` |
| `npm run lint` | Lint with oxlint and ESLint |
| `npm run test:unit` | Unit tests with Vitest |

## 🗺️ Roadmap

**Next, on the proof of concept**

- **Private photo albums:** shared photos per event, with control over who can see each photo.
- **Pix "copy and paste" with QR code** on the bill, so paying takes one tap.
- **Installable app (PWA)** so it opens from the home screen.

**For the product version**

- Automated tests for the bill splitting logic and checks (lint, type-check, tests) in the CI before every deploy.
- Fewer transfers when settling up (minimizing who pays whom).
- Push notifications, so chat and invites reach people with the app closed.
- Move the email API token out of the frontend, into a backend function, and tighten the Firestore rules (today any signed-in user can read any event).
