import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { EnvModule } from "./env/env.module";
import { envSchema } from "./env/env.schema";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== "production"
            ? {
                target: "pino-pretty",
                options: {
                  singleLine: true,
                  colorize: true,
                  translateTime: "SYS:HH:MM:ss",
                  ignore: "pid,hostname",
                },
              }
            : undefined,
        autoLogging: true,
        serializers: {
          req: (req) => ({ id: req.id, method: req.method, url: req.url }),
          res: (res) => ({ statusCode: res.statusCode }),
        },
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigurationModule {}
