// import { screen, render, waitFor } from "@testing-library/react";
// import React from "react";
// import { MemoryRouter, MemoryRouter as Router } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
// import CustomerInformation from "../components/CustomerInformation";
// import { act } from "react-dom/test-utils";
// import axios from "axios";
// import ViewHotel from "../components/ViewHotel";

// const imgData = [
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/0.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/1.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/2.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/3.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/4.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/5.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/6.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/7.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/8.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/9.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/10.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/11.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/12.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/13.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/14.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/15.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/16.jpg",
//   "https://d2ey9sqrvkqdfs.cloudfront.net/N9EI/17.jpg",
// ];

// const hotelData = {
//   name: "Rama Garden Hotel",
//   address: "Jl Padma",
//   rating: 3,
//   amenities: {
//     airConditioning: true,
//     dataPorts: true,
//     dryCleaning: true,
//     inHouseBar: true,
//     inHouseDining: true,
//     nonSmokingRooms: true,
//     outdoorPool: true,
//     roomService: true,
//     safe: true,
//     tVInRoom: true,
//   },
//   amenities_ratings: [],
//   description:
//     "<p><b>Property Location</b> <br />When you stay at Rama Garden Hotel in Legian, you'll be near the airport and minutes from Honorary Consulate of Brazil and Padang Padang Beach.  This spa resort is close to Kuta Beach and Carrefour Plaza Kuta.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 30 air-conditioned rooms featuring refrigerators and LED televisions. Rooms have private balconies. Satellite programming and DVD players are provided for your entertainment, while complimentary wireless Internet access keeps you connected. Private bathrooms with showers feature rainfall showerheads and complimentary toiletries.</p><p><b>Amenities</b> <br />Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. If you're looking for recreational opportunities, you'll find an outdoor pool and a spa tub. Additional amenities include complimentary wireless Internet access, shopping on site, and a television in a common area.</p><p><b>Dining</b> <br />Grab a bite to eat at the resort's restaurant, which features a bar, or stay in and take advantage of room service (during limited hours). Quench your thirst with your favorite drink at a bar/lounge. Buffet breakfasts are available daily for a fee.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include express check-in, express check-out, and complimentary newspapers in the lobby. A roundtrip airport shuttle is provided for a surcharge (available on request), and limited parking is available onsite.</p>",
//   latitude: -8.7061,
//   longitude: 115.169,
//   id: "N9EI",
// };

// // const propertyLocation = () => {
// //     return screen.getByText(//i)
// // }

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

// const hotelPrice = [
//   {
//     key: "431463CE586EB58669EA08A5A9F0A102",
//     roomDescription: null,
//     roomNormalizedDescription: "Deluxe Studio",
//     type: "TWN.DX-1",
//     free_cancellation: false,
//     roomAdditionalInfo: {
//       breakfastInfo: "hotel_detail_room_only",
//       displayFields: {
//         special_check_in_instructions: null,
//         check_in_instructions: null,
//         know_before_you_go: null,
//         fees_optional: null,
//         fees_mandatory: null,
//         kaligo_service_fee: 0,
//         hotel_fees: [],
//         surcharges: [{ type: "TaxAndServiceFee", amount: 105.96 }],
//       },
//     },
//     description: "DELUXE STUDIO",
//     images: [
//       {
//         url: "https://photos.hotelbeds.com/giata/bigger/08/081018/081018a_hb_ro_024.jpg",
//       },
//       {
//         url: "https://photos.hotelbeds.com/giata/bigger/08/081018/081018a_hb_ro_025.jpg",
//       },
//       {
//         url: "https://photos.hotelbeds.com/giata/bigger/08/081018/081018a_hb_ro_026.jpg",
//       },
//     ],
//     amenities: ["Room size (sqm)"],
//     price_type: "single",
//     max_cash_payment: 620.34,
//     coverted_max_cash_payment: 865.12,
//     points: 21625,
//     bonuses: 0,
//     lowest_price: 620.34,
//     price: 865.12,
//     converted_price: 865.12,
//     lowest_converted_price: 865.12,
//     chargeableRate: 620.34,
//     market_rates: [{ supplier: "expedia", rate: 758.711546712 }],
//   },
// ];

// const topViewRoomButton = () => {
//   return screen.getByRole("button", {
//     name: /view room options/i,
//   });
// };

// const bookRoomButton = () => {
//   return screen.getByRole("button", {
//     name: /book your room/i,
//   });
// };

// const popupBack = () => {
//   return screen.getByRole("button", {
//     name: /back/i,
//   });
// };

// const viewRoom = () => {
//   return screen.getByRole("button", {
//     name: /view rooms/i,
//   });
// };
// describe("view hotel rendered successfully", () => {
//   //   console.log(totalPrice);
//   beforeEach(async () => {
//     jest.mock("axios");
//     axios.get.mockImplementation((url) => {
//       switch (url) {
//         case "http://localhost:3001/viewhotel":
//           return Promise.resolve({
//             data: {
//               data: JSON.stringify(hotelData),
//               iurl: JSON.stringify(imgData),
//             },
//           });
//         case "http://localhost:3001/hotelidprices":
//           return Promise.resolve({
//             data: {
//               rooms: hotelPrice,
//             },
//           });
//       }
//     });

//     window.localStorage.clear();
//     window.localStorage.setItem("SEARCH_DATA", JSON.stringify(searchData));
//     window.localStorage.setItem("HOTEL_ID", "N9EI");
//     window.localStorage.setItem("LOGIN", false);

//     window.localStorage.setItem(
//       "HOTEL_LOC",
//       JSON.stringify({
//         latitude: -8.7061,
//         longitude: 115.169,
//       })
//     );
//     expect(localStorage.getItem("SEARCH_DATA")).toEqual(
//       JSON.stringify(searchData)
//     );
//     expect(localStorage.getItem("HOTEL_ID", "N9EI"));

//     await waitFor(() => {
//       render(
//         <MemoryRouter>
//           <ViewHotel />
//         </MemoryRouter>
//       );
//     });
//   });

//   it("test render component", async () => {
//     await waitFor(() => {
//       expect(screen.getByText(hotelData.name)).toBeInTheDocument();
//       expect(screen.getByText(hotelData.address)).toBeInTheDocument();
//       expect(
//         screen.getByText(
//           "Select a room starting from $" + hotelPrice[0].lowest_converted_price
//         )
//       ).toBeInTheDocument();
//       expect(screen.getByText(/hotel overview/i)).toBeInTheDocument();
//       expect(topViewRoomButton()).toBeInTheDocument();
//       expect(viewRoom()).toBeInTheDocument();
//     });
//   });

//   it("show warning when press book button without login", async () => {
//     await userEvent.click(viewRoom());
//     await waitFor(() => {
//       userEvent.click(bookRoomButton());
//       const login_warning = screen.queryByText(
//         "Login is required to book hotel"
//       );
//       expect(login_warning).toBeVisible();
//       const login_req = screen.queryByText("Login is required");
//       expect(login_req).toBeInTheDocument();
//       expect(popupBack()).toBeInTheDocument();
//     });
//   });
// });

// describe("show warning when press book button without login", () => {
//   //   console.log(totalPrice);
//   beforeEach(async () => {
//     jest.mock("axios");
//     axios.get.mockImplementation((url) => {
//       switch (url) {
//         case "http://localhost:3001/viewhotel":
//           return Promise.resolve({
//             data: {
//               data: JSON.stringify(hotelData),
//               iurl: JSON.stringify(imgData),
//             },
//           });
//         case "http://localhost:3001/hotelidprices":
//           return Promise.resolve({
//             data: {
//               rooms: hotelPrice,
//             },
//           });
//       }
//     });

//     window.localStorage.clear();
//     window.localStorage.setItem("SEARCH_DATA", JSON.stringify(searchData));
//     window.localStorage.setItem("HOTEL_ID", "N9EI");
//     window.localStorage.setItem("LOGIN", true);

//     window.localStorage.setItem(
//       "HOTEL_LOC",
//       JSON.stringify({
//         latitude: -8.7061,
//         longitude: 115.169,
//       })
//     );

//     await waitFor(() => {
//       render(
//         <MemoryRouter>
//           <ViewHotel />
//         </MemoryRouter>
//       );
//     });
//   });

//   it("book room with login no warning show up", async () => {
//     await userEvent.click(viewRoom());
//     await waitFor(() => {
//       userEvent.click(bookRoomButton());
//       const login_warning = screen.queryByText(
//         "Login is required to book hotel"
//       );
//       expect(login_warning).not.toBeInTheDocument();
//       const login_req = screen.queryByText("Login is required");
//       expect(login_req).not.toBeInTheDocument();
//     });
//   });

//   it("book room with login go to next page", async () => {
//     await userEvent.click(viewRoom());
//     await waitFor(() => {
//       userEvent.click(bookRoomButton());
//       const login_warning = screen.queryByText(
//         "Login is required to book hotel"
//       );
//       expect(login_warning).not.toBeInTheDocument();
//       const login_req = screen.queryByText("Login is required");
//       expect(login_req).not.toBeInTheDocument();
//     });
//   });

//   it("book room with login go to next page", async () => {
//     await userEvent.click(viewRoom());
//     await waitFor(() => {
//       userEvent.click(bookRoomButton());
//     });
//     expect(screen.findByTestId("customer-info-page")).toBeTruthy();
//   });
// });
