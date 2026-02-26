import { describe, expect, it } from "vitest";
import { formSchema, type FormValues } from "./formSchema";

describe("formSchema", () => {
  describe("valid inputs", () => {
    it("should accept a valid email", () => {
      const validData: FormValues = {
        email: "john@example.com",
      };

      const result = formSchema.safeParse(validData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });
  });

  describe("invalid inputs", () => {
    it("should reject an invalid email format", () => {
      const result = formSchema.safeParse({ email: "invalid-email" });

      expect(result.success).toBe(false);
    });

    it("should reject an empty email", () => {
      const result = formSchema.safeParse({ email: "" });

      expect(result.success).toBe(false);
    });

    it("should reject missing email", () => {
      const result = formSchema.safeParse({});

      expect(result.success).toBe(false);
    });
  });
});
