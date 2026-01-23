import { adminDb } from "@/lib/firebaseAdmin";
import type { Lead } from "@/model/Lead";

export class LeadRepository {
  static async create(data: Lead): Promise<void> {
    const email = data.email;

    try {
      await adminDb.collection("leads").doc(email).set(data);
    } catch (err) {
      console.error("Erro no servidor:", err);
      throw err;
    }
  }
}
