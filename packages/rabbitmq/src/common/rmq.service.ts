import { Injectable } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import {
  type RmqContext,
  type RmqOptions,
  Transport,
} from "@nestjs/microservices";

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>("RABBIT_MQ_URI") as string],
        queue: queue,
        noAck,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
