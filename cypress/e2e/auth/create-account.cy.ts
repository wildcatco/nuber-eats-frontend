describe("Create Account", () => {
  it("should see email / password validation errors", () => {
    cy.visit("/");
    cy.findByText("Create an Account").click();
    cy.findByPlaceholderText(/email/i).type("bad@email");
    cy.findByRole("alert").should("have.text", "Please enter a valid email");
    cy.findAllByPlaceholderText(/email/i).clear();
    cy.findByRole("alert").should("have.text", "Email is required");

    cy.findByPlaceholderText(/email/i).type("test@mail.com");
    cy.findByPlaceholderText(/password/i)
      .type("test")
      .clear();
    cy.findByRole("alert").should("have.text", "Password is required");
  });

  it("should be able to create account and login", () => {
    cy.intercept("http://localhost:4000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === "createAccount") {
        req.reply((res) => {
          res.send({
            data: {
              createAccount: {
                ok: true,
                error: null,
                __typename: "CreateAccountOutput",
              },
            },
          });
        });
      }
    });

    cy.visit("/create-account");

    cy.findByPlaceholderText(/email/i).type("c1@mail.com");
    cy.findByPlaceholderText(/password/i).type("1111");
    cy.findByRole("button", { name: /create account/i }).click();

    cy.wait(1000);

    cy.login("c1@mail.com", "1111");
  });
});
