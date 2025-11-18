import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class UsersService {
  constructor(
    @Inject("SERVICES.AUTHENTICATION")
    private readonly rabbitClient: ClientProxy,
  ) {}
}
