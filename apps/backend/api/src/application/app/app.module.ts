import { Module } from "@nestjs/common";
import { AppRouter } from "./app.router";
import { AppService } from "./app.service";

@Module({
  providers: [AppRouter, AppService],
})
export class AppModule {}
