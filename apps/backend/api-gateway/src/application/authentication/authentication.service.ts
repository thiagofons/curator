import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject("SERVICES.AUTHENTICATION")
    private readonly authClient: ClientProxy,
  ) {}

  async testRabbitMQConnection() {
    const message = {
      message: "Testing RabbitMQ connection from api-gateway",
      timestamp: new Date().toISOString(),
    };

    // Use send() for request-response pattern
    const response = await firstValueFrom(
      this.authClient.send("authentication.test.health_check", message),
    );

    return response;
  }

  async checkDbConnection() {
    const [authResponse] = await Promise.all([
      firstValueFrom(this.authClient.send("authentication.test.db_check", {})),
    ]);

    return {
      authentication: authResponse,
    };
  }
}
