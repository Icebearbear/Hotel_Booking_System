import { screen, render, waitFor, queryByTestId } from "@testing-library/react";
import React from "react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import axios from "axios";

const loginReg = () => {
  return screen.getByRole("button", {
    name: /login\/register/i,
  });
};

const userProf = () => {
  return screen.getByRole("button", {
    name: /user profile/i,
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

describe("Test User Profile button shown when loged in", async () => {
  beforeEach(async () => {
    jest.mock("axios");
    axios.get.mockImplementation((url) => {
      switch (url) {
        case "http://localhost:3001/getSession":
          return Promise.resolve({ data: { login: true } });
      }
    });
    await waitFor(() => {
      render(<App />);
    });
  });

  it("check userprofile button is rendered", async () => {
    await waitFor(() => {
      expect(screen.getByText("User Profile")).toBeTruthy();
    });
  });

  it("check userprofile button redirect to user profile", async () => {
    await waitFor(() => {
      userEvent.click(userProf());
      expect(screen.findByTestId("user-page")).toBeTruthy();
    });
  });
});

describe("Test Login button shown when not loged in", async () => {
  beforeEach(async () => {
    jest.mock("axios");
    axios.get.mockImplementation((url) => {
      switch (url) {
        case "http://localhost:3001/getSession":
          return Promise.resolve({ data: { login: false } });
      }
    });
    await waitFor(() => {
      render(<App />);
    });
  });

  it("check login/register button is rendered", async () => {
    await waitFor(() => {
      expect(screen.getByText("Login/Register")).toBeTruthy();
    });
  });

  it("check userprofile button redirect to user profile", async () => {
    await waitFor(() => {
      userEvent.click(loginReg());
      expect(screen.findByTestId("login-page")).toBeTruthy();
    });
  });
});
console.log("");
