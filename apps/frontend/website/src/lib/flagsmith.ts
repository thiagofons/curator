import { Flagsmith } from "flagsmith-nodejs";

export const flagsmith = new Flagsmith({
  environmentKey: import.meta.env.DEV
    ? import.meta.env.FLAGSMITH_DEV_KEY
    : import.meta.env.FLAGSMITH_PROD_KEY,
  apiUrl:
    import.meta.env.FLAGSMITH_API_URL ||
    "https://edge.api.flagsmith.com/api/v1/",
});
