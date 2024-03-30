import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import styles from "../../styles/auth/auth-form.module.css";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { MdArrowRightAlt } from "react-icons/md";
import { FormControl, FormLabel } from "@mui/joy";
import Router from "next/router";
import { authenticateApp } from "../../utils/auth/authenticateApp";

export const SignupForm: React.FC = () => {
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

      // console.log(data);

      const response = await axios.post("/api/users/user", data, { headers });

      if (response.status === 201) {
        // console.log("Usuário criado com sucesso");
        await authenticateApp(email, password);

        Router.push("/loggedTest");
      }
    } catch (error: any) {
      // console.error("Erro ao processar a requisição:", error);
      if (
        error.response.status === 400 &&
        error.response.data.message === "User already exists"
      ) {
        setFormValidationError("O e-mail já está cadastrado");
      } else {
        setFormValidationError("Erro ao processar a requisição");
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
          disabled={isSubmitting}
        >
          Entrar
        </Button>
        {formValidationError && (
          <p style={{ color: "red" }}>{formValidationError}</p>
        )}
      </form>
    </div>
  );
};
