import { expect, test } from "@playwright/test";

test.describe("RabbitMQ Communication E2E", () => {
  const API_GATEWAY_URL = "http://localhost:3300";

  test("should successfully communicate between api-gateway and authentication-service via RabbitMQ", async ({
    request,
  }) => {
    // Test 1: Verify api-gateway is accessible
    const healthCheck = await request.get(
      `${API_GATEWAY_URL}/trpc/app.greeting`,
      {
        params: {
          input: JSON.stringify({ name: "Test", number: 123 }),
        },
      },
    );
    expect(healthCheck.ok()).toBeTruthy();

    // Test 2: Call the tRPC testRabbitMQ endpoint
    // tRPC uses query parameters for GET requests
    const response = await request.get(
      `${API_GATEWAY_URL}/trpc/users.testRabbitMQ`,
    );

    // Test 3: Verify the response is successful
    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    // Test 4: Validate response structure and content from authentication-service
    expect(data.result).toBeDefined();
    expect(data.result.data).toBeDefined();

    const result = data.result.data;

    // Verify the structure matches what we expect from authentication-service
    expect(result.success).toBe(true);
    expect(result.message).toBe("Authentication service is healthy");
    expect(result.service).toBe("authentication-service");
    expect(result.timestamp).toBeDefined();

    // Verify the data we sent was received
    expect(result.receivedData).toBeDefined();
    expect(result.receivedData.message).toBe(
      "Testing RabbitMQ connection from api-gateway",
    );
    expect(result.receivedData.timestamp).toBeDefined();

    console.log("✅ RabbitMQ communication test passed!");
    console.log("Response:", JSON.stringify(result, null, 2));
  });

  test("should handle RabbitMQ connection errors gracefully", async ({
    request,
  }) => {
    // This test verifies that the endpoint exists and returns proper structure
    // even if RabbitMQ has issues (it would timeout or return an error)
    const response = await request.get(
      `${API_GATEWAY_URL}/trpc/users.testRabbitMQ`,
    );

    // We expect a response (either success or a proper error structure)
    expect(response.status()).toBeLessThan(500);
  });
});
