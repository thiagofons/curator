import { UsersModule } from "@/modules/user/presentation/user.module";
import { Module } from "@nestjs/common";
import { AuthenticationRouter } from "./authentication.router";

@Module({
  imports: [UsersModule],
  providers: [AuthenticationRouter],
})
export class AuthenticationModule {}
