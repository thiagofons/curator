// Mock for astro:env/server - used in tests
export const FIREBASE_SERVICE_ACCOUNT_KEY = JSON.stringify({
  type: "service_account",
  project_id: "test-project",
  private_key: "test-key",
  client_email: "test@test.iam.gserviceaccount.com",
});
