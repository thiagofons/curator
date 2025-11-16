import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { tools } from "~/tools/allTools";

/**
 * Handles the execution of tool calls required by a given run and submits the outputs.
 *
 * @param run - The run object containing the required actions and tool calls.
 * @param client - The OpenAI client instance used to interact with the API.
 * @param thread - The thread object associated with the run.
 * @returns A promise that resolves to the updated run object after submitting tool outputs.
 *
 * This function processes each tool call specified in the run's required actions. It retrieves the
 * corresponding tool configuration and executes the tool's handler with the provided arguments.
 * The outputs of the tool calls are collected and submitted back to the OpenAI API. If any errors
 * occur during the execution of a tool, the error message is included in the output.
 */
export async function handleRunToolCalls(
  run: Run,
  client: OpenAI,
  thread: Thread
): Promise<Run> {
  const toolCalls = run.required_action?.submit_tool_outputs?.tool_calls;
  if (!toolCalls) return run;

  const toolsOutputs = await Promise.all(
    toolCalls.map(async (tool) => {
      const toolConfig = tools[tool.function.name];
      if (!toolConfig) {
        console.error(`Tool ${tool.function.name} not found`);
      }

      try {
        const args = JSON.parse(tool.function.arguments);
        const output = await toolConfig.handler(args);

        return {
          tool_call_id: tool.id,
          output: String(output),
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        return {
          tool_call_id: tool.id,
          output: `Error: ${errorMessage}`,
        };
      }
    })
  );

  const validOutputs = toolsOutputs.filter(
    Boolean
  ) as OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput[];
  if (validOutputs.length === 0) return run;

  return client.beta.threads.runs.submitToolOutputsAndPoll(thread.id, run.id, {
    tool_outputs: validOutputs,
  });
}
