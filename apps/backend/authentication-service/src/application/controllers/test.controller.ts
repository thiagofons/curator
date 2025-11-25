import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class TestController {
  private readonly logger = new Logger(TestController.name);

  @MessagePattern("users.health_check")
  handleHealthCheck(@Payload() data: { message: string }) {
    this.logger.log(
      `Received health check via RabbitMQ: ${JSON.stringify(data)}`,
    );

    return {
      success: true,
      message: "Authentication service is healthy",
      receivedData: data,
      timestamp: new Date().toISOString(),
      service: "authentication-service",
    };
  }
}
