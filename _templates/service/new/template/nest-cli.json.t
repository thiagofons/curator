---
to: apps/backend/<%= name %>/nest-cli.json
---
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "builder": "swc",
    "typeCheck": true,    
    "deleteOutDir": true,
    "assets": [
      { "include": "prisma/schema.prisma", "outDir": "./" }
    ],
    "watchAssets": true
  }
}