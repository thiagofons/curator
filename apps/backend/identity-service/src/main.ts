import { IdentityModule } from "@/identity.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger as PinoLogger } from "nestjs-pino";
import { EnvService } from "./infrastructure/configuration/env/env.service";

async function bootstrap() {
  const app = await NestFactory.create(IdentityModule, {
    cors: true,
    bufferLogs: true,
  });

  const logger = new Logger("Bootstrap");

  app.useLogger(app.get(PinoLogger));

  const envService = app.get(EnvService);

  // Connect as a microservice to listen on RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [envService.get("RABBITMQ_URI") as string],
      queue: "identity_queue",
      queueOptions: {
        durable: true,
      },
      socketOptions: {
        heartbeatIntervalInSeconds: 60,
        reconnectTimeInSeconds: 5,
      },
    },
  });

  await app.startAllMicroservices();
  logger.log("🐰 Identity microservice is listening on RabbitMQ");

  const port = envService.get("PORT");
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
