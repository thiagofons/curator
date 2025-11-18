import { EnvModule, envSchema, EnvService } from "@/infrastructure/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from "@nestjs/microservices";
import { TRPCModule } from "nestjs-trpc";
import { ApiGatewayRouter } from "./application/api-gateway.router";
import { UsersModule } from "./application/users";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    TRPCModule.forRoot({
      autoSchemaFile: "./@generated",
    }),
    ClientsModule.registerAsync([
      {
        name: "AUTHENTICATION_SERVICE_CLIENT",
        imports: [EnvModule],
        inject: [EnvService],
        useFactory: (envService: EnvService) =>
          ({
            transport: Transport.RMQ,
            options: {
              urls: [envService.get("RABBITMQ_URI") as string],
              queue: "authentication_queue",
              queueOptions: {
                durable: true,
              },
            },
          }) as ClientProvider,
      },
    ]),
    UsersModule,
  ],
  controllers: [],
  providers: [ApiGatewayRouter],
})
export class ApiGatewayModule {}
