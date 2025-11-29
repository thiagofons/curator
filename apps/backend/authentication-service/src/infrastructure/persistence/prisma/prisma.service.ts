import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.logger.log("Starting database connection...");
    try {
      await this.$connect();
      this.logger.log("Database connection established.");
    } catch (error) {
      this.logger.warn(
        "Failed to connect to the database, but continuing... (useful for microservice testing)",
        error.stack,
      );
    }
  }

  async onModuleDestroy() {
    this.logger.log("Closing database connection...");
    await this.$disconnect();
  }
}
