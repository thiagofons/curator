import { Inject } from "@nestjs/common";
import type { ClientProxy } from "@nestjs/microservices";
import { MESSAGES, SERVICES } from "@repo/rabbitmq";

export class UsersService {
  constructor(
    @Inject(SERVICES.USER) private readonly rabbitClient: ClientProxy,
  ) {}

  async findAll() {
    this.rabbitClient.emit(MESSAGES.USER.GET_ALL_USERS, undefined);

    return { message: "Find all users!" };
  }
}
