---
to: apps/frontend/<%=name%>/src/app/page.tsx
---
import { trpc } from "@repo/trpc";

export default async function Home() {
  const hello = await trpc.app.greeting.query({
    name: "Thiago",
    number: 1,
  })

  return (
    <>{hello.message}</>
  );
}
