import { Auth } from "@repo/model";
import { Query, Router } from "nestjs-trpc";
import { z } from "zod"; // 👈 Não esqueça de importar o zod

@Router()
export class UsersRouter {
  @Query({
    output: Auth.UserFindManySchema,
  })
  async findAll(): Promise<z.infer<typeof Auth.UserFindManySchema>> {
    const users = [{ id: "123", email: "thiago@exemplo.com" }];

    // Se você tentar retornar um objeto Zod ou dados errados aqui, o TS vai chiar!
    return users as z.infer<typeof Auth.UserFindManySchema>;
  }
}
