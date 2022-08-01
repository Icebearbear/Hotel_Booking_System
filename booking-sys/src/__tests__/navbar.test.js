import { screen, render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import App from "../App";
import NavigationBar from "../components/NavigationBar";
import userEvent from "@testing-library/user-event";

const loginReg = () => {
  return screen.getByRole("button", {
    name: /login\/register/i,
  });
};
const getEmail = () => {
  return screen.getByRole("textbox", {
    name: /email address/i,
  });
};

const getPassword = () => {
  return screen.getByLabelText(/password/i);
};

const loginButton = () => {
  return screen.getByRole("button", {
    name: /submit/i,
  });
};

describe("app", async () => {
  beforeEach(() => {
    render(<App />);
  });
  it("render app", async () => {
    await userEvent.click(loginReg());
    expect(screen.findByTestId("login-page")).toBeTruthy();
  });

  it("test login localStorage", () => {
    window.localStorage.clear();
    window.localStorage.setItem("LOGIN", "true");
    expect(localStorage.getItem("LOGIN")).toEqual("true");
  });

  it("loged in shows user profile button", () => {});
});
