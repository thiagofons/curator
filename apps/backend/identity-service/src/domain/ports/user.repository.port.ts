import { User } from "@/domain/aggregates/user.aggregate";

export abstract class UserRepositoryPort {
  abstract save(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
}
