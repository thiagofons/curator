import { Flagsmith } from "flagsmith-nodejs";

export const flagsmith = new Flagsmith({
  environmentKey: process.env.FLAGS_ENVIRONMENT_KEY,
  apiUrl: process.env.FLAGS_API_URL,
});
