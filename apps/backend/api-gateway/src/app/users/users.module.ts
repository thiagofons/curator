import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { QUEUES, SERVICES } from "@repo/rabbitmq";
import type { EnvService } from "../../config/env";
import { UsersRouter } from "./users.router";
import { UsersService } from "./users.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICES.USER,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (envService: EnvService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [envService.get("RABBITMQ_URI")],
            queue: QUEUES.USER,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [UsersRouter, UsersService],

  exports: [UsersService],
})
export class UsersModule {}
