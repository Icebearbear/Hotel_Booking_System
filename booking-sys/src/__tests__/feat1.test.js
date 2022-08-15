import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import App from "../App";
import userEvent from "@testing-library/user-event";
console.log("");
const searchButton = () => {
  return screen.getByRole("button", {
    name: /search hotel/i,
  });
};
const searchBox = () => {
  return screen.getByTestId("destination");
};
const roomCombobox = () => {
  return screen.getByTestId("combobox-rooms");
};
const adultsCombobox = () => {
  return screen.getByTestId("combobox-adults");
};

describe("test components", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<App />);
    });
  });
  it("all components rendered successfully", async () => {
    expect(screen.getByText(/search page/i)).toBeInTheDocument();
    expect(screen.getByText(/destination/i)).toBeInTheDocument();
    expect(screen.getByText(/rooms/i)).toBeInTheDocument();
    expect(screen.getByText(/guests per room/i)).toBeInTheDocument();
    expect(screen.getByText(/start date/i)).toBeInTheDocument();
    expect(screen.getByText(/end date/i)).toBeInTheDocument();
    expect(searchBox()).toBeInTheDocument();
    expect(roomCombobox()).toBeInTheDocument();
    await expect(adultsCombobox()).toBeInTheDocument();
    expect(searchButton()).toBeInTheDocument();
  });

  it("user typed destination is shown", async () => {
    userEvent.type(searchBox(), "singapore");
    await waitFor(() => {
      expect(searchBox()).toHaveValue("singapore");
    });
  });

  it("selected rooms different number of combobox", () => {
    expect(roomCombobox().value).toEqual("1");
    const no_box = screen.getAllByTestId("combobox-adultsy");
    expect(no_box.length).toBe(1);

    fireEvent.change(roomCombobox(), {
      target: { value: 2 },
    });

    const no_box2 = screen.getAllByTestId("combobox-adults");
    expect(no_box2.length).toBe(2);
  });

  it("selected adults combobox values are correct", async () => {
    await waitFor(() => {
      expect(adultsCombobox().value).toEqual("1");
    });

    fireEvent.change(adultsCombobox(), {
      target: { value: 3 },
    });

    await waitFor(() => {
      expect(adultsCombobox().value).toEqual("3");
    });
  });

  it("select search and render next page", async () => {
    fireEvent.change(roomCombobox(), {
      target: { value: 1 },
    });
    fireEvent.change(await adultsCombobox(), {
      target: { value: 3 },
    });

    await waitFor(() => {
      expect(adultsCombobox().value).toEqual("3");
    });

    await waitFor(() => {
      expect(roomCombobox().value).toEqual("1");
    });
    fireEvent.click(searchButton());
    expect(screen.findByTestId("searchhotelresult-page")).toBeTruthy();
  });
});
