import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller() // Um consumer é um tipo de controller
export class AuthEventsConsumer {
  constructor(/* Injeta um caso de uso, ex: UpdateUserPasswordUseCase */) {}

  @MessagePattern("auth.password_changed")
  handlePasswordChanged(@Payload() data: { userId: string; newHash: string }) {}
}
