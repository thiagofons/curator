import { expect, test } from "@playwright/test";

test.describe("RabbitMQ Connection E2E", () => {
  const API_GATEWAY_URL = "http://localhost:3300";

  test("[authentication service] should successfully verify RabbitMQ communication", async ({
    request,
  }) => {
    const response = await request.get(
      `${API_GATEWAY_URL}/trpc/authentication.testRabbitMQ`,
    );

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.result).toBeDefined();
    expect(data.result.data).toBeDefined();
    const result = data.result.data;

    expect(result.success).toBe(true);
    expect(result.message).toContain("Authentication service is healthy");
    expect(result.service).toBe("authentication-service");
    expect(result.receivedData).toBeDefined();
    expect(result.receivedData.message).toContain(
      "Testing RabbitMQ connection",
    );

    console.log("✅ [authentication-service] RabbitMQ health check passed!");
  });

  test("[identity service] should successfully verify RabbitMQ communication", async ({
    request,
  }) => {
    const response = await request.get(
      `${API_GATEWAY_URL}/trpc/identity.testRabbitMQ`,
    );

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.result).toBeDefined();
    expect(data.result.data).toBeDefined();
    const result = data.result.data;

    expect(result.success).toBe(true);
    expect(result.message).toContain("Identity service is healthy");
    expect(result.service).toBe("identity-service");
    expect(result.receivedData).toBeDefined();
    expect(result.receivedData.message).toContain(
      "Testing RabbitMQ connection",
    );

    console.log("✅ [identity-service] RabbitMQ health check passed!");
  });
});
