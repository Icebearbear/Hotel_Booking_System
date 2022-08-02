import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter, MemoryRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";
import CustomerInformation from "../components/CustomerInformation";
import BookingHistory from "../components/BookingHistory";

const bookingData = [
  [
    "mBl3JLAEWVbfaxrOxX8D",
    {
      bookingInfo: {
        airportTransfer: false,
        babyCotReq: false,
        bedType: "large",
        bookForSomeone: false,
        endDate: "2022-08-03",
        extraReq: "staycay",
        highFloor: true,
        message: "booking for birthday celebration",
        noAdult: "2",
        noChildren: "0",
        noNight: 2,
        quiteRoom: true,
        roomType: "Superior Room",
        smoking: false,
        startDate: "2022-07-26",
      },
      guestInformation: {
        country: "sg",
        email: "yuliatiyuli39@gmail.com",
        firstName: "yu",
        lastName: "li",
        phone: "12345",
        salutation: "Ms",
        userID: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
      },
      hotelID: "y6jp",
      hotelName: "Puri Asri Villa",
      price: 796,
      uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
    },
  ],
  [
    "oDHnh4TdurM5sWYlKnCC",
    {
      bookingInfo: {
        airportTransfer: false,
        babyCotReq: true,
        bedType: "large",
        bookForSomeone: false,
        endDate: "2022-08-04",
        extraReq: "",
        highFloor: false,
        message: "booking for birthday celebration",
        noAdult: "2",
        noChildren: "0",
        noNight: 2,
        quiteRoom: false,
        roomType: "VILLA ONE BEDROOM",
        smoking: false,
        startDate: "2022-07-27",
      },
      hotelID: "GchA",
      hotelName: "Bumi Ubud Resort",
      uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
      guestInformation: {
        country: "sg",
        email: "a@gmail.com",
        firstName: "asd",
        lastName: "asd",
        phone: "12343456",
        salutation: "Ms",
        userID: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
      },
      price: 834,
    },
  ],
];

describe("app", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <BookingHistory />
      </MemoryRouter>
    );
  });
  //   it("components rendered", async () => {
  // await waitFor(() => {
  //   bookingData.forEach((booking) => {
  //     expect(screen.getByText(booking[1].hotelName)).toBeInTheDocument();
  //     expect(
  //       screen.getByText(booking[1].bookingInfo.roomType)
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText(
  //         booking[1].bookingInfo.startDate +
  //           " until " +
  //           booking[1].bookingInfo.endDate
  //       )
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText("SGD " + booking[1].bookingInfo.price)
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText(
  //         booking[1].guestInformation.firstName +
  //           " " +
  //           booking[1].guestInformation.lastName
  //       )
  //     ).toBeInTheDocument();
  //   });
  // });
  //   });
});
