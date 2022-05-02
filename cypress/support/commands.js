import "cypress-localstorage-commands";

Cypress.Commands.add("postToken", () => {
  cy.request({
    method: "POST",
    url: Cypress.config("baseUrl") + "/api-token-auth/",
    body: {
      username: "sneha.reddy1602@gmail.com",
      password: "$Reddy420",
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .its("body")
    .then((response) => {
      window.localStorage.setItem(
        "token",
        JSON.stringify(response.token).replaceAll('"', "") //Token is returned as a string and quotes have to stripped out
      );
      window.localStorage.setItem("id", JSON.stringify(response.id));
    });
});
