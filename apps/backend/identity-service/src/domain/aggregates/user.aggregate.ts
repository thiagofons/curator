import { randomUUID } from "crypto";

export class User {
  public readonly id: string;
  public email: string;

  // Construtor privado força a usar o "Factory Method"
  private constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  // Factory Method: Garante que as regras (Invariantes) sejam checadas
  public static create(email: string): User {
    // REGRA DE NEGÓCIO (Invariante)
    if (!email.includes("@")) {
      throw new Error("Invalid email format for User.");
    }

    const id = randomUUID();
    const user = new User(id, email);

    // (Opcional: Adiciona um evento de domínio)
    // user.addDomainEvent(new UserRegisteredEvent(id, email));

    return user;
  }

  // MÉTODO DE NEGÓCIO
  public updateProfileName(newName: string) {
    // REGRA DE NEGÓCIO
    if (newName.length < 2) {
      throw new Error("Profile name is too short.");
    }
  }
}
