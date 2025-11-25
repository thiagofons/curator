import { EnvModule, envSchema } from "@/infrastructure/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TRPCModule } from "nestjs-trpc";
import { AuthenticationModule } from "./application/authentication";
import { IdentityModule } from "./application/identity";

@Module({
  imports: [
    /** Config */
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    TRPCModule.forRoot({
      autoSchemaFile: "./@generated",
    }),
    /** Modules */
    AuthenticationModule,
    IdentityModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
