import { EnvModule, envSchema } from "@/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TRPCModule } from "nestjs-trpc";
import { AppRouter } from "./app.router";

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
  ],
  controllers: [],
  providers: [AppRouter],
})
export class AppModule {}
