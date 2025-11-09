import type OpenAi from "openai"
import type { Thread } from "openai/resources/beta/threads/threads.mjs"

/**
 * Creates a new thread and sends a message to it using the OpenAI client.
 *
 * @param client - The OpenAI client instance used to interact with the API.
 * @param message - The message content to be sent to the newly created thread.
 * @returns A promise that resolves to the created thread.
 */
export async function createThread(
  client: OpenAi,
  message: string,
): Promise<Thread> {
  const thread = await client.beta.threads.create()

  await client.beta.threads.messages.create(thread.id, {
    role: "user",
    content: message,
  })

  return thread
}
