import type OpenAi from "openai"
import type { Run } from "openai/resources/beta/threads/runs/runs.mjs"
import type { Thread } from "openai/resources/beta/threads/threads.mjs"

/**
 * Creates a new run for a given thread and assistant, and waits for the run to complete.
 *
 * @param client - The OpenAI client instance.
 * @param thread - The thread for which the run is being created.
 * @param assistantId - The ID of the assistant to be used for the run.
 * @returns A promise that resolves to the completed run.
 */
export async function createRun(
  client: OpenAi,
  thread: Thread,
  assistantId: string,
): Promise<Run> {
  let run = await client.beta.threads.runs.create(thread.id, {
    assistant_id: assistantId,
  })

  // Wait for the run to complete and keep polling

  while (run.status === "in_progress" || run.status === "queued") {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    run = await client.beta.threads.runs.retrieve(thread.id, run.id)
  }

  return run
}
