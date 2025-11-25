import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

export class UsersService {
  constructor(
    @Inject("SERVICES.AUTHENTICATION")
    private readonly rabbitClient: ClientProxy,
  ) {}

  async testRabbitMQConnection() {
    const message = {
      message: "Testing RabbitMQ connection from api-gateway",
      timestamp: new Date().toISOString(),
    };

    // Use send() for request-response pattern
    const response = await firstValueFrom(
      this.rabbitClient.send("users.health_check", message),
    );

    return response;
  }
}
