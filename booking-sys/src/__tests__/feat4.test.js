// import { screen, render, waitFor } from "@testing-library/react";
// import React from "react";
// import { MemoryRouter, MemoryRouter as Router } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
// import CustomerInformation from "../components/CustomerInformation";
// import { act } from "react-dom/test-utils";
// import axios from "axios";

// const getFirstName = () => {
//   return screen.getByRole("textbox", {
//     name: /first name/i,
//   });
// };
// const getLastName = () => {
//   return screen.getByRole("textbox", {
//     name: /last name/i,
//   });
// };
// const getEmail = () => {
//   return screen.getByRole("textbox", {
//     name: /email address/i,
//   });
// };
// const getPhoneNo = () => {
//   return screen.getByRole("textbox", {
//     name: /phone number optional/i,
//   });
// };
// const getCountryOrigin = () => {
//   return screen.getByRole("textbox", {
//     name: /country\/region of residence/i,
//   });
// };
// const specialReqTitle = () => {
//   screen.getByText(/special requests/i);
// };
// const radioNonSmoking = () => {
//   return screen.getByRole("radio", {
//     name: /non smoking/i,
//   });
// };
// const radioSmoking = () => {
//   return screen.getByRole("radio", {
//     name: /smoking/i,
//   });
// };

// const radioLargeb = () => {
//   return screen.getByRole("radio", {
//     name: /large bed/i,
//   });
// };
// const radioTwinb = () => {
//   return screen.getByRole("radio", {
//     name: /twin bed/i,
//   });
// };
// const checkBoxHighFloor = () => {
//   return screen.getByRole("checkbox", {
//     name: /high floor room please/i,
//   });
// };
// const checkboxQuiteRoom = () => {
//   return screen.getByRole("checkbox", {
//     name: /quite room/i,
//   });
// };
// const checkboxBabyCot = () => {
//   return screen.getByRole("checkbox", {
//     name: /i want baby bot \(additional charges may apply\)/i,
//   });
// };

// const checkboxAirportTransfer = () => {
//   return screen.getByRole("checkbox", {
//     name: /airport transfer/i,
//   });
// };
// const personalReq = () => {
//   return screen.getByRole("textbox", {
//     name: /any personal request\?/i,
//   });
// };
// const proceedButton = () => {
//   return screen.getByRole("button", {
//     name: /proceed to next step/i,
//   });
// };

// const lStorageKey = "BOOKING_DATA";
// const bookData = {
//   destination_id: "WP3Z",
//   hotelId: "JDst",
//   hotelName: "Manuaba inn",
//   roomType: "Superior Room",
//   noOfRooms: "1",
//   noOfAdults: "2",
//   noOfChildren: "0",
//   checkIn: "2022-8-1",
//   checkOut: "2022-8-8",
//   roomRate: 765.09,
//   roomType: "Superior Room",
//   surcharges: 122.08,
// };

// describe("cust info test", () => {
//   beforeEach(() => {
//     window.localStorage.clear();
//   });
//   it("test localStorage", () => {
//     const mockData = { data: "icebear" };
//     window.localStorage.setItem(lStorageKey, JSON.stringify(bookData));
//     expect(localStorage.getItem(lStorageKey)).toEqual(JSON.stringify(bookData));
//   });
// });

// describe("customer info", () => {
//   const totalPrice = parseInt(bookData.roomRate * 2);
//   //   console.log(totalPrice);
//   beforeEach(() => {
//     window.localStorage.clear();
//     window.localStorage.setItem(lStorageKey, JSON.stringify(bookData));
//     expect(localStorage.getItem(lStorageKey)).toEqual(JSON.stringify(bookData));

//     render(
//       <MemoryRouter>
//         <CustomerInformation />
//       </MemoryRouter>
//     );
//   });
//   it("customer info components are rendered", () => {
//     expect(screen.getByText(/customer information page/i)).toBeInTheDocument();
//     expect(getFirstName()).toBeInTheDocument();
//     expect(getLastName()).toBeInTheDocument();
//     expect(getEmail()).toBeInTheDocument();
//     expect(getPhoneNo()).toBeInTheDocument();
//     expect(getCountryOrigin()).toBeInTheDocument();

//     expect(screen.getByText(/special requests/i)).toBeInTheDocument();
//     expect(radioNonSmoking()).toBeInTheDocument();
//     expect(radioSmoking()).toBeInTheDocument();
//     expect(checkBoxHighFloor()).toBeInTheDocument();
//     expect(checkboxQuiteRoom()).toBeInTheDocument();
//     expect(checkboxBabyCot()).toBeInTheDocument();
//     expect(checkboxAirportTransfer()).toBeInTheDocument();
//     expect(personalReq()).toBeInTheDocument();
//     expect(proceedButton()).toBeInTheDocument();

//     expect(screen.getByText(/booking information/i)).toBeInTheDocument();
//     expect(screen.getByText(bookData.hotelName)).toBeInTheDocument();
//     expect(screen.getByText(bookData.roomType)).toBeInTheDocument();
//     expect(screen.getByText(bookData.checkIn)).toBeInTheDocument();
//     expect(screen.getByText(bookData.checkOut)).toBeInTheDocument();
//     expect(
//       screen.getByText("SGD " + totalPrice.toString())
//     ).toBeInTheDocument();
//     expect(
//       screen.getByText(
//         bookData.noOfRooms +
//           " Room " +
//           bookData.noOfAdults +
//           " Adults, " +
//           bookData.noOfChildren +
//           " Children / Per Room"
//       )
//     ).toBeInTheDocument();
//   });

//   it("special requests components are rendered", () => {
//     expect(screen.getByText(/special requests/i)).toBeInTheDocument();
//     expect(radioNonSmoking()).toBeInTheDocument();
//     expect(radioSmoking()).toBeInTheDocument();
//     expect(checkBoxHighFloor()).toBeInTheDocument();
//     expect(checkboxQuiteRoom()).toBeInTheDocument();
//     expect(checkboxBabyCot()).toBeInTheDocument();
//     expect(checkboxAirportTransfer()).toBeInTheDocument();
//     expect(personalReq()).toBeInTheDocument();
//     expect(proceedButton()).toBeInTheDocument();
//   });

//   it("booking info components are rendered", () => {
//     expect(screen.getByText(/booking information/i)).toBeInTheDocument();
//     expect(screen.getByText(bookData.hotelName)).toBeInTheDocument();
//     expect(screen.getByText(bookData.roomType)).toBeInTheDocument();
//     expect(screen.getByText(bookData.checkIn)).toBeInTheDocument();
//     expect(screen.getByText(bookData.checkOut)).toBeInTheDocument();
//     expect(
//       screen.getByText("SGD " + totalPrice.toString())
//     ).toBeInTheDocument();
//     expect(
//       screen.getByText(
//         bookData.noOfRooms +
//           " Room " +
//           bookData.noOfAdults +
//           " Adults, " +
//           bookData.noOfChildren +
//           " Children / Per Room"
//       )
//     ).toBeInTheDocument();
//   });

//   it("tick checkboxes and radios", async () => {
//     expect(radioSmoking().checked).toEqual(false);
//     expect(radioNonSmoking().checked).toEqual(false);
//     expect(radioLargeb().checked).toEqual(false);
//     expect(radioTwinb().checked).toEqual(false);
//     expect(checkBoxHighFloor().checked).toEqual(false);
//     expect(checkboxQuiteRoom().checked).toEqual(false);
//     expect(checkboxAirportTransfer().checked).toEqual(false);
//     expect(checkboxBabyCot().checked).toEqual(false);

//     act(() => {
//       userEvent.click(radioSmoking());
//       userEvent.click(radioLargeb());
//       userEvent.click(checkBoxHighFloor());
//       userEvent.click(checkboxQuiteRoom());
//       userEvent.click(checkboxAirportTransfer());
//       userEvent.click(checkboxBabyCot());
//     });
//     expect(radioSmoking().checked).toEqual(true);
//     expect(radioLargeb().checked).toEqual(true);
//     //   expect(checkBoxHighFloor().checked).toEqual(true);
//     // expect(checkboxQuiteRoom().checked).toEqual(true);
//     //   expect(checkboxAirportTransfer().checked).toEqual(true);
//     //   expect(checkboxBabyCot().checked).toEqual(true);
//   });

//   it("user typed email is shown", async () => {
//     userEvent.type(getEmail(), "a@gmail.com");
//     expect(await getEmail()).toHaveValue("a@gmail.com");
//   });

//   it("user typed first name is shown", async () => {
//     userEvent.type(getFirstName(), "Icebear");
//     expect(await getFirstName()).toHaveValue("Icebear");
//   });

//   it("user typed last name is shown", async () => {
//     userEvent.type(getLastName(), "Back");
//     expect(await getLastName()).toHaveValue("Back");
//   });
// });

// describe("customer info error tests when some inputs are not given", () => {
//   beforeAll(async () => {
//     jest.mock("axios");
//     axios.post.mockImplementation((url) => {
//       switch (url) {
//         case "http://localhost:3001/create-checkout-session":
//           return Promise.resolve({
//             data: { url: "http://localhost:3000/success" },
//           }); // served upon success
//       }
//     });

//     window.localStorage.clear();
//     window.localStorage.setItem(lStorageKey, JSON.stringify(bookData));
//     expect(localStorage.getItem(lStorageKey)).toEqual(JSON.stringify(bookData));

//     const { container } = render(
//       <MemoryRouter>
//         <CustomerInformation />
//       </MemoryRouter>
//     );
//     await userEvent.click(proceedButton());
//     let validationCheck;
//     await waitFor(() => {
//       validationCheck = container.querySelector('[data-validity="false"]');
//     });
//     expect(validationCheck).toBeTruthy();
//   });

//   it("error messages shown", async () => {
//     await waitFor(() => {
//       userEvent.type(getEmail(), "Icebear");
//       userEvent.type(getFirstName(), "Bear");
//       userEvent.click(proceedButton());
//       expect(
//         screen.getByText("Please input valid last name")
//       ).toBeInTheDocument();
//       expect(
//         screen.getByText("Please input valid email address")
//       ).toBeInTheDocument();
//       expect(
//         screen.getByText("Please input valid country")
//       ).toBeInTheDocument();
//     });
//   });
// });

// describe("valid inputs and successful payment", () => {
//   beforeEach(async () => {
//     jest.mock("axios");
//     axios.post.mockImplementation((url) => {
//       switch (url) {
//         case "http://localhost:3001/create-checkout-session":
//           return Promise.resolve({
//             data: { url: "http://localhost:3000/success" },
//           }); // served upon failure
//       }
//     });

//     window.localStorage.clear();
//     window.localStorage.setItem(lStorageKey, JSON.stringify(bookData));
//     expect(localStorage.getItem(lStorageKey)).toEqual(JSON.stringify(bookData));

//     const { container } = render(
//       <MemoryRouter>
//         <CustomerInformation />
//       </MemoryRouter>
//     );
//   });

//   it("go to next page upon giving correct inputs and click button", async () => {
//     await waitFor(() => {
//       userEvent.type(getEmail(), "a@gmail.com");
//       userEvent.type(getFirstName(), "Bear");
//       userEvent.type(getLastName(), "Icebear");
//       userEvent.type(getPhoneNo(), "123456");
//       userEvent.type(getCountryOrigin(), "sg");
//     });
//     userEvent.click(proceedButton());
//     expect(screen.findByTestId("success-page")).toBeTruthy();
//   });
// });

// describe("valid inputs and successful payment", () => {
//   beforeEach(async () => {
//     jest.mock("axios");
//     axios.post.mockImplementation((url) => {
//       switch (url) {
//         case "http://localhost:3001/create-checkout-session":
//           return Promise.resolve({
//             data: { url: "http://localhost:3000/cancel" },
//           }); // served upon success
//       }
//     });

//     window.localStorage.clear();
//     window.localStorage.setItem(lStorageKey, JSON.stringify(bookData));
//     expect(localStorage.getItem(lStorageKey)).toEqual(JSON.stringify(bookData));

//     const { container } = render(
//       <MemoryRouter>
//         <CustomerInformation />
//       </MemoryRouter>
//     );
//   });

//   it("go to next page upon giving correct inputs and click button", async () => {
//     await waitFor(() => {
//       userEvent.type(getEmail(), "a@gmail.com");
//       userEvent.type(getFirstName(), "Bear");
//       userEvent.type(getLastName(), "Icebear");
//       userEvent.type(getPhoneNo(), "123456");
//       userEvent.type(getCountryOrigin(), "sg");
//     });
//     userEvent.click(proceedButton());
//     expect(screen.findByTestId("cancel-page")).toBeTruthy();
//   });
// });

// describe("customer info error tests when all inputs are not given", () => {
//   beforeAll(async () => {
//     window.localStorage.clear();
//     window.localStorage.setItem(lStorageKey, JSON.stringify(bookData));
//     expect(localStorage.getItem(lStorageKey)).toEqual(JSON.stringify(bookData));

//     const { container } = render(
//       <MemoryRouter>
//         <CustomerInformation />
//       </MemoryRouter>
//     );
//     await userEvent.click(proceedButton());
//     let validationCheck;
//     await waitFor(() => {
//       validationCheck = container.querySelector('[data-validity="false"]');
//     });
//     expect(validationCheck).toBeTruthy();
//   });

//   it("error messages shown", async () => {
//     expect(
//       screen.getByText("Please input valid first name")
//     ).toBeInTheDocument();
//     expect(
//       screen.getByText("Please input valid last name")
//     ).toBeInTheDocument();
//     expect(
//       screen.getByText("Please input valid email address")
//     ).toBeInTheDocument();
//     expect(screen.getByText("Please input valid country")).toBeInTheDocument();
//   });
// });
