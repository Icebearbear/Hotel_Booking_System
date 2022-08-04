import { screen, render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, MemoryRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CustomerInformation from "../components/CustomerInformation";
import { act } from "react-dom/test-utils";
import axios from "axios";
import ViewHotel from "../components/ViewHotel";
import SearchHotelResult from "../components/SearchHotelResult";

const searchData = {
  adults: "2",
  checkin: "2022-08-04T05:04:42.186Z",
  checkout: "2022-08-10T16:00:00.000Z",
  childs: "0",
  currency: "SGD",
  destination_id: "WP3Z",
  guests: 2,
  lang: "en_US",
  partner_id: "1",
  rooms: "1",
};

describe("search hotel resutl rendered successfully", () => {
  beforeEach(async () => {
    jest.mock("axios");
    // axios.get.mockImplementation((url) => {
    //   switch (url) {
    //     case "http://localhost:3001/hotelnprices":
    //       return Promise.resolve({
    //         data: {
    //           data: JSON.stringify(hotelData),
    //           iurl: JSON.stringify(imgData),
    //         },
    //       });
    //   }
    // });

    window.localStorage.clear();
    window.localStorage.setItem("SEARCH_DATA", JSON.stringify(searchData));
    window.localStorage.setItem("HOTEL_ID", "N9EI");
    window.localStorage.setItem("LOGIN", false);

    window.localStorage.setItem(
      "HOTEL_LOC",
      JSON.stringify({
        latitude: -8.7061,
        longitude: 115.169,
      })
    );
    expect(localStorage.getItem("SEARCH_DATA")).toEqual(
      JSON.stringify(searchData)
    );
    expect(localStorage.getItem("HOTEL_ID", "N9EI"));

    // await waitFor(() => {
    render(
      <MemoryRouter>
        <SearchHotelResult />
      </MemoryRouter>
    );
    // });
  });

  it("teste", async () => {
    // await waitFor(() => {
    //   expect(screen.getByText(/login\/register/i)).toBeInTheDocument();
    // });
  });
});
