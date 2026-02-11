import { Inject } from "@nestjs/common";
import { Router } from "nestjs-trpc";
import { AuthenticationService } from "./authentication.service";

@Router({ alias: "authentication" })
export class AuthenticationRouter {
  constructor(
    @Inject(AuthenticationService)
    private readonly authService: AuthenticationService,
  ) {}
}
