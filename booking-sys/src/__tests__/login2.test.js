import { screen, render, waitFor } from "@testing-library/react";
import React from "react";
import Login from "../components/Login";
import { MemoryRouter, MemoryRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";
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

const registerLink = () => {
  return screen.getByRole("listitem");
};

describe("login unit test", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/searchhotel"]}>
        <Login />
      </MemoryRouter>
    );
  });
  it("components are rendered", async () => {
    expect(getEmail()).toBeInTheDocument();
    expect(getPassword()).toBeInTheDocument();
    expect(registerLink()).toBeInTheDocument();
    expect(loginButton()).toBeInTheDocument();
  });
  it("login with valid email password and click submit", async () => {
    user.type(getEmail(), "a@gmail.com");
    user.type(getPassword(), "123qwe");
    user.click(loginButton());
    // expect(screen.findByTestId("search-page")).toBeTruthy();
  });

  it("user typed email is shown", async () => {
    userEvent.type(getEmail(), "a.com");
    expect(await getEmail()).toHaveValue("a.com");
  });
  it("user typed password is shown", async () => {
    userEvent.type(getPassword(), "123qwe");
    expect(await getPassword()).toHaveValue("123qwe");
  });
});

describe("login testing errors", () => {
  it("empty email show Please input a valid email ", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/searchhotel"]}>
        <Login />
      </MemoryRouter>
    );
    userEvent.type(getEmail(), "a.com");
    userEvent.type(getPassword(), "123qwe");
    // expect(registerLink()).toHaveAttribute("href", "/register");
    userEvent.click(loginButton());
    let validationCheck;
    await waitFor(() => {
      validationCheck = container.querySelector('[data-validity="false"]');
    });
    expect(validationCheck).toBeTruthy();
    expect(await screen.getByTestId("fb-email")).toBeInTheDocument();
    const { getByText } = within(await screen.getByTestId("fb-email"));
    expect(getByText("Please input a valid email")).toBeInTheDocument();
  });

  it("empty password show Please input a password", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/searchhotel"]}>
        <Login />
      </MemoryRouter>
    );
    userEvent.type(getEmail(), "a@gmail.com");
    userEvent.type(getPassword(), "123");
    // expect(registerLink()).toHaveAttribute("href", "/register");
    userEvent.click(loginButton());
    let validationCheck;
    await waitFor(() => {
      validationCheck = container.querySelector('[data-validity="false"]');
    });
    expect(validationCheck).toBeTruthy();
    const { getByText } = within(await screen.getByTestId("fb-pwd"));
    expect(getByText("Please input a password")).toBeInTheDocument();
    // expect(await screen.getByTestId("fb-pwd")).toBe("invalid password");
  });

  it("invalid email show error in ", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/searchhotel"]}>
        <Login />
      </MemoryRouter>
    );
    userEvent.type(getEmail(), "a.com");
    userEvent.type(getPassword(), "123qwe");
    await userEvent.click(loginButton());

    let validationCheck;
    await waitFor(() => {
      validationCheck = container.querySelector('[data-validity="false"]');
    });
    expect(validationCheck).toBeTruthy();
    expect(await screen.getByTestId("fb-email")).toBeInTheDocument();
    let getT;
    // await waitFor(() => {
    //   expect(screen.getByText(/invalid email/i)).toBeTruthy();
    // });
  });

  it("invalid password show wrong password ", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/searchhotel"]}>
        <Login />
      </MemoryRouter>
    );
    userEvent.type(getEmail(), "a@gmail.com");
    userEvent.type(getPassword(), "123");
    await userEvent.click(loginButton());

    let validationCheck;
    await waitFor(() => {
      validationCheck = container.querySelector('[data-validity="false"]');
    });

    expect(validationCheck).toBeTruthy();
    expect(await screen.getByTestId("fb-email")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/wrong password/i)).toBeTruthy();
    });
  });

  it("not existing user show error ", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/searchhotel"]}>
        <Login />
      </MemoryRouter>
    );
    userEvent.type(getEmail(), "wrong@gmail.com");
    userEvent.type(getPassword(), "123qwqe");
    await userEvent.click(loginButton());

    let validationCheck;
    await waitFor(() => {
      validationCheck = container.querySelector('[data-validity="false"]');
    });
    expect(validationCheck).toBeTruthy();
    expect(await screen.getByTestId("fb-email")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/user not found/i)).toBeTruthy();
    });
  });
});
