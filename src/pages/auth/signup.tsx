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

      const response = await axios.post("/api/users/user", data, { headers });

      if (response.status === 201) {
        // Usuário criado com sucesso!
        console.log("Usuário criado com sucesso");
        // You can potentially redirect here or show a success message
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
    <div>
      <h1>Criar Conta</h1>
      <UserForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <Link href="/">Volte</Link>
    </div>
  );
};

export default SignupPage;
