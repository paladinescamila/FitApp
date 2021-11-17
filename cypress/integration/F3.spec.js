describe("Agregación de características físicas", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5500/index.html");
		cy.contains("¡Regístrate!").click();
		cy.get("#name").type("Otro usuario");
		cy.get("#pwd").type("12345678");
	});

	it("P1: Operación exitosa con sexo == 'f'", () => {
		// Registro previo
		cy.get("#user").type("otro1@fitapp.com");
		cy.get("#signup").click();

		// Prueba
		cy.get("#weight").type("70");
		cy.get("#height").type("170");
		cy.get("#gender").select("f");
		cy.get("#birth").type("2020-11-13");
		cy.get("#save").click();
		cy.get("#sign-out").contains("Salir");
	});

	it("P2: Operación exitosa con sexo == 'm'", () => {
		// Registro previo
		cy.get("#user").type("otro2@fitapp.com");
		cy.get("#signup").click();

		// Prueba
		cy.get("#weight").type("70");
		cy.get("#height").type("170");
		cy.get("#gender").select("m");
		cy.get("#birth").type("2020-11-13");
		cy.get("#save").click();
		cy.get("#sign-out").contains("Salir");
	});

	it("P3: Operación fallida por peso menor", () => {
		// Registro previo
		cy.get("#user").type("otro3@fitapp.com");
		cy.get("#signup").click();

		// Prueba
		cy.get("#weight").type("-10");
		cy.get("#height").type("170");
		cy.get("#gender").select("f");
		cy.get("#birth").type("2020-11-13");
		cy.get("#save").click();
		cy.get("#sign-out").contains("Salir");
	});

	it("P4: Operación fallida por peso mayor", () => {
		// Registro previo
		cy.get("#user").type("otro4@fitapp.com");
		cy.get("#signup").click();

		// Prueba
		cy.get("#weight").type("1000");
		cy.get("#height").type("170");
		cy.get("#gender").select("f");
		cy.get("#birth").type("2020-11-13");
		cy.get("#save").click();
		cy.get("#sign-out").contains("Salir");
	});

	it("P5: Operación fallida por estatura menor", () => {
		// Registro previo
		cy.get("#user").type("otro5@fitapp.com");
		cy.get("#signup").click();

		// Prueba
		cy.get("#weight").type("70");
		cy.get("#height").type("15");
		cy.get("#gender").select("f");
		cy.get("#birth").type("2020-11-13");
		cy.get("#save").click();
		cy.get("#sign-out").contains("Salir");
	});

	it("P6: Operación fallida por estatura mayor", () => {
		// Registro previo
		cy.get("#user").type("otro6@fitapp.com");
		cy.get("#signup").click();

		// Prueba
		cy.get("#weight").type("70");
		cy.get("#height").type("350");
		cy.get("#gender").select("f");
		cy.get("#birth").type("2020-11-13");
		cy.get("#save").click();
		cy.get("#sign-out").contains("Salir");
	});

	it("P7: Operación fallida por fecha futura", () => {
		// Registro previo
		cy.get("#user").type("otro7@fitapp.com");
		cy.get("#signup").click();

		// Prueba
		cy.get("#weight").type("70");
		cy.get("#height").type("170");
		cy.get("#gender").select("f");
		cy.get("#birth").type("2050-11-13");
		cy.get("#save").click();
		cy.get("#sign-out").contains("Salir");
	});

	it("P8: Operación fallida por fecha con formato incorrecto", () => {
		// Registro previo
		cy.get("#user").type("otro8@fitapp.com");
		cy.get("#signup").click();

		// Prueba
		cy.get("#weight").type("70");
		cy.get("#height").type("170");
		cy.get("#gender").select("f");
		cy.get("#save").click();
		cy.get("#sign-out").contains("Salir");
	});
});
