// import { screen, render, waitFor, fireEvent } from "@testing-library/react";
// import React from "react";
// import App from "../App";
// import userEvent from "@testing-library/user-event";

// const searchButton = () => {
//   return screen.getByRole("button", {
//     name: /search hotel/i,
//   });
// };
// const searchBox = () => {
//   return screen.getByRole("textbox", {
//     name: /destination/i,
//   });
// };
// const roomCombobox = () => {
//   return screen.getByTestId("combobox-rooms");
// };
// const adultsCombobox = () => {
//   return screen.getByTestId("combobox-adults");
// };

// const childCombobox = () => {
//   return screen.getByTestId("combobox-child");
// };
// describe("test components", () => {
//   beforeEach(() => {
//     const { container } = render(<App />);
//   });
//   it("all components rendered successfully", () => {
//     expect(screen.getByText(/search page/i)).toBeInTheDocument();
//     expect(screen.getByText(/destination/i)).toBeInTheDocument();
//     expect(screen.getByText(/rooms/i)).toBeInTheDocument();
//     expect(screen.getByText(/adults/i)).toBeInTheDocument();
//     expect(screen.getByText(/childs/i)).toBeInTheDocument();
//     expect(screen.getByText(/start date/i)).toBeInTheDocument();
//     expect(screen.getByText(/end date/i)).toBeInTheDocument();
//     expect(searchBox()).toBeInTheDocument();
//     expect(roomCombobox()).toBeInTheDocument();
//     expect(adultsCombobox()).toBeInTheDocument();
//     expect(childCombobox()).toBeInTheDocument();
//     expect(searchButton()).toBeInTheDocument();
//   });

//   it("user typed destination is shown", async () => {
//     userEvent.type(searchBox(), "singapore");
//     await waitFor(() => {
//       expect(searchBox()).toHaveValue("singapore");
//     });
//   });

//   it("selected rooms combobox values are correct", () => {
//     expect(adultsCombobox().value).toEqual("1");

//     fireEvent.change(roomCombobox(), {
//       target: { value: 2 },
//     });

//     expect(roomCombobox().value).toEqual("2");
//   });

//   it("selected adults combobox values are correct", () => {
//     expect(adultsCombobox().value).toEqual("1");

//     fireEvent.change(adultsCombobox(), {
//       target: { value: 3 },
//     });

//     expect(adultsCombobox().value).toEqual("3");
//   });

//   it("selected child combobox values are correct", () => {
//     expect(adultsCombobox().value).toEqual("1");

//     fireEvent.change(childCombobox(), {
//       target: { value: 2 },
//     });

//     expect(childCombobox().value).toEqual("2");
//   });

//   it("select search and render next page", () => {
//     fireEvent.change(roomCombobox(), {
//       target: { value: 2 },
//     });
//     fireEvent.change(adultsCombobox(), {
//       target: { value: 3 },
//     });
//     fireEvent.change(childCombobox(), {
//       target: { value: 2 },
//     });
//     fireEvent.click(searchButton());
//     expect(screen.findByTestId("searchhotelresult-page")).toBeTruthy();
//   });
// });
