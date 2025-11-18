export abstract class AuthRepositoryPort {
  abstract save(user): Promise<void>;
  abstract findById(id): Promise<null>;
  abstract findByEmail(email): Promise<null>;
}
