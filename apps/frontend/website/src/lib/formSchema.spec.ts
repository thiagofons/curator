import { formSchema, type FormValues } from "./formSchema";

describe("formSchema", () => {
  describe("valid inputs", () => {
    it("should accept valid data with all fields", () => {
      const validData: FormValues = {
        name: "John Doe",
        email: "john@example.com",
        theme: "Russian literature",
      };

      const result = formSchema.safeParse(validData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });

    it("should accept valid data without theme (optional)", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
      };

      const result = formSchema.safeParse(validData);

      expect(result.success).toBe(true);
      expect(result.data?.theme).toBe("");
    });

    it("should accept empty string for theme", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        theme: "",
      };

      const result = formSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });
  });

  describe("invalid inputs", () => {
    it("should reject name with less than 2 characters", () => {
      const invalidData = {
        name: "J",
        email: "john@example.com",
        theme: "",
      };

      const result = formSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject empty name", () => {
      const invalidData = {
        name: "",
        email: "john@example.com",
        theme: "",
      };

      const result = formSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject invalid email format", () => {
      const invalidData = {
        name: "John Doe",
        email: "invalid-email",
        theme: "",
      };

      const result = formSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject empty email", () => {
      const invalidData = {
        name: "John Doe",
        email: "",
        theme: "",
      };

      const result = formSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject missing required fields", () => {
      const invalidData = {};

      const result = formSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });
});
