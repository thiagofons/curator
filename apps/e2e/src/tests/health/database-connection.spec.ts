import { expect, test } from "@playwright/test";
import { callTrpc } from "../../helpers/trpc";

test.describe("Database Connection E2E", () => {
  test("[authentication service] should successfully verify database connection", async ({
    request,
  }) => {
    const result = await callTrpc(
      request,
      "authentication",
      "checkDbConnection",
    );

    expect(result).toBeDefined();
    expect(result.authentication).toBeDefined();
    expect(result.authentication.success).toBe(true);
    expect(result.authentication.message).toContain("healthy");
    expect(result.authentication.service).toBe("authentication-service");

    console.log("✅ [authentication-service] DB connection test passed!");
  });

  test("[identity service] should successfully verify database connection", async ({
    request,
  }) => {
    const result = await callTrpc(request, "identity", "checkDbConnection");

    expect(result).toBeDefined();
    expect(result.identity).toBeDefined();
    expect(result.identity.success).toBe(true);
    expect(result.identity.message).toContain("healthy");
    expect(result.identity.service).toBe("identity-service");

    console.log("✅ [identity-service] DB connection test passed!");
  });
});
