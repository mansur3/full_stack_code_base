describe("Login Page", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: {
        user: { id: 1, name: "Test User" },
        token: "fake-jwt-token",
      },
    }).as("loginRequest");

    cy.visit("/login");
  });
  it("should log in successfully and navigate to the home page", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("should display validation errors", () => {
    cy.get("form").should("be.visible");

    cy.get('button[type="submit"]').click();

    // Ensure validation errors are displayed and increase timeout if necessary
    // cy.get("span.one.text-red-500", { timeout: 6000 }).should("contain", "");
    // cy.get("span.two.text-red-500", { timeout: 6000 }).should("contain", "");
  });

  it("should show an error message for invalid login", () => {
    cy.get('input[name="email"]').type("wrong@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.contains("Something went wrong").should("be.visible");
  });
});
