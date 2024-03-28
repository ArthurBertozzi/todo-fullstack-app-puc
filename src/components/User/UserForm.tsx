import React, { useState } from "react";

interface UserFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, isSubmitting }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Criar Conta"}
      </button>
    </form>
  );
};

export default UserForm;
