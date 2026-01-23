import type { FormValues } from "./formSchema";
import { sendToDiscord } from "./sendToDiscord";
import { sendToFirestore } from "./sendToFirestore";

export async function sendForm(data: FormValues): Promise<void> {
  await sendToFirestore(data);
  await sendToDiscord(data);
}

export { formSchema, type FormValues } from "./formSchema";
