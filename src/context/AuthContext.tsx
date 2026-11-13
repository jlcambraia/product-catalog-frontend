"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

type AuthState = { authenticated: boolean; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void> };
const Context = createContext<AuthState | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      setAuthenticated(res.ok && data.authenticated === true);
    } catch { setAuthenticated(false); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
    await refresh();
  };
  return <Context.Provider value={{ authenticated, loading, refresh, logout }}>{children}</Context.Provider>;
}
export function useAuth() {
  const context = useContext(Context);
  if (!context) throw new Error("useAuth requires AuthProvider");
  return context;
}
