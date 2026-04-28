# Roles App 🚀

**Roles** is a modern social application designed to streamline group gatherings. Whether it's a band rehearsal, a soccer match, or a casual dinner, Roles allows users to create events, invite friends, and track attendance status in real-time.

## 🛠️ Tech Stack

- **Frontend:** Vue 3 (Composition API & Script Setup)
- **Styling:** Tailwind CSS (Material Design System)
- **Backend-as-a-Service:** Firebase (Firestore, Auth, and Hosting)
- **Build Tool:** Vite

**Roles** is a modern social application designed to streamline group gatherings.

## 🔗 Live Demo
You can check the application running live here:
👉 **[https://carlos-alexandre-leutz.github.io/roles/](https://carlos-alexandre-leutz.github.io/roles/)**


## ✨ Key Features

- **Real-time Attendance:** Track who is *Confirmed*, *Pending*, or *Declined*.
- **Data Hydration:** Merges Firestore event data with user profiles (names/photos) for a rich UI experience.
- **Smart Queries:** Optimized Firestore queries to fetch only the data you need.
- **Responsive Design:** Premium look and feel on any device.

## 🚀 Automatic Deployment (CI/CD)

This project uses **GitHub Actions** for Continuous Deployment. Every push to the `main` branch triggers an automated workflow:

1. **Checkout:** Pulls the latest code.
2. **Build:** Installs dependencies (`npm install`) and builds the project (`npm run build`).
3. **Deploy:** Automatically pushes the build to **Firebase Hosting**.

This ensures that the live application is always synced with the latest stable code in the repository.

## ⚙️ Getting Started

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/roles.git](https://github.com/your-username/roles.git)
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup your `.env` with Firebase credentials.
4. Run development server:
   ```bash
   npm run dev
   ```
