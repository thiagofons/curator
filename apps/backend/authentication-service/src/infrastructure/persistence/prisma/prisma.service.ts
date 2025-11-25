import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Usamos nosso Logger padrão para Observabilidade
  private readonly logger = new Logger(PrismaService.name);

  /**
   * Pilar: Qualidade e Resiliência
   * O NestJS chamará este método automaticamente
   * assim que o módulo for inicializado.
   */
  async onModuleInit() {
    this.logger.log("Iniciando conexão com o banco de dados...");
    try {
      await this.$connect();
      this.logger.log("Conexão com o banco de dados estabelecida.");
    } catch (error) {
      this.logger.warn(
        "Falha ao conectar com o banco de dados, mas continuando... (útil para testes de microserviços)",
        error.stack,
      );
      // Don't exit - allow app to continue for RabbitMQ testing
      // In production, you may want to make this stricter
    }
  }

  /**
   * Pilar: Resiliência
   * O NestJS chamará este método automaticamente
   * quando a aplicação for desligada (shutdown).
   */
  async onModuleDestroy() {
    this.logger.log("Fechando conexão com o banco de dados...");
    await this.$disconnect();
  }
}
