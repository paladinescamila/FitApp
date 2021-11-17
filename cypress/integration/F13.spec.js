describe("Agregación de nuevo peso", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5500/index.html");
		cy.get("#user").type("w@w.com");
		cy.get("#password").type("12345678");
		cy.get("#login").click();
		cy.get("#go-to-add-weight").click();
		cy.get(".add-weight-title").click().click().click();
	});

	it("P1: Operación exitosa", () => {
		cy.get("#date").clear().type("2020-11-14");
		cy.get("#weight").clear().type("60");
		cy.get("#save-weight").click();
		cy.get("#add-weight").should("have.css", "display", "none");
	});

	it("P2: Operación fallida por fecha futura", () => {
		cy.get("#date").clear().type("2050-11-14");
		cy.get("#weight").clear().type("60");
		cy.get("#save-weight").click();
		cy.on("window:alert", (text) => {
			expect(text).to.contains("Ingrese una fecha válida.");
		});
	});

	it("P3: Operación fallida por fecha en formato incorrecto", () => {
		cy.get("#date").clear();
		cy.get("#weight").clear().type("60");
		cy.get("#save-weight").click();
		cy.on("window:alert", (text) => {
			expect(text).to.contains("Ingrese una fecha válida.");
		});
	});

	it("P4: Operación fallida por peso menor", () => {
		cy.get("#date").clear().type("2020-11-14");
		cy.get("#weight").clear().type("0");
		cy.get("#save-weight").click();
		cy.on("window:alert", (text) => {
			expect(text).to.contains("Inserte un peso entre 25 y 600.");
		});
	});

	it("P5: Operación fallida por peso mayor", () => {
		cy.get("#date").clear().type("2020-11-14");
		cy.get("#weight").clear().type("730");
		cy.get("#save-weight").click();
		cy.on("window:alert", (text) => {
			expect(text).to.contains("Inserte un peso entre 25 y 600.");
		});
	});
});
