import { Inject } from "@nestjs/common";
import { Query, Router } from "nestjs-trpc";
import { z } from "zod";
import { IdentityService } from "./identity.service";

@Router({ alias: "identity" })
export class IdentityRouter {
  constructor(
    @Inject(IdentityService) private readonly identityService: IdentityService,
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
    return this.identityService.testRabbitMQConnection();
  }

  @Query({
    output: z.object({
      identity: z.object({
        success: z.boolean(),
        message: z.string(),
        service: z.string(),
        timestamp: z.string(),
      }),
    }),
  })
  async checkDbConnection() {
    return this.identityService.checkDbConnection();
  }
}
