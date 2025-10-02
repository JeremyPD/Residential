export const authService = {
  login: async (cedula: string, password: string) => {
    // Aquí luego conectas con tu backend (fetch o axios)
    if (cedula === "123" && password === "admin") {
      return { success: true, token: "fake-jwt-token" };
    }
    return { success: false, message: "Credenciales inválidas" };
  },
};
