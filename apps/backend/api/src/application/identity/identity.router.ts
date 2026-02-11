import { Inject } from "@nestjs/common";
import { Router } from "nestjs-trpc";
import { IdentityService } from "./identity.service";

@Router({ alias: "identity" })
export class IdentityRouter {
  constructor(
    @Inject(IdentityService) private readonly identityService: IdentityService,
  ) {}
}
