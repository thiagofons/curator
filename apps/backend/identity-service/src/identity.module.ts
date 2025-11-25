import { TestController } from "@/application/controllers/test.controller";
import { ConfigurationModule } from "@/infrastructure/configuration/configuration.module";
import { PrismaService } from "@/infrastructure/persistence/prisma/prisma.service";
import { Module } from "@nestjs/common";
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from "@nestjs/microservices";
import { LoggerModule } from "nestjs-pino";
import { EnvModule } from "./infrastructure/configuration/env/env.module";
import { EnvService } from "./infrastructure/configuration/env/env.service";

@Module({
  imports: [
    ConfigurationModule,
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: "RABBITMQ_CLIENT",
        imports: [EnvModule],
        inject: [EnvService],
        useFactory: (envService: EnvService) =>
          ({
            transport: Transport.RMQ,
            options: {
              urls: [envService.get("RABBITMQ_URI") as string],
              queue: "identity_queue",
              queueOptions: {
                durable: true,
              },
            },
          }) as ClientProvider,
      },
    ]),
  ],
  controllers: [TestController],
  providers: [PrismaService],
})
export class IdentityModule {}
