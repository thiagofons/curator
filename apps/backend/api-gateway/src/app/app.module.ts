import { EnvModule, envSchema } from "@/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TRPCModule } from "nestjs-trpc";
import { AppRouter } from "./app.router";
import { UsersModule } from "./users";

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
    UsersModule,
  ],
  controllers: [],
  providers: [AppRouter],
})
export class AppModule {}
