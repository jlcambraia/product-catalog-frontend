"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { refresh } = useAuth();
  const router = useRouter();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError(res.status === 429
          ? "Muitas tentativas. Aguarde um pouco antes de tentar novamente."
          : "Não foi possível entrar. Confira seu usuário e sua senha.");
        return;
      }
      await refresh();
      router.replace("/");
      router.refresh();
    } catch {
      setError("Não foi possível conectar ao servidor. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={styles.shell}>
      <section className={styles.card} aria-labelledby="admin-title">
        <p className={styles.eyebrow}>MeuCatálogo</p>
        <h1 className={styles.title} id="admin-title">Área administrativa</h1>
        <p className={styles.subtitle}>Entre com suas credenciais para gerenciar os produtos do catálogo.</p>
        <form className={styles.form} onSubmit={submit}>
          <label className={styles.field} htmlFor="admin-user">
            Usuário
            <input className={styles.input} id="admin-user" required autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label className={styles.field} htmlFor="admin-password">
            Senha
            <input className={styles.input} id="admin-password" required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.submit} disabled={busy} type="submit">{busy ? "Entrando..." : "Entrar no painel"}</button>
        </form>
        <Link className={styles.back} href="/">Voltar ao catálogo público</Link>
      </section>
    </main>
  );
}
