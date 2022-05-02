/// <reference types="cypress" />

describe("Study Smarter QA Challenge", () => {
  let user;

  beforeEach(() => {
    //Using fixtures to load data for the tests
    cy.fixture("userDetails").then((userDetails) => {
      user = userDetails;
    });
    // Fetching auth token for user
    cy.postToken();
  });

  it("Verify login", () => {
    cy.request({
      method: "POST",
      url: Cypress.config("baseUrl") + "/api-token-auth/",
      headers: {
        "Content-Type": "application/json",
      },

      body: { username: user.userName, password: user.password },
    }).as("userDetails");
    cy.get("@userDetails").should((response) => {
      expect(response.status).equal(200);
      expect(response.body.token).is.not.null;
    });
  });

  it("Verify study set", () => {
    //Dynamically updating token value
    var authHeader = `Token ${window.localStorage.getItem("token")}`;
    cy.request({
      method: "GET",
      url:
        Cypress.config("baseUrl") +
        "/users/" +
        window.localStorage.getItem("id") + // dynamically updating id value
        "/course-subjects/full/",
      headers: {
        Authorization: authHeader,
      },
      body: {},
    }).as("studySet");
    cy.get("@studySet").should((response) => {
      expect(response.status).equal(200);
      expect(response.body.results[0].name).to.equal("Test Study Set");
    });
  });
});
