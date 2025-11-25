import { expect, test } from "@playwright/test";

test.describe("Database Connection E2E", () => {
  const API_GATEWAY_URL = "http://localhost:3300";

  test("[authentication service] should successfully verify database connection", async ({
    request,
  }) => {
    const response = await request.get(
      `${API_GATEWAY_URL}/trpc/authentication.checkDbConnection`,
    );
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.result).toBeDefined();
    expect(data.result.data).toBeDefined();
    const result = data.result.data;

    expect(result.authentication).toBeDefined();
    expect(result.authentication.success).toBe(true);
    expect(result.authentication.message).toContain("healthy");
    expect(result.authentication.service).toBe("authentication-service");

    console.log("✅ [authentication-service] DB connection test passed!");
  });

  test("[identity service] should successfully verify database connection", async ({
    request,
  }) => {
    const response = await request.get(
      `${API_GATEWAY_URL}/trpc/identity.checkDbConnection`,
    );
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.result).toBeDefined();
    expect(data.result.data).toBeDefined();
    const result = data.result.data;

    expect(result.identity).toBeDefined();
    expect(result.identity.success).toBe(true);
    expect(result.identity.message).toContain("healthy");
    expect(result.identity.service).toBe("identity-service");

    console.log("✅ [identity-service] DB connection test passed!");
  });
});
