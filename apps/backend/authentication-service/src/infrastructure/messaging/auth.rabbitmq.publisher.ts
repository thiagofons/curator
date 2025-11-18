import { AuthEventPublisherPort } from "@/domain/ports/auth.event-publisher.port";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AuthRabbitmqPublisher implements AuthEventPublisherPort {
  constructor(
    // Injeta o cliente RabbitMQ (definido no module)
    @Inject("RABBITMQ_CLIENT")
    private readonly client: ClientProxy,
  ) {}
}
