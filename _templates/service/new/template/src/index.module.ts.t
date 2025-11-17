---
to: apps/backend/<%=name%>-service/src/index.module.ts
---
import { ConfigurationModule } from "@/infrastructure/configuration/configuration.module";
import { PrismaService } from "@/infrastructure/persistence/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [ConfigurationModule, LoggerModule],
  controllers: [],
  providers: [PrismaService],
})
export class IdentityModule {}
