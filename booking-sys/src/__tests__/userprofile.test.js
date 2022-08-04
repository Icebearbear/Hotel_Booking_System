import { screen, render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import UserProfile from "../components/UserProfile";
const userData = {
  email: "a2@gmail.com",
  first_name: "changed_first_name2",
  last_name: "changed_last_name12",
  uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
};

const editButton = () => {
  return screen.getByRole("button", {
    name: /edit profile/i,
  });
};

const logoutButton = () => {
  return screen.getByRole("button", {
    name: /logout/i,
  });
};
const backButton = () => {
  return screen.getByRole("button", {
    name: /back to search/i,
  });
};
describe("app", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.setItem("USER_ID", "EdPDTW6cmVhsBICgZNYWxHCPIDi2");
    expect(localStorage.getItem("USER_ID")).toEqual(
      "EdPDTW6cmVhsBICgZNYWxHCPIDi2"
    );
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );
  });
  it("test all components rendered", async () => {
    await waitFor(() => {
      expect(
        screen.getByText(userData.first_name + " " + userData.last_name)
      ).toBeInTheDocument();
      expect(screen.getByText(userData.email)).toBeInTheDocument();
      expect(screen.getByText(userData.uid)).toBeInTheDocument();
      expect(editButton()).toBeInTheDocument();
      expect(logoutButton()).toBeInTheDocument();
      expect(backButton()).toBeInTheDocument();
    });
  });

  it("test edit button ", async () => {
    await userEvent.click(editButton());
    expect(screen.findByTestId("user-profile-page")).toBeTruthy();
  });

  it("test logout button", async () => {
    await userEvent.click(logoutButton());
    expect(screen.findByTestId("search-page")).toBeTruthy();
  });
});
