import * as migration_20260209_202916_inicial from "./20260209_202916_inicial";

export const migrations = [
  {
    up: migration_20260209_202916_inicial.up,
    down: migration_20260209_202916_inicial.down,
    name: "20260209_202916_inicial",
  },
];
