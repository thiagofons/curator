import { CreateUserInput } from "@/modules/user/application";
import { User, UserRepository } from "@/modules/user/domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserInput) {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) throw new Error("Usuário já existe");

    const user = User.create(data);
    return await this.userRepository.create(user);
  }
}
