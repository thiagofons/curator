import { vi } from "vitest";
import type { FormValues } from "./formSchema";
import { sendToDiscord } from "./sendToDiscord";

describe("sendToDiscord", () => {
  const mockFetch = vi.fn();
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.unstubAllEnvs();
  });

  const validData: FormValues = {
    name: "John Doe",
    email: "john@example.com",
    theme: "Russian literature",
  };

  describe("when webhook URL is configured", () => {
    beforeEach(() => {
      vi.stubEnv(
        "DISCORD_WEBHOOK_URL",
        "https://discord.com/api/webhooks/test",
      );
      // Mock import.meta.env
      vi.stubGlobal("import", {
        meta: {
          env: {
            DISCORD_WEBHOOK_URL: "https://discord.com/api/webhooks/test",
          },
        },
      });
    });

    it("should send a POST request to the webhook URL", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      await sendToDiscord(validData);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        }),
      );
    });

    it("should include embed with user data", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      await sendToDiscord(validData);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.embeds).toHaveLength(1);
      expect(body.embeds[0].fields).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "👤 Nome", value: "John Doe" }),
          expect.objectContaining({
            name: "📧 E-mail",
            value: "john@example.com",
          }),
          expect.objectContaining({
            name: "🎯 Tema de Interesse",
            value: "Russian literature",
          }),
        ]),
      );
    });

    it("should show 'Não informado' when theme is empty", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      const dataWithoutTheme: FormValues = { ...validData, theme: "" };

      await sendToDiscord(dataWithoutTheme);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const themeField = body.embeds[0].fields.find(
        (f: { name: string }) => f.name === "🎯 Tema de Interesse",
      );

      expect(themeField.value).toBe("Não informado");
    });

    it("should handle fetch errors gracefully", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await expect(sendToDiscord(validData)).resolves.not.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith(
        "❌ Erro ao enviar para Discord:",
        expect.any(Error),
      );
      consoleSpy.mockRestore();
    });

    it("should log error when response is not ok", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, statusText: "Bad Request" });
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await sendToDiscord(validData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "❌ Erro ao enviar para Discord:",
        "Bad Request",
      );
      consoleSpy.mockRestore();
    });
  });

  describe("when webhook URL is not configured", () => {
    it("should skip sending and log a warning", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      await sendToDiscord(validData);

      expect(mockFetch).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        "⚠️ DISCORD_WEBHOOK_URL não configurada. Pulando notificação.",
      );
      consoleSpy.mockRestore();
    });
  });
});
