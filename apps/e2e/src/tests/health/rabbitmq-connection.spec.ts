import { expect, test } from "@playwright/test";
import { callTrpc } from "../../helpers/trpc";

test.describe("RabbitMQ Connection E2E", () => {
  test("[authentication service] should successfully verify RabbitMQ communication", async ({
    request,
  }) => {
    const result = await callTrpc(request, "authentication", "testRabbitMQ");

    expect(result).toBeDefined();
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
    const result = await callTrpc(request, "identity", "testRabbitMQ");

    expect(result).toBeDefined();
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
