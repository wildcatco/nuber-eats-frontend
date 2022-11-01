describe("Log In", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | Nuber Eats");
  });

  it("can see email / password validation error", () => {
    cy.visit("/");
    cy.findByPlaceholderText("Email").type("bad@email");
    cy.findByRole("alert").should("have.text", "Please enter a valid email");
    cy.findByPlaceholderText("Email").clear();
    cy.findByRole("alert").should("have.text", "Email is required");
    cy.findByPlaceholderText("Email").type("bad@email.com");
    cy.findByPlaceholderText("Password").type("test").clear();
    cy.findByRole("alert").should("have.text", "Password is required");
  });

  it("can fill out the form", () => {
    cy.visit("/");
    cy.findByPlaceholderText("Email").type("c1@mail.com");
    cy.findByPlaceholderText("Password").type("1111");
    cy.findByRole("button").should("not.be.disabled").click();
    cy.window().its("localStorage.nuber-token").should("be.a", "string");
  });
});
