import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./loginForm";

describe("LoginForm Component", () => {
  test("Deve renderizar os campos de email e senha corretamente", () => {
    const { getByLabelText } = render(<LoginForm />);
    const emailInput = getByLabelText("Email:");
    const passwordInput = getByLabelText("Password:");
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });
});
