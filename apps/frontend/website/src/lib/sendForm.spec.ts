import { vi } from "vitest";
import type { FormValues } from "./formSchema";

// Hoist mock functions so they're available during vi.mock() hoisting
const { mockSendToFirestore, mockSendToDiscord } = vi.hoisted(() => ({
  mockSendToFirestore: vi.fn(),
  mockSendToDiscord: vi.fn(),
}));

vi.mock("./sendToFirestore", () => ({
  sendToFirestore: mockSendToFirestore,
}));

vi.mock("./sendToDiscord", () => ({
  sendToDiscord: mockSendToDiscord,
}));

import { sendForm } from "./sendForm";

describe("sendForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendToFirestore.mockResolvedValue(undefined);
    mockSendToDiscord.mockResolvedValue(undefined);
  });

  const validData: FormValues = {
    name: "John Doe",
    email: "john@example.com",
    theme: "Russian literature",
  };

  it("should call sendToFirestore with form data", async () => {
    await sendForm(validData);

    expect(mockSendToFirestore).toHaveBeenCalledWith(validData);
    expect(mockSendToFirestore).toHaveBeenCalledTimes(1);
  });

  it("should call sendToDiscord with form data", async () => {
    await sendForm(validData);

    expect(mockSendToDiscord).toHaveBeenCalledWith(validData);
    expect(mockSendToDiscord).toHaveBeenCalledTimes(1);
  });

  it("should call Firestore before Discord", async () => {
    const callOrder: string[] = [];

    mockSendToFirestore.mockImplementation(() => {
      callOrder.push("firestore");
      return Promise.resolve();
    });

    mockSendToDiscord.mockImplementation(() => {
      callOrder.push("discord");
      return Promise.resolve();
    });

    await sendForm(validData);

    expect(callOrder).toEqual(["firestore", "discord"]);
  });

  it("should propagate Firestore errors", async () => {
    const error = new Error("Firestore failed");
    mockSendToFirestore.mockRejectedValueOnce(error);

    await expect(sendForm(validData)).rejects.toThrow("Firestore failed");
    expect(mockSendToDiscord).not.toHaveBeenCalled();
  });

  it("should propagate Discord errors", async () => {
    const error = new Error("Discord failed");
    mockSendToDiscord.mockRejectedValueOnce(error);

    await expect(sendForm(validData)).rejects.toThrow("Discord failed");
    expect(mockSendToFirestore).toHaveBeenCalled();
  });
});
