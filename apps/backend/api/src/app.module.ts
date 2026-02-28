import { HealthModule } from "@/modules/health/presentation/health.module";
import { AuthenticationModule } from "@/modules/authentication/presentation/authentication.module";
import { PrismaModule } from "@/shared/infrastructure";
import { Module } from "@nestjs/common";
import { TRPCModule } from "nestjs-trpc";

@Module({
  imports: [
    PrismaModule,
    TRPCModule.forRoot({
      basePath: "/",
    }),
    HealthModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
