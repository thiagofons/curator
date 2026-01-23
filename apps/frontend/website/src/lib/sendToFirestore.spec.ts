import { vi } from "vitest";
import type { FormValues } from "./formSchema";

const { mockSet, mockDoc, mockCollection } = vi.hoisted(() => {
  const mockSet = vi.fn();
  const mockDoc = vi.fn(() => ({ set: mockSet }));
  const mockCollection = vi.fn(() => ({ doc: mockDoc }));
  return { mockSet, mockDoc, mockCollection };
});

// Mock firebase-admin modules (firebaseAdmin.ts will use these)
vi.mock("firebase-admin/app", () => ({
  cert: vi.fn((creds) => creds),
  getApps: vi.fn(() => []),
  initializeApp: vi.fn(),
}));

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn(() => ({
    collection: mockCollection,
  })),
}));

import { sendToFirestore } from "./sendToFirestore";

describe("sendToFirestore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSet.mockResolvedValue(undefined);
  });

  const validData: FormValues = {
    name: "John Doe",
    email: "john@example.com",
    theme: "Russian literature",
  };

  it("should save lead to the 'leads' collection", async () => {
    await sendToFirestore(validData);

    expect(mockCollection).toHaveBeenCalledWith("leads");
  });

  it("should use email as document ID", async () => {
    await sendToFirestore(validData);

    expect(mockDoc).toHaveBeenCalledWith("john@example.com");
  });

  it("should save all form data with merge option", async () => {
    await sendToFirestore(validData);

    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Doe",
        email: "john@example.com",
        theme: "Russian literature",
        updatedAt: expect.any(Date),
      }),
      { merge: true },
    );
  });

  it("should include updatedAt timestamp", async () => {
    const beforeCall = new Date();

    await sendToFirestore(validData);

    const callArgs = mockSet.mock.calls[0][0];
    const afterCall = new Date();

    expect(callArgs.updatedAt.getTime()).toBeGreaterThanOrEqual(
      beforeCall.getTime(),
    );
    expect(callArgs.updatedAt.getTime()).toBeLessThanOrEqual(
      afterCall.getTime(),
    );
  });

  it("should log success message", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await sendToFirestore(validData);

    expect(consoleSpy).toHaveBeenCalledWith("✅ Lead salvo no Firestore.");
    consoleSpy.mockRestore();
  });

  it("should propagate errors from Firestore", async () => {
    const error = new Error("Firestore error");
    mockSet.mockRejectedValueOnce(error);

    await expect(sendToFirestore(validData)).rejects.toThrow("Firestore error");
  });
});
