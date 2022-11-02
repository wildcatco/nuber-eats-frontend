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

  it("can fill out the form and login", () => {
    cy.login("c1@mail.com", "1111");
  });
});
