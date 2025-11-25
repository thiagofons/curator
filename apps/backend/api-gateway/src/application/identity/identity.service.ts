import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class IdentityService {
  constructor(
    @Inject("SERVICES.IDENTITY")
    private readonly identityClient: ClientProxy,
  ) {}

  async testRabbitMQConnection() {
    const message = {
      message: "Testing RabbitMQ connection from api-gateway",
      timestamp: new Date().toISOString(),
    };

    // Use send() for request-response pattern
    const response = await firstValueFrom(
      this.identityClient.send("identity.test.health_check", message),
    );

    return response;
  }

  async checkDbConnection() {
    const [identityResponse] = await Promise.all([
      firstValueFrom(this.identityClient.send("identity.test.db_check", {})),
    ]);

    return {
      identity: identityResponse,
    };
  }
}
