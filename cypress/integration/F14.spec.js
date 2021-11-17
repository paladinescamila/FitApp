describe("Actualización de configuraciones", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5500/index.html");
		cy.get("#user").type("w@w.com");
		cy.get("#password").type("12345678");
		cy.get("#login").click();
		cy.get("#go-to-settings").click();
		cy.get(".settings-title").click().click().click();
		cy.get("#name").clear();
	});

	it("P1: Operación exitosa con sexo == 'f'", () => {
		cy.get("#name").clear().type("Juan");
		cy.get("#birth").clear().type("2020-07-20");
		cy.get("#sex").select("f");
		cy.get("#height").clear().type("162");
		cy.get("#save-settings").click();
		cy.get("#settings").should("have.css", "display", "none");
	});

	it("P2: Operación exitosa con sexo == 'm'", () => {
		cy.get("#name").clear().type("Juan");
		cy.get("#birth").clear().type("2020-07-20");
		cy.get("#sex").select("m");
		cy.get("#height").clear().type("162");
		cy.get("#save-settings").click();
		cy.get("#settings").should("have.css", "display", "none");
	});

	it("P3: Operación fallida por nombre inválido", () => {
		cy.get("#name").clear();
		cy.get("#birth").clear().type("2020-07-20");
		cy.get("#sex").select("f");
		cy.get("#height").clear().type("162");
		cy.get("#save-settings").click();
		cy.on("window:alert", (text) => {
			expect(text).to.contains("Inserte un nombre válido.");
		});
	});

	it("P4: Operación fallida por fecha futura", () => {
		cy.get("#name").clear().type("Juan");
		cy.get("#birth").clear().type("2050-07-20");
		cy.get("#sex").select("f");
		cy.get("#height").clear().type("162");
		cy.get("#save-settings").click();
		cy.on("window:alert", (text) => {
			expect(text).to.contains("Inserte una fecha válida.");
		});
	});

	it("P5: Operación fallida por fecha informato incorrecto", () => {
		cy.get("#name").clear().type("Juan");
		cy.get("#birth").clear();
		cy.get("#sex").select("f");
		cy.get("#height").clear().type("162");
		cy.get("#save-settings").click();
		cy.on("window:alert", (text) => {
			expect(text).to.contains("Inserte una fecha válida.");
		});
	});

	it("P6: Operación fallida por estatura menor", () => {
		cy.get("#name").clear().type("Juan");
		cy.get("#birth").clear().type("2020-07-20");
		cy.get("#sex").select("f");
		cy.get("#height").clear().type("-30");
		cy.get("#save-settings").click();
		cy.on("window:alert", (text) => {
			expect(text).to.contains("Inserte una estatura válida.");
		});
	});

	it("P7: Operación fallida por estatura mayor", () => {
		cy.get("#name").clear().type("Juan");
		cy.get("#birth").clear().type("2020-07-20");
		cy.get("#sex").select("f");
		cy.get("#height").clear().type("5000");
		cy.get("#save-settings").click();
		cy.on("window:alert", (text) => {
			expect(text).to.contains("Inserte una estatura entre 100 y 300.");
		});
	});
});
