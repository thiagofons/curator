---
to: apps/backend/<%=name%>-service/src/infrastructure/persistence/prisma/prisma.service.ts
---
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
      this.logger.error("Failed to connect to the database.", error.stack);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    this.logger.log("Fechando conexão com o banco de dados...");
    await this.$disconnect();
  }
}
