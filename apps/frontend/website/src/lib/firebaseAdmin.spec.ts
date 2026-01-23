/**
 * firebaseAdmin.ts tests
 *
 * Note: This module uses astro:env/server which is mocked globally via vitest.config.ts alias.
 * The mock provides valid credentials, so we test the happy path initialization.
 */

const { mockCert, mockGetApps, mockInitializeApp, mockGetFirestore } =
  vi.hoisted(() => ({
    mockCert: vi.fn((creds) => creds),
    mockGetApps: vi.fn(() => []),
    mockInitializeApp: vi.fn(),
    mockGetFirestore: vi.fn(() => ({ collection: vi.fn() })),
  }));

vi.mock("firebase-admin/app", () => ({
  cert: mockCert,
  getApps: mockGetApps,
  initializeApp: mockInitializeApp,
}));

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: mockGetFirestore,
}));

describe("firebaseAdmin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  describe("initialization", () => {
    it("should initialize Firebase app when no apps exist", async () => {
      mockGetApps.mockReturnValue([]);

      await import("./firebaseAdmin");

      expect(mockInitializeApp).toHaveBeenCalledTimes(1);
      expect(mockCert).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "service_account",
          project_id: "test-project",
        }),
      );
    });

    it("should not initialize Firebase app when app already exists", async () => {
      mockGetApps.mockReturnValue([{ name: "existing-app" }]);

      await import("./firebaseAdmin");

      expect(mockInitializeApp).not.toHaveBeenCalled();
    });

    it("should export adminDb from getFirestore", async () => {
      const mockDb = { collection: vi.fn() };
      mockGetFirestore.mockReturnValue(mockDb);

      const { adminDb } = await import("./firebaseAdmin");

      expect(adminDb).toBe(mockDb);
      expect(mockGetFirestore).toHaveBeenCalled();
    });
  });
});
