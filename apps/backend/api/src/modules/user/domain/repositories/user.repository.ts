import { User } from "@/modules/user/domain";

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract update(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
}
