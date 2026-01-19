import { Flagsmith } from "flagsmith-nodejs";

export const flagsmith = new Flagsmith({
  environmentKey: import.meta.env.FLAGSMITH_ENV_KEY,
});
