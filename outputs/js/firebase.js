import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRDbQlBpKSBYAxmomv-JSGTutgo0V1YWQ",
  authDomain: "portfolio-262ba.firebaseapp.com",
  projectId: "portfolio-262ba",
  storageBucket: "portfolio-262ba.firebasestorage.app",
  messagingSenderId: "624709373450",
  appId: "1:624709373450:web:eda0e05e61b0dbf40ed9f3",
  measurementId: "G-8NQ23PKHS0",
};

export const app = initializeApp(firebaseConfig);

// Analytics is unavailable in some browsers and local environments.
if (await isSupported()) {
  getAnalytics(app);
}
