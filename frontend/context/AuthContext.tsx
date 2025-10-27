import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "../services/auth.ts";

// Minimal User shape returned by the backend
interface User { _id: string; name: string; email: string }

interface AuthContextProps { user: User | null; loading: boolean; login: (token: string) => Promise<void>; logout: () => void }

const AuthContext = createContext<AuthContextProps>({ user: null, loading: true, login: async () => {}, logout: () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
  authService.getProfile(token).then(setUser).catch(() => localStorage.removeItem("token")).finally(() => setLoading(false));
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    try {
      setLoading(true);
  const profile = await authService.getProfile(token);
      setUser(profile);
    } catch (err) {
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }
  const logout = () => { localStorage.removeItem("token"); setUser(null); }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
