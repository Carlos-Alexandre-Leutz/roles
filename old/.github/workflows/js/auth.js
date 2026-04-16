import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { env } from './env.js';

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const DASHBOARD_URL = "../dashboard/home.html";

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuário já autenticado, redirecionando...");
        window.location.href = DASHBOARD_URL;
    } else {
        console.log("Nenhum usuário logado.");
    }
});

// Referências dos elementos do seu HTML
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const message = document.getElementById('message');

const displayFeedback = (msg, isError = true) => {
    message.innerText = msg;
    message.style.opacity = "1";
    message.className = isError ? "text-error text-xs font-medium transition-all" : "text-primary text-xs font-medium transition-all";
};

btnLogin.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        displayFeedback("Preencha todos os campos.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            displayFeedback("Bem-vindo! Redirecionando...", false);
            window.location.href = DASHBOARD_URL;
        })
        .catch((error) => {
            console.error(error.code);
            switch (error.code) {
                case 'auth/invalid-credential':
                    displayFeedback("E-mail ou senha incorretos.");
                    break;
                case 'auth/invalid-email':
                    displayFeedback("E-mail inválido.");
                    break;
                default:
                    displayFeedback("Erro ao entrar: " + error.message);
            }
        });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        btnLogin.innerText = "Acessar App";
        console.log("Usuário logado:", user.email);
    } else {
        btnLogin.innerText = "Entrar";
    }
});