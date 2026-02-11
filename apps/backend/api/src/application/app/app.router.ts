import { Inject } from "@nestjs/common";
import { Input, Query, Router } from "nestjs-trpc";
import { z } from "zod";
import { AppService } from "./app.service";

@Router({ alias: "app" })
export class AppRouter {
  constructor(
    @Inject(AppService)
    private readonly appService: AppService,
  ) {}

  @Query({
    input: z.object({
      name: z.string(),
    }),
    output: z.object({
      message: z.string(),
    }),
  })
  async greeting(@Input() input: { name: string }) {
    const message = this.appService.getHello(input.name);
    return { message };
  }
}
