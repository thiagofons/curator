import { Controller, Get } from "@nestjs/common";

@Controller("/")
export class IdentityController {
  @Get()
  async get(): Promise<string> {
    return "OK";
  }
}
