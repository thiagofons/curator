import { PrismaService } from "@/infrastructure/persistence/prisma/prisma.service";
import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class TestController {
  private readonly logger = new Logger(TestController.name);

  constructor(private readonly prisma: PrismaService) {}

  @MessagePattern("authentication.test.health_check")
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

  @MessagePattern("authentication.test.db_check")
  async handleDbCheck() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        success: true,
        message: "Authentication service DB is healthy",
        service: "authentication-service",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error("Database check failed", error);
      return {
        success: false,
        message: "Authentication service DB check failed",
        service: "authentication-service",
        timestamp: new Date().toISOString(),
      };
    }
  }
}
