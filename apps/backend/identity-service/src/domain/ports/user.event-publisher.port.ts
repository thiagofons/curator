import { User } from "@/domain/aggregates/user.aggregate";

export abstract class UserEventPublisherPort {
  abstract publishUserRegistered(user: User): void;
}
