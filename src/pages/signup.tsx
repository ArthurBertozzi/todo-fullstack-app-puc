import React, { useEffect, useState } from "react";
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
import { LoadingPage } from "../components/Utils/LoadingPage";

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formValidationError, setFormValidationError] = useState<string>("");
  const [pageLoading, setPageLoading] = useState(true);
  const [existingUser, setExistingUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkLogin = await CheckSession();
        if (checkLogin === false) {
          setPageLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    fetchData();
  }, []);

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
        console.log("Erro ao criar usuário:", response.data.message);
        console.log("Resposta de erro completa:", response.data); // Adicionando esta linha para verificar o conteúdo completo da resposta

        // Verificando se o e-mail já está cadastrado
        if (
          response.status === 400 &&
          response.data.message === "User already exists"
        ) {
          setExistingUser(true);
        } else {
          // Tratamento para outros erros
          // Implemente conforme necessário
        }
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      // Handle axios errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {pageLoading ? (
        <LoadingPage />
      ) : (
        <>
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
            {existingUser && (
              <p style={{ color: "red" }}>O e-mail já está cadastrado</p>
            )}
          </form>
          <Link href="/">Volte</Link>
        </>
      )}
    </div>
  );
};

export default SignupPage;
