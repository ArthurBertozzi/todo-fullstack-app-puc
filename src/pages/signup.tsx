import { useState } from "react";
import UserForm from "../components/UserForm";
import axios from "axios";

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post("/api/users/create", data, { headers });

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
      console.error("Error:", error);
      // Handle general errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Criar Conta</h1>
      <UserForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
