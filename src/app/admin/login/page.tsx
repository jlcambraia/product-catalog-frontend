"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { refresh } = useAuth();
  const router = useRouter();
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      if (!res.ok) { setError(res.status === 429 ? "Muitas tentativas. Tente mais tarde." : "Não foi possível entrar. Verifique suas credenciais."); return; }
      await refresh(); router.replace("/"); router.refresh();
    } catch { setError("Não foi possível conectar ao servidor."); }
    finally { setBusy(false); }
  }
  return <main style={{ maxWidth: 380, margin: "80px auto", padding: 24 }}>
    <h1>Área administrativa</h1>
    <form onSubmit={submit}>
      <label>Usuário<input required autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} /></label>
      <label>Senha<input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      {error && <p role="alert">{error}</p>}
      <button disabled={busy} type="submit">{busy ? "Entrando..." : "Entrar"}</button>
    </form>
  </main>;
}
