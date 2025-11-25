import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller() // Um consumer é um tipo de controller
export class AuthEventsConsumer {
  private readonly logger = new Logger(AuthEventsConsumer.name);

  constructor(/* Injeta um caso de uso, ex: UpdateUserPasswordUseCase */) {}

  @MessagePattern("auth.password_changed")
  handlePasswordChanged(@Payload() data: { userId: string; newHash: string }) {
    this.logger.log(
      `🔔 Received password change event for user: ${data.userId}`,
    );
    // Here you would call a use case to handle the event
    // For now, we just log it to demonstrate the event was received
  }
}
