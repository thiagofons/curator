import { Inject } from "@nestjs/common";
import { Query, Router } from "nestjs-trpc";
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
}
