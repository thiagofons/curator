import { User } from "@/domain/aggregates/user.aggregate";
import { UserRepositoryPort } from "@/domain/ports/user.repository.port";
import { PrismaService } from "@/infrastructure/persistence/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
// (Importaria um Mapper para traduzir Agregado <-> Prisma)

@Injectable()
export class UserPrismaRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    // Lógica de "tradução" (Mapper) do Agregado para o modelo do Prisma
    const data = {
      id: user.id,
      email: user.email,
    };

    // await this.prisma.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    // 1. Busca do DB
    // const dbUser = await this.prisma.user.findUnique({ where: { id } });
    // if (!dbUser) return null;

    // 2. "Hidrata" o Agregado (traduz de volta para o Domínio)
    // return UserPrismaMapper.toDomain(dbUser);
    return null; // (Implementação do mapper)
  }
}
