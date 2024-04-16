import { useEffect, useState } from "react";
import styles from "../../styles/auth/auth-form.module.css";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { MdArrowRightAlt } from "react-icons/md";
import { FormControl, FormLabel, Link } from "@mui/joy";
import { authenticateApp } from "../../utils/auth/authenticateApp";
import React from "react";

export default function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIncorrectCredentials(false);
    const authSuccess = await authenticateApp(email, password);
    console.log(authSuccess);
    if (!authSuccess) {
      setIncorrectCredentials(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={email}
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          color="primary"
          endDecorator={<MdArrowRightAlt />}
          variant="solid"
          type="submit"
        >
          Entrar
        </Button>
        {incorrectCredentials && (
          <p style={{ color: "red" }}>Credenciais inválidas</p>
        )}
      </form>
    </div>
  );
}
