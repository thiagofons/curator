import { PrismaService } from "@/infrastructure/persistence/prisma/prisma.service";
import { Controller, Get, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("/")
export class TestController {
  private readonly logger = new Logger(TestController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async get(): Promise<string> {
    return "OK";
  }

  @MessagePattern("identity.test.health_check")
  handleHealthCheck(@Payload() data: { message: string }) {
    this.logger.log(
      `Received health check via RabbitMQ: ${JSON.stringify(data)}`,
    );

    return {
      success: true,
      message: "Identity service is healthy",
      receivedData: data,
      timestamp: new Date().toISOString(),
      service: "identity-service",
    };
  }

  @MessagePattern("identity.test.db_check")
  async handleDbCheck() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        success: true,
        message: "Identity service DB is healthy",
        service: "identity-service",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error("Database check failed", error);
      return {
        success: false,
        message: "Identity service DB check failed",
        service: "identity-service",
        timestamp: new Date().toISOString(),
      };
    }
  }
}
