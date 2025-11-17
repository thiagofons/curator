import { IdentityController } from "@/application/controllers/identity.controller";
import { ConfigurationModule } from "@/infrastructure/configuration/configuration.module";
import { PrismaService } from "@/infrastructure/persistence/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [ConfigurationModule, LoggerModule],
  controllers: [IdentityController],
  providers: [PrismaService],
})
export class IdentityModule {}
