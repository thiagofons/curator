import { Inject } from "@nestjs/common";
import { Query, Router } from "nestjs-trpc";
import { z } from "zod";
import { UsersService } from "./users.service";

@Router({ alias: "users" })
export class UsersRouter {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Query({})
  async findAll() {
    // return this.usersService.findAll();
  }

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
    return this.usersService.testRabbitMQConnection();
  }
}
