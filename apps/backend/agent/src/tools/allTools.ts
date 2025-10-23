/**
 * Interface representing the configuration for a tool.
 *
 * @template T - The type of the arguments that the handler function will receive.
 */
export interface ToolConfig<T = any> {
  /**
   * The definition of the tool.
   */
  definition: {
    /**
     * The type of the definition, which is always "function".
     */
    type: "function";
    /**
     * The function details of the tool.
     */
    function: {
      /**
       * The name of the function.
       */
      name: string;
      /**
       * The description of the function.
       */
      description: string;
      /**
       * The parameters of the function.
       */
      parameters: {
        /**
         * The type of the parameters, which is always "object".
         */
        type: "object";
        /**
         * The properties of the parameters.
         */
        properties: Record<string, unknown>;
        /**
         * The list of required parameter names.
         */
        required: string[];
      };
    };
  };
  /**
   * The handler function that will be executed with the provided arguments.
   *
   * @param args - The arguments to be passed to the handler function.
   * @returns A promise that resolves to any value.
   */
  handler: (args: T) => Promise<any>;
}

/**
 * A record of tool configurations indexed by their names.
 *
 * You can create your own tool in the tools folder and import it here.
 */
export const tools: Record<string, ToolConfig> = {};
