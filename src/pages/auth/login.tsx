import React, { useState } from "react";
import UserForm from "../../components/UserForm";
import axios, { AxiosError } from "axios";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log(data);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.get("/api/users/user");

      if (response.status === 200) {
        // Usuário criado com sucesso!
        console.log(response);
      } else {
        console.error("Erro ao criar usuário:", response.data.error);
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
    <div>
      <h1>Login Conta</h1>
      <UserForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <Link href="/">Volte</Link>
    </div>
  );
};

export default SignupPage;
