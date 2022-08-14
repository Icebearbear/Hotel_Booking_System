import fuzzur from "fuzzur";

describe("User input search check navigation", () => {
  // fuzz input
  const list = [];
  for (let i = 0; i < 5; i++) {
    list.push(
      fuzzur.mutate("Rome, Italy", {
        string: {
          sampleSet:
          "abcdefghijklmnopqrstuvwxyz0123456789,./<>?;':\"\\[]|_+-=!@#$%^&*()`~", // The set of chars from which the mutated strings are built, can be overriden with custom sets
          randomisationPasses: 1, // The maximum number of randomisation passes that are done on each string, a random number between 1 and this
        },
      })
    );
  }

  beforeEach(() => {
    cy.viewport(1280, 720);
    // arrange

    cy.visit("http://localhost:3000/");
    cy.wait(1000);
  });

  it("fuzz search and checks if option is there", () => {
    cy.wrap(list).each((perm) => {
      cy.get('[data-cy = "search destination"]').type(perm).wait(700);
      cy.get('[data-cy = "destination"]').should("exist");
      cy.get('[data-cy = "search destination"]')
        .type("{selectAll}{backspace}")
        .wait(700);
    });
  });
});

describe("User input search check navigation", () => {
  const uid = "testuid";
  const dudData = {
    destination_id: "RsBU",
    hotelId: "eqUd",
    hotelName: "Grand Copthorne Waterfront",
    roomType: "Beautiful Balcony",
    noOfRooms: 3,
    noOfAdults: 3,
    noOfChildren: 1,
    checkIn: "2022-08-28",
    checkOut: "2022-09-01",
    roomRate: "150",
    surcharges: "20",
  };


  // fuzz input
  // const list = [];
  // for (let i = 0; i < 3; i++) {
  //   list.push(
  //     fuzzur.mutate("Rome, Italy", {
  //       string: {
  //         sampleSet:
  //           "abcdefghijklmnopqrstuvwxyz0123456789,./<>?;':\"\\[]|_+-=!@#$%^&*()`~", // The set of chars from which the mutated strings are built, can be overriden with custom sets
  //         randomisationPasses: 1, // The maximum number of randomisation passes that are done on each string, a random number between 1 and this
  //       },
  //     })
  //   );
  // }

  beforeEach(() => {
    cy.viewport(1280, 720);
    localStorage.setItem("USER_ID", uid);
    localStorage.setItem("BOOKING_DATA", JSON.stringify(dudData));
    cy.visit("http://localhost:3000/custinfo");
    cy.wait(1000);
  });

  it("fuzz search and checks if option is there", () => {
    // cy.wrap(list).each((perm) => {
    //   cy.get('[data-cy = "search destination"]').type(perm).wait(700);
    //   cy.get('[data-cy = "destination"]').should("exist");
    //   cy.get('[data-cy = "search destination"]')
    //     .type("{selectAll}{backspace}")
    //     .wait(700);
    // });

    for (let i = 0; i < 2; i++) {
      cy.get("input#formBasicEmail.form-control")
        .eq(i)
        .type(fuzzur.mutate("jonathan", {
          string: {
            sampleSet:
              "abcdefghijklmnopqrstuvwxyz0123456789,./<>?;':\"\\[]|_+-=!@#$%^&*()`~", // The set of chars from which the mutated strings are built, can be overriden with custom sets
            randomisationPasses: 1, // The maximum number of randomisation passes that are done on each string, a random number between 1 and this
          },
        }))
    }
    cy.get("input#formBasicEmail.form-control").eq(2).type("jwatson@gmail.com");
    cy.get("#formBasicCountry").type("England");

    cy.get("#formBasicPhone").type(
      fuzzur.mutate("123456", {
      number: {
        integer: {
          min: 10000000, // The floor or numbers to generate from
          max: 99999999 // The ceiling of features to generate too
        }
      }
    }));

    const billingAddresses = [{type: "sdf", address:"SDF airport (SDF), Terminal Drive, Louisville, KY, USA", city: "Louisville", zip: 40209, country: "US"}, 
                              {type: "wer", address:"Werchter, Rotselaar, Belgium", city: "Rotselaar", zip: "3118", country: "BE"}]
    for (let i = 0; i < 2; i++) {
      cy.contains('Select...').click().type(billingAddresses[i].type)
      cy.contains(billingAddresses[i].address).should("be.visible");
      cy.contains(billingAddresses[i].address).click();
      cy.get('[controlId = "billingAddressCity"]').scrollIntoView()
      .should("have.value", billingAddresses[i].city);
      cy.get('[controlId = "billingAddressZip"]').scrollIntoView()
      .should("have.value", billingAddresses[i].zip);
      cy.get('[controlId = "billingAddressCountry"]').scrollIntoView()
      .should("have.value", billingAddresses[i].country);
      if(i==0)
      {cy.get('svg').eq(0).click();}
    }

    cy.contains("Proceed to checkout").scrollIntoView().click({ force: true });
    cy.request("https://checkout.stripe.com/").its("status").should("eq", 200);
  });
});
