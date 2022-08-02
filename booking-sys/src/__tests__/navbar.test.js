import { screen, render, waitFor, queryByTestId } from "@testing-library/react";
import React from "react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import App from "../App";
import NavigationBar from "../components/NavigationBar";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { within } from "@testing-library/react";

const loginReg = () => {
  return screen.getByRole("button", {
    name: /login\/register/i,
  });
};

const userProf = () => {
  return screen.getByRole("button", {
    name: /user\/profile/i,
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

// describe("app", async () => {
//   it("render app", async () => {
//     render(<App />);
//     await userEvent.click(loginReg());
//     expect(screen.findByTestId("login-page")).toBeTruthy();
//   });

//   it("not loged in shows login register button", async () => {
//     const { queryByTestId } = render(<App />);
//     var mock = new MockAdapter(axios);
//     const data = { login: false, uid: null };
//     mock.onGet("http://localhost:3001/getSession").reply(200, data);
//     const { getByText } = within(queryByTestId("userprofile"));
//     expect(getByText("Login/Register")).toBeInTheDocument();
//   });
// });
