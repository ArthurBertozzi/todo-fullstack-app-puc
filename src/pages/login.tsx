import { useState } from "react";
import { signIn } from "next-auth/react";
import Router from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false, // Redirecionamento personalizado após o login
      email,
      password,
    });

    if (!result) {
      console.error("Erro ao fazer login");
      return;
    }

    if (result.error) {
      console.error("Erro ao fazer login:", result.error);
    } else {
      console.log("Login bem-sucedido:", result);
      // Redirecionar para a página inicial, por exemplo
      Router.push("/loggedTest");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
