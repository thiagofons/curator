import { Module } from "@nestjs/common";
import { TRPCModule } from "nestjs-trpc";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service";

const trpcOptions = {
  basePath: "/trpc",
  autoSchemaFile: "./",
};

@Module({
  imports: [TRPCModule.forRoot(trpcOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
