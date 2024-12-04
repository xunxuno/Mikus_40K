import { z } from "zod";

// Define el esquema que usas en tu componente
const loginSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

describe("Validación del esquema de login", () => {
  test("Debe pasar con email y contraseña válidos", () => {
    const validData = { email: "usuario@dominio.com", password: "123456" };
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test("Debe fallar con email inválido", () => {
    const invalidEmail = { email: "usuario", password: "123456" };
    const result = loginSchema.safeParse(invalidEmail);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("El email no es válido");
    }
  });

  test("Debe fallar con contraseña demasiado corta", () => {
    const invalidPassword = { email: "usuario@dominio.com", password: "123" };
    const result = loginSchema.safeParse(invalidPassword);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "La contraseña debe tener al menos 6 caracteres"
      );
    }
  });
});
