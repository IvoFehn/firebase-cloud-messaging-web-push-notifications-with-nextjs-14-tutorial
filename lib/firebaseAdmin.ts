import admin from "firebase-admin";

// Verhindert doppelte Initialisierung
if (!admin.apps.length) {
  const serviceAccount = require("@/service_key.json"); // Deine Firebase Admin JSON
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const messaging = admin.messaging();

export { db, messaging };
