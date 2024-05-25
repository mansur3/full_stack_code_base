describe("Signup Page", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/signup", (req) => {
      const { email } = req.body;
      if (email === "test@example.com") {
        req.reply({
          statusCode: 201,
          body: {
            user: { id: 1, name: "Test User" },
            token: "fake-jwt-token",
          },
        });
      } else {
        req.reply({
          statusCode: 400,
          body: {
            message: "Signup failed",
          },
        });
      }
    }).as("signupRequest");

    cy.visit("/signup");
  });

  it("should display validation errors when required fields are empty", () => {
    cy.get('button[type="submit"]').click();

    cy.get("span.text-red-500").should("contain", "Required");
  });

  it("should sign up successfully and navigate to the home page", () => {
    cy.get('input[name="first-name"]').type("Test");
    cy.get('input[name="last-name"]').type("User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('select[name="country"]').select("CA");
    cy.get('input[name="phone-number"]').type("123456789");
    cy.get('input[name="password"]').type("password123");
    cy.get(".flex.h-6.items-center .cursor-pointer").click(); // Switch for agreement

    cy.get('button[type="submit"]').click();

    cy.wait("@signupRequest").its("response.statusCode").should("eq", 201);
    cy.get(".swal2-confirm").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("should show an error message for a failed signup attempt", () => {
    cy.get('input[name="first-name"]').type("Test");
    cy.get('input[name="last-name"]').type("User");
    cy.get('input[name="email"]').type("wrong2@example.com");
    cy.get('select[name="country"]').select("CA");
    cy.get('input[name="phone-number"]').type("1234567890");
    cy.get('input[name="password"]').type("password");
    cy.get(".flex.h-6.items-center .cursor-pointer").click(); // Switch for agreement

    cy.get('button[type="submit"]').click();

    cy.wait("@signupRequest").its("response.statusCode").should("eq", 400);
    cy.contains("Something went wrong").should("be.visible");
  });
});
