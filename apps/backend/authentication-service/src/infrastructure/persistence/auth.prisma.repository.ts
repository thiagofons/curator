import { AuthRepositoryPort } from "@/domain/ports/auth.repository.port";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class AuthPrismaRepository implements AuthRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  save(user: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: any): Promise<null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: any): Promise<null> {
    throw new Error("Method not implemented.");
  }
}
