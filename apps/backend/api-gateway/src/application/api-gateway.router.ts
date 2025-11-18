import { Input, Query, Router } from "nestjs-trpc";
import { z } from "zod";

@Router({ alias: "app" })
export class ApiGatewayRouter {
  @Query({
    input: z.object({ name: z.string(), number: z.number() }),
    output: z.object({ message: z.string() }),
  })
  greeting(@Input("name") name: string, @Input("number") number: number) {
    return {
      message: `Hello ${name}! This is your number: ${number}`,
    };
  }
}
