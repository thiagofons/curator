import { Query, Router } from "nestjs-trpc";
import { z } from "zod";

const dogsSchema = z.object({
  name: z.string(),
  breed: z.enum(["Labrador", "Corgi", "Beagle", "Golden Retriver"]),
  size: z.number(),
});

@Router()
export class DogsRouter {
  constructor() {}

  @Query({ output: z.array(dogsSchema) })
  async findAll() {
    const dogs = [
      { name: "Buddy", breed: "Labrador" },
      { name: "Charlie", breed: "Corgi" },
    ];

    return dogs;
  }
}
