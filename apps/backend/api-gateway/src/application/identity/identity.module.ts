import { EnvModule, EnvService } from "@/infrastructure/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { IdentityRouter } from "./identity.router";
import { IdentityService } from "./identity.service";

@Module({
  imports: [
    EnvModule,
    ClientsModule.registerAsync([
      {
        name: "SERVICES.IDENTITY",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (envService: EnvService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [envService.get("RABBITMQ_URI")],
            queue: "identity_queue",
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [IdentityRouter, IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
