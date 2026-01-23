import { adminDb } from "./firebaseAdmin";
import type { FormValues } from "./formSchema";

export async function sendToFirestore(data: FormValues): Promise<void> {
  const leadsCollection = adminDb.collection("leads");

  await leadsCollection.doc(data.email).set(
    {
      name: data.name,
      email: data.email,
      theme: data.theme,
      updatedAt: new Date(),
    },
    { merge: true },
  );

  console.log("✅ Lead salvo no Firestore.");
}
