import React, { useState } from "react";
import UserForm from "../components/User/UserForm";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import styles from "../styles/auth/auth-form.module.css";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { MdArrowRightAlt } from "react-icons/md";
import { FormControl, FormLabel } from "@mui/joy";
import Router from "next/router";
import { authenticateApp } from "../utils/auth/authenticateApp";
import { CheckSession } from "../utils/auth/checkSession";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  CheckSession();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formValidationError, setFormValidationError] = useState<string>("");

  const validationForm = () => {
    if (!name || !email || !password) {
      setFormValidationError("Por favor, preencha todos os campos");
      return false;
    }
    if (password.length < 6) {
      setFormValidationError("A senha deve ter no mínimo 6 caracteres");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormValidationError("");

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const validationSuccess = validationForm();
      if (!validationSuccess) {
        setIsSubmitting(false);
        return;
      }

      const data = {
        name,
        email,
        password,
      };

      console.log(data);

      const response = await axios.post("/api/users/user", data, { headers });

      if (response.status === 201) {
        // Usuário criado com sucesso!
        console.log("Usuário criado com sucesso");
        await authenticateApp(email, password);

        Router.push("/loggedTest");
      } else {
        // Erro ao criar o usuário.
        console.error("Erro ao criar usuário:", response.data.error);
        // Handle the specific error from the API response (optional)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error:", axiosError.message);
        // Handle axios errors
      } else {
        console.error("Error:", error);
        // Handle general errors
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Criar Conta</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Nome:</FormLabel>
          <Input
            type="Nome"
            value={name}
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={email}
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
        {formValidationError && (
          <p style={{ color: "red" }}>{formValidationError}</p>
        )}
      </form>
      <Link href="/">Volte</Link>
    </div>
  );
};

export default SignupPage;
