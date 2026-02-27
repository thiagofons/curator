import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "../application/use-cases/create-user.use-case";
import { UserRepository } from "../domain";
import { PrismaUserRepository } from "../infrastructure/persistence/prisma/prisma-user.repository";

@Module({
  providers: [
    CreateUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [CreateUserUseCase, UserRepository],
})
export class UsersModule {}
