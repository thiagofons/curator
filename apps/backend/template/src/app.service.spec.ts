import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe } from "vitest";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppService", () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });
});
