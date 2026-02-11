import { EnvModule } from "@/infrastructure/config/env";
import { Module } from "@nestjs/common";
import { AuthenticationRouter } from "./authentication.router";
import { AuthenticationService } from "./authentication.service";

@Module({
  imports: [EnvModule],
  providers: [AuthenticationRouter, AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
