import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.API_PORT ?? 3300;

  await app.listen(port);

  console.log(`API is running on port ${port}`);
}
bootstrap();
