import {
  createUserDto,
  type CreateUserInput,
  CreateUserUseCase,
} from "@/modules/user/application";
import { Injectable } from "@nestjs/common";
import { Input, Mutation, Router } from "nestjs-trpc";
import { z } from "zod";

@Injectable()
@Router({ alias: "auth" })
export class AuthenticationRouter {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Mutation({
    input: createUserDto,
    output: z.object({ message: z.string() }),
  })
  async register(@Input() input: CreateUserInput) {
    await this.createUserUseCase.execute(input);

    return { message: "User created successfully" };
  }
}
