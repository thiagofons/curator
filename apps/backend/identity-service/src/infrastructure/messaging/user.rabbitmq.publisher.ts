import { User } from "@/domain/aggregates/user.aggregate";
import { UserEventPublisherPort } from "@/domain/ports/user.event-publisher.port";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class UserRabbitmqPublisher implements UserEventPublisherPort {
  constructor(
    // Injeta o cliente RabbitMQ (definido no module)
    @Inject("RABBITMQ_CLIENT")
    private readonly client: ClientProxy,
  ) {}

  publishUserRegistered(user: User): void {
    const eventPayload = {
      userId: user.id,
      email: user.email,
    };

    this.client.emit("identity.user_registered", eventPayload);
  }
}
