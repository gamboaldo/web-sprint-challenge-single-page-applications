describe("Lambda Eats App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  });

  const nameInput = () => cy.get('input[name="name"]');
  const sizeInput = () => cy.get('select[name="size"]');
  const pepperoniBox = () => cy.get('input[name="pepperoni"]');
  const baconBox = () => cy.get('input[name="bacon"]');
  const submitButton = () => cy.get("button");

  //  test that you can add text to the box
  it("can input a name", () => {
    nameInput()
      .should("have.value", "")
      .type("Daniel")
      .should("have.value", "Daniel");
  });

  //  test that you can select multiple toppings
  it("can select multiple toppings", () => {
    pepperoniBox().check().should("be.checked");
    baconBox().check().should("be.checked");
  });

  //  test that you can submit the form
  it("can submit the form once valid", () => {
    nameInput().type("Daniel");
    sizeInput().select("Medium");
    baconBox().check();
    submitButton().should("not.be.disabled");
    submitButton().click();
    cy.contains("Thank you").should("exist");
  });
});
