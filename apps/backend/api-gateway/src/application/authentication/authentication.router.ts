import { Inject } from "@nestjs/common";
import { Query, Router } from "nestjs-trpc";
import { z } from "zod";
import { AuthenticationService } from "./authentication.service";

@Router({ alias: "authentication" })
export class AuthenticationRouter {
  constructor(
    @Inject(AuthenticationService)
    private readonly authService: AuthenticationService,
  ) {}

  @Query({})
  async findAll() {}

  @Query({
    output: z.object({
      success: z.boolean(),
      message: z.string(),
      receivedData: z.any(),
      timestamp: z.string(),
      service: z.string(),
    }),
  })
  async testRabbitMQ() {
    return this.authService.testRabbitMQConnection();
  }

  @Query({
    output: z.object({
      authentication: z.object({
        success: z.boolean(),
        message: z.string(),
        service: z.string(),
        timestamp: z.string(),
      }),
    }),
  })
  async checkDbConnection() {
    return this.authService.checkDbConnection();
  }
}
