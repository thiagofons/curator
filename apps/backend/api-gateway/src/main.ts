import { ApiGatewayModule } from "@/api-gateway.module";
import { NestFactory } from "@nestjs/core";
import { EnvService } from "./infrastructure/config/env";

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    cors: true,
  });

  const envService = app.get(EnvService);

  const port = envService.get("PORT");
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
