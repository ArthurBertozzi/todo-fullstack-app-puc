import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserMenu from "./UserMenu";

describe("UserMenu Component", () => {
  const anchorEl = document.createElement("div"); // Simulando um elemento âncora
  const handleMenuClose = jest.fn();

  test("Deve renderizar corretamente", () => {
    const { getByText } = render(
      <UserMenu
        anchorEl={anchorEl}
        isMenuOpen={true}
        handleMenuClose={handleMenuClose}
      />
    );
    const profileMenuItem = getByText("Profile");
    const quitMenuItem = getByText("Quit");
    expect(profileMenuItem).toBeTruthy();
    expect(quitMenuItem).toBeTruthy();
  });
});
