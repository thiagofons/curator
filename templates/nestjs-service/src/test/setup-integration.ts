import { PrismaClient } from "@prisma/client";
import { afterAll, beforeEach } from "vitest";

export const prisma = new PrismaClient();

beforeEach(async () => {
  // Limpe as tabelas aqui na ORDEM INVERSA das dependências
  // (Ex: delete 'Comment' antes de 'Roadmap')

  // !!! ATUALIZE ISSO PARA O SEU NOVO SERVIÇO !!!
  // await prisma.comment.deleteMany()
  // await prisma.user.deleteMany()

  console.log("[Vitest SetupFile] Tabelas limpas para o próximo teste.");
});

afterAll(async () => {
  // Desconecta o Prisma no final de tudo
  await prisma.$disconnect();
});
