---
to: apps/backend/<%=name%>-service/src/main.ts
---
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Logger as PinoLogger } from "nestjs-pino";
import { EnvService } from "./infrastructure/configuration/env/env.service";

async function bootstrap() {
  // Edit this ============================================
  //
  // const app = await NestFactory.create(IdentityModule, {
  //   cors: true,
  //   bufferLogs: true,
  // });

  const logger = new Logger("Bootstrap");

  app.useLogger(app.get(PinoLogger));

  const envService = app.get(EnvService);
  const port = envService.get("PORT");
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
