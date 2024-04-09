import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";

describe("NavBar Component", () => {
  const onTaskAdded = jest.fn();

  test("Deve renderizar o título corretamente", () => {
    const { getByText } = render(<NavBar onTaskAdded={onTaskAdded} />);
    const titleElement = getByText("TodoApp");
    expect(titleElement).toBeTruthy();
  });
});
