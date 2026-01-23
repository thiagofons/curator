import axios from "axios";
import { describe, expect, it, vi, type Mock } from "vitest";
import { sendForm } from "./sendForm";

vi.mock("axios");
const mockedAxios = vi.mocked(axios);

describe("sendForm", () => {
  const mockData = {
    name: "John Doe",
    email: "john@example.com",
    interest: "Technology",
  };

  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = {
      ...originalEnv,
      DISCORD_WEBHOOK_URL: "https://discord.webhook/test",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should send form data to Discord webhook successfully", async () => {
    (mockedAxios.post as Mock).mockResolvedValueOnce({ status: 204 });

    await expect(sendForm(mockData)).resolves.toBeUndefined();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://discord.webhook/test",
      {
        content: `New lead! \n\nName: John Doe\nEmail: john@example.com\nInterest: Technology`,
      },
    );
  });

  it("should throw an error when webhook returns non-204 status", async () => {
    (mockedAxios.post as Mock).mockResolvedValueOnce({ status: 500 });

    await expect(sendForm(mockData)).rejects.toThrow(
      "Failed to send form data to Discord webhook",
    );
  });

  it("should throw an error when axios request fails", async () => {
    (mockedAxios.post as Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    await expect(sendForm(mockData)).rejects.toThrow("Network error");
  });
});
