describe("Cambio de contraseña", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5500/index.html");
		cy.get("#user").type("change@password.com");
		cy.get("#password").type("12345678");
		cy.get("#login").click();
		cy.get("#go-to-settings").click();
		cy.get(".settings-title").click().click().click();
	});

	it("P1: Cambio de contraseña exitoso", () => {
		cy.get("#old-pass").type("12345678");
		cy.get("#new-pass").type("12345678");
		cy.get("#new-pass-2").type("12345678");
		cy.get("#save-settings").click();
		cy.get("#settings").should("have.css", "display", "none");
	});

	it("P2: Cambio de contraseña fallido por repetición de contraseña no válida", () => {
		cy.get("#old-pass").type("12345678");
		cy.get("#new-pass").type("87654321");
		cy.get("#new-pass-2").type("hola1234");
		cy.get("#save-settings").click();
		cy.get("#settings").should("have.css", "display", "none");
	});

	it("P3: Cambio de contraseña fallido por contraseña nueva no válida", () => {
		cy.get("#old-pass").type("12345678");
		cy.get("#new-pass").type("12345");
		cy.get("#new-pass-2").type("12345");
		cy.get("#save-settings").click();
		cy.get("#settings").should("have.css", "display", "none");
	});

	it("P4: Cambio de contraseña fallido por contraseña anterior incorrecta", () => {
		cy.get("#old-pass").type("12345");
		cy.get("#new-pass").type("87654321");
		cy.get("#new-pass-2").type("87654321");
		cy.get("#save-settings").click();
		cy.get("#settings").should("have.css", "display", "none");
	});
});
