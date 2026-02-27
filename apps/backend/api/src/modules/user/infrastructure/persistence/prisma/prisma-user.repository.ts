import { User, UserRepository } from "@/modules/user/domain";
import { PrismaService } from "@/shared/infrastructure/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UserMapper } from "./mapper/user.mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!rawUser) return null;

    return UserMapper.toDomain(rawUser);
  }

  async findById(id: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!rawUser) return null;

    return UserMapper.toDomain(rawUser);
  }

  async create(user: User): Promise<void> {
    const data = UserMapper.toPersistence(user);

    await this.prisma.user.create({
      data,
    });
  }

  async update(user: User): Promise<void> {
    const data = UserMapper.toPersistence(user);

    await this.prisma.user.update({
      where: { id: user.id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
