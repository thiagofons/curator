import { EnvModule } from "@/infrastructure/config/env";
import { Module } from "@nestjs/common";
import { IdentityRouter } from "./identity.router";
import { IdentityService } from "./identity.service";

@Module({
  imports: [EnvModule],
  providers: [IdentityRouter, IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
