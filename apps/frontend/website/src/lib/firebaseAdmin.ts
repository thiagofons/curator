import { FIREBASE_SERVICE_ACCOUNT_KEY } from "astro:env/server";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let serviceAccount: Record<string, unknown>;

try {
  if (!FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing in .env");
  }
  serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY);
} catch (error) {
  console.error("❌ Erro ao processar credenciais do Firebase Admin:", error);
  throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY format");
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
  console.log("🔥 Firebase Admin inicializado com sucesso no servidor.");
}

export const adminDb = getFirestore();
