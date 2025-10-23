import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { handleRunToolCalls } from "./handleRunToolCalls";

/**
 * Performs a run operation for the given OpenAI client and thread.
 *
 * This function continuously checks the status of the run and handles tool calls
 * until the run no longer requires action. If the run fails, it logs the error
 * and sends an error message to the thread. Finally, it retrieves the assistant's
 * response from the thread messages.
 *
 * @param run - The run object to be processed.
 * @param client - The OpenAI client instance.
 * @param thread - The thread object associated with the run.
 * @returns A promise that resolves to the assistant's response content or an error message.
 */
export async function performRun(run: Run, client: OpenAI, thread: Thread) {
  while (run.status === "requires_action") {
    run = await handleRunToolCalls(run, client, thread);
  }

  if (run.status === "failed") {
    const errorMessage = `I encountered an error: ${
      run.last_error?.message || "Unknown error"
    }`;
    console.error(errorMessage);

    await client.beta.threads.messages.create(thread.id, {
      role: "assistant",
      content: errorMessage,
    });

    return {
      type: "text",
      text: {
        value: errorMessage,
        annotations: [],
      },
    };
  }

  const messages = await client.beta.threads.messages.list(thread.id);
  const assistantMessage = messages.data.find(
    (message) => message.role === "assistant"
  );

  return (
    assistantMessage?.content[0] || {
      type: "text",
      text: {
        value: "No response from assistant",
        annotations: [],
      },
    }
  );
}
