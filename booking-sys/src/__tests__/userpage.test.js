// import {
//   screen,
//   render,
//   waitFor,
//   fireEvent,
//   getAllByTestId,
// } from "@testing-library/react";
// import React from "react";
// import { MemoryRouter, MemoryRouter as Router } from "react-router-dom";

// import axios from "../__mocks__/axios";
// import UsersPage from "../components/UsersPage";

// const bookingData = [
//   [
//     "mBl3JLAEWVbfaxrOxX8D",
//     {
//       bookingInfo: {
//         airportTransfer: false,
//         babyCotReq: false,
//         bedType: "large",
//         bookForSomeone: false,
//         endDate: "2022-08-03",
//         extraReq: "staycay",
//         highFloor: true,
//         message: "booking for birthday celebration",
//         noAdult: "2",
//         noChildren: "0",
//         noNight: 2,
//         quiteRoom: true,
//         roomType: "Superior Room",
//         smoking: false,
//         startDate: "2022-07-26",
//       },
//       guestInformation: {
//         country: "sg",
//         email: "yuliatiyuli39@gmail.com",
//         firstName: "yu",
//         lastName: "li",
//         phone: "12345",
//         salutation: "Ms",
//         userID: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
//       },
//       hotelID: "y6jp",
//       hotelName: "Puri Asri Villa",
//       price: 796,
//       uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
//     },
//   ],
//   [
//     "oDHnh4TdurM5sWYlKnCC",
//     {
//       bookingInfo: {
//         airportTransfer: false,
//         babyCotReq: true,
//         bedType: "large",
//         bookForSomeone: false,
//         endDate: "2022-08-04",
//         extraReq: "",
//         highFloor: false,
//         message: "booking for birthday celebration",
//         noAdult: "2",
//         noChildren: "0",
//         noNight: 2,
//         quiteRoom: false,
//         roomType: "VILLA ONE BEDROOM",
//         smoking: false,
//         startDate: "2022-07-27",
//       },
//       hotelID: "GchA",
//       hotelName: "Bumi Ubud Resort",
//       uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
//       guestInformation: {
//         country: "sg",
//         email: "a@gmail.com",
//         firstName: "asd",
//         lastName: "asd",
//         phone: "12343456",
//         salutation: "Ms",
//         userID: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
//       },
//       price: 834,
//     },
//   ],
// ];

// const userData = {
//   email: "a2@gmail.com",
//   first_name: "changed_first_name2",
//   last_name: "changed_last_name12",
//   uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
// };

// const noBookingUser = {
//   email: "testnew@gmail.com",
//   first_name: "yu",
//   last_name: "li",
//   uid: "SugEjPenYkQeQjNxDSZ8UCKJ9k42",
// };

// const editButton = () => {
//   return screen.getByRole("button", {
//     name: /edit profile/i,
//   });
// };

// const logoutButton = () => {
//   return screen.getByRole("button", {
//     name: /logout/i,
//   });
// };
// const backButton = () => {
//   return screen.getByRole("button", {
//     name: /back to search/i,
//   });
// };

// const popupBack = () => {
//   return screen.getByRole("button", {
//     name: /back/i,
//   });
// };
// describe("UsersPage test with login", () => {
//   beforeEach(async () => {
//     jest.mock("axios");
//     axios.get.mockImplementation((url) => {
//       switch (url) {
//         case "http://localhost:3001/user":
//           return Promise.resolve({ data: { data: userData } });
//         case "http://localhost:3001/getBook":
//           return Promise.resolve({ data: { finalData: bookingData } });
//       }
//     });
//     window.localStorage.clear();
//     window.localStorage.setItem("LOGIN", "true");
//     window.localStorage.setItem("USER_ID", "EdPDTW6cmVhsBICgZNYWxHCPIDi2");

//     await waitFor(() => {
//       render(
//         <MemoryRouter>
//           <UsersPage />
//         </MemoryRouter>
//       );
//     });
//   });
//   it("localStorage is updated", () => {
//     expect(localStorage.getItem("LOGIN")).toEqual("true");
//     expect(localStorage.getItem("USER_ID")).toEqual(
//       "EdPDTW6cmVhsBICgZNYWxHCPIDi2"
//     );
//   });
//   it("booking history components rendered", async () => {
//     await waitFor(() => {
//       bookingData.forEach((booking) => {
//         expect(screen.getByText(booking[1].hotelName)).toBeInTheDocument();
//         expect(
//           screen.getByText(booking[1].bookingInfo.roomType)
//         ).toBeInTheDocument();
//         expect(
//           screen.getByText(
//             booking[1].bookingInfo.startDate +
//               " until " +
//               booking[1].bookingInfo.endDate
//           )
//         ).toBeInTheDocument();
//         expect(screen.getByText("SGD " + booking[1].price)).toBeInTheDocument();
//         expect(
//           screen.getByText(
//             booking[1].guestInformation.firstName +
//               " " +
//               booking[1].guestInformation.lastName
//           )
//         ).toBeInTheDocument();
//       });
//     });
//   });

//   it("user profile components rendered", async () => {
//     await waitFor(() => {
//       expect(
//         screen.getByText(userData.first_name + " " + userData.last_name)
//       ).toBeInTheDocument();
//       expect(screen.getByText(userData.email)).toBeInTheDocument();
//       expect(screen.getByText(userData.uid)).toBeInTheDocument();
//       expect(editButton()).toBeInTheDocument();
//       expect(logoutButton()).toBeInTheDocument();
//       expect(backButton()).toBeInTheDocument();
//     });
//   });
// });

// describe("UsersPage test without login", async () => {
//   beforeEach(async () => {
//     window.localStorage.clear();
//     window.localStorage.setItem("LOGIN", "false");
//     // window.localStorage.setItem("USER_ID", "EdPDTW6cmVhsBICgZNYWxHCPIDi2");

//     await waitFor(() => {
//       render(
//         <MemoryRouter>
//           <UsersPage />
//         </MemoryRouter>
//       );
//     });
//   });
//   it("warning components rendered when not login", async () => {
//     await waitFor(() => {
//       expect(screen.getByText("User Page require login")).toBeInTheDocument();
//       expect(screen.getByText("Login is required")).toBeInTheDocument();
//       expect(popupBack()).toBeInTheDocument();

//       const user = screen.queryByText(userData.email);
//       expect(user).not.toBeInTheDocument();
//     });
//   });
// });

// describe("UsersPage test with login but no booking", () => {
//   beforeEach(async () => {
//     window.localStorage.clear();
//     window.localStorage.setItem("LOGIN", "true");
//     window.localStorage.setItem("USER_ID", "SugEjPenYkQeQjNxDSZ8UCKJ9k42");

//     jest.mock("axios");
//     axios.get.mockImplementation((url) => {
//       switch (url) {
//         case "http://localhost:3001/user":
//           return Promise.resolve({ data: { data: noBookingUser } });
//         case "http://localhost:3001/getBook":
//           return Promise.resolve({ status: 404, data: "Not Found" });
//       }
//     });

//     await waitFor(() => {
//       render(
//         <MemoryRouter>
//           <UsersPage />
//         </MemoryRouter>
//       );
//     });
//   });

//   it("user has zero booking --> retrieve user profile and show no boookings popup", async () => {
//     await waitFor(() => {
//       // const login_warning = screen.queryByText("User Page require login");
//       // expect(login_warning).not.toBeVisible();

//       // const login_req = screen.queryByText("Login is required");
//       // expect(login_req).not.toBeInTheDocument();
//       const no_book_user = screen.queryByText(noBookingUser.email);
//       expect(no_book_user).toBeInTheDocument();

//       const no_book_popup = screen.queryByText(
//         /You have no bookings at this moment/i
//       );
//       expect(no_book_popup).toBeVisible();
//     });
//   });
// });
// console.log("");
