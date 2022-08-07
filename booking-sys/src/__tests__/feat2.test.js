// import { screen, render, waitFor } from "@testing-library/react";
// import React from "react";
// import { MemoryRouter, MemoryRouter as Router } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
// import CustomerInformation from "../components/CustomerInformation";
// import { act } from "react-dom/test-utils";
// import axios from "axios";
// import ViewHotel from "../components/ViewHotel";
// import SearchHotelResult from "../components/SearchHotelResult";

// const searchData = {
//   adults: "2",
//   checkin: "2022-08-04T05:04:42.186Z",
//   checkout: "2022-08-10T16:00:00.000Z",
//   childs: "0",
//   currency: "SGD",
//   destination_id: "WP3Z",
//   guests: 2,
//   lang: "en_US",
//   partner_id: "1",
//   rooms: "1",
// };

// const hotelData = {
//   id: "C6d8",
//   searchRank: 0.94,
//   price_type: "multi",
//   max_cash_payment: 429.37,
//   coverted_max_cash_payment: 597.04,
//   points: 14925,
//   bonuses: 0,
//   lowest_price: 429.37,
//   price: 597.04,
//   converted_price: 597.04,
//   lowest_converted_price: 597.04,
//   market_rates: [[Object]],
//   imageCount: 20,
//   latitude: -8.511679,
//   longitude: 115.261574,
//   name: "Yulia Village Inn",
//   address: "Monkey Forest Road",
//   address1: "Monkey Forest Road",
//   rating: 3,
//   distance: 12783.430021459888,
//   trustyou: { id: "65c3f922-ffa7-4b0a-aa8f-0cd067bc98fe", score: [Object] },
//   categories: { overall: [Object] },
//   amenities_ratings: [[Object], [Object], [Object], [Object], [Object]],
//   description:
//     "<p><b>Property Location</b> <br />With a stay at Yulia Village Inn in Ubud, you'll be minutes from Komaneka Fine Art Gallery and Ubud Market.  This hotel is within close proximity of Ubud Royal Palace and Pura Taman Saraswati.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 19 air-conditioned rooms featuring minibars and DVD players. Rooms have private balconies or patios. Complimentary wireless Internet access keeps you connected, and cable programming is available for your entertainment. Private bathrooms have complimentary toiletries and hair dryers.</p><p><b>Amenities</b> <br />Enjoy recreation amenities such as an outdoor pool or take in the view from a garden. Additional amenities include complimentary wireless Internet access, wedding services, and tour/ticket assistance. Guests can catch a ride to nearby destinations on the area shuttle (surcharge).</p><p><b>Dining</b> <br />Enjoy a meal at a restaurant, or stay in and take advantage of the hotel's room service (during limited hours).</p><p><b>Business, Other Amenities</b> <br />Featured amenities include a business center, dry cleaning/laundry services, and a 24-hour front desk. Free self parking is available onsite.</p>",
//   amenities: {
//     businessCenter: true,
//     carRentDesk: true,
//     handicapAccessible: true,
//     outdoorPool: true,
//     parkingGarage: true,
//     roomService: true,
//   },
//   original_metadata: { name: null, city: "Ubud", state: null, country: "ID" },
//   image_details: {
//     suffix: ".jpg",
//     count: 20,
//     prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/C6d8/",
//   },
//   hires_image_index: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19",
//   number_of_images: 29,
//   default_image_index: 1,
//   imgix_url: "https://kaligo-web-expedia.imgix.net",
//   cloudflare_image_url: "https://www.kaligo-staging.xyz/images/new",
// };

// const selectButton = () => {
//   return screen.getByRole("button", {
//     name: /select hotel/i,
//   });
// };
// describe("search hotel resutl rendered successfully", () => {
//   beforeEach(async () => {
//     jest.mock("axios");
//     axios.get.mockImplementation((url) => {
//       switch (url) {
//         case "http://localhost:3001/hotelnprices":
//           return Promise.resolve({
//             data: {
//               finalData: JSON.stringify(hotelData),
//               nulls: JSON.stringify([]),
//               dataLen: 1,
//             },
//           });
//       }
//     });

//     window.localStorage.clear();
//     window.localStorage.setItem("SEARCH_DATA", JSON.stringify(searchData));
//     window.localStorage.setItem("LOGIN", false);
//     await waitFor(() => {
//       render(
//         <MemoryRouter>
//           <SearchHotelResult />
//         </MemoryRouter>
//       );
//     });
//   });

//   it("teste", async () => {
//     await waitFor(() => {
//       expect(screen.getByText(hotelData.name)).toBeInTheDocument();
//       expect(
//         screen.getByText(hotelData.lowest_converted_price)
//       ).toBeInTheDocument();
//       expect(
//         screen.getByText("Address : " + hotelData.address)
//       ).toBeInTheDocument();
//       expect(selectButton()).toBeInTheDocument();
//     });
//   });

//   // it("select hotel will bring to next page to view hotel", async () => {
//   //   await waitFor(() => {
//   //     userEvent.click(selectButton());
//   //     expect(screen.getByTestId("view-hotel-page")).toBeTruthy();
//   //   });
//   // });
// });
