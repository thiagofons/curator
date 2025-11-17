---
to: apps/backend/<%=name%>-service/src/infrastructure/configuration/env/env.module.ts
---
import { Global, Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { EnvService } from "./env.service";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
