import { EnvModule, EnvService } from "@/infrastructure/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthenticationRouter } from "./authentication.router";
import { AuthenticationService } from "./authentication.service";

@Module({
  imports: [
    EnvModule,
    ClientsModule.registerAsync([
      {
        name: "SERVICES.AUTHENTICATION",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (envService: EnvService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [envService.get("RABBITMQ_URI")],
            queue: "authentication_queue",
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [AuthenticationRouter, AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
