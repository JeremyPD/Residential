import axios from "axios";

const API_URL = "http://127.0.0.1:3000/auth/login";

export interface LoginResponse {
  access_token: string;
  rol: number;
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(API_URL, { username, password });

  localStorage.setItem("token", response.data.access_token);
  localStorage.setItem("rol", response.data.rol.toString());
  localStorage.setItem("username", username);

  return response.data;
};
