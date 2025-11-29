---
to: apps/backend/<%=name%>-service/src/infrastructure/persistence/prisma/schema.prisma.t
---
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
}