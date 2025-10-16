import { createContext, useState, useEffect, type ReactNode } from "react";

interface SessionContextProps {
  user: { username: string; rol: number } | null;
  logout: () => void;
}

export const SessionContext = createContext<SessionContextProps>({
  user: null,
  logout: () => {},
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string; rol: number } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const rol = localStorage.getItem("rol");

    if (token && username && rol) {
      setUser({ username, rol: Number(rol) });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <SessionContext.Provider value={{ user, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
