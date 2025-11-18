import { RegisterUserDto } from "@/application/dtos/register-user.dto";
import { User } from "@/domain/aggregates/user.aggregate";
import { UserEventPublisherPort } from "@/domain/ports/user.event-publisher.port";
import { UserRepositoryPort } from "@/domain/ports/user.repository.port";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class RegisterUserUseCase {
  constructor(
    // 1. Pede pelas "Portas" (abstrações)
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,

    @Inject(UserEventPublisherPort)
    private readonly eventPublisher: UserEventPublisherPort,
  ) {}

  async execute(dto: RegisterUserDto) {
    // 2. Chama o Domínio para criar o Agregado (onde a lógica vive)
    const user = User.create(dto.email);

    // 3. Chama a Porta de persistência (o Adaptador Prisma executa)
    await this.userRepository.save(user);

    // 4. Chama a Porta de eventos (o Adaptador RabbitMQ executa)
    this.eventPublisher.publishUserRegistered(user);

    return user;
  }
}
