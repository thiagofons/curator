import { AuthEventPublisherPort } from "@/domain/ports/auth.event-publisher.port";
import { AuthRepositoryPort } from "@/domain/ports/auth.repository.port";
import { ConfigurationModule } from "@/infrastructure/configuration/configuration.module";
import { AuthRabbitmqPublisher } from "@/infrastructure/messaging/auth.rabbitmq.publisher";
import { AuthPrismaRepository } from "@/infrastructure/persistence/auth.prisma.repository";
import { PrismaService } from "@/infrastructure/persistence/prisma/prisma.service";
import { Module } from "@nestjs/common";
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from "@nestjs/microservices";
import { EnvModule } from "./infrastructure/configuration/env/env.module";
import { EnvService } from "./infrastructure/configuration/env/env.service";

@Module({
  imports: [
    ConfigurationModule,
    ClientsModule.registerAsync([
      {
        name: "RABBITMQ_CLIENT",
        imports: [EnvModule],
        inject: [EnvService],
        useFactory: (envService: EnvService) =>
          ({
            transport: Transport.RMQ,
            options: {
              urls: [envService.get("RABBITMQ_URI")],
              // Nota: Se este é o Publisher, a 'queue' aqui define a fila DEFAULT de destino.
              // Garanta que 'identity_queue' é realmente para onde você quer mandar eventos de auth.
              queue: "authentication_queue",
              queueOptions: {
                durable: true,
              },
            },
          }) as ClientProvider,
      },
    ]),
  ],
  controllers: [],
  providers: [
    // Casos de Uso

    // Conexão da Porta -> Adaptador de Persistência
    {
      provide: AuthRepositoryPort,
      useClass: AuthPrismaRepository,
    },

    // Conexão da Porta -> Adaptador de Eventos
    {
      provide: AuthEventPublisherPort,
      useClass: AuthRabbitmqPublisher,
    },

    // Os próprios adaptadores precisam de provedores (ex: PrismaService)
    PrismaService,
  ],
})
export class AuthenticationModule {}
