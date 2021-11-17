describe("Registro de usuario", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5500/index.html");
		cy.contains("¡Regístrate!").click();
	});

	it("P1: Registro exitoso", () => {
		cy.get("#name").type("Tomy");
		cy.get("#user").type("tomy@fitapp.com");
		cy.get("#pwd").type("12345678");
		cy.get("#signup").click();
		cy.get("#save").contains("Guardar");
	});

	it("P2: Registro fallido por contraseña no válida", () => {
		cy.get("#name").type("Tomy");
		cy.get("#user").type("tomy@fitapp.com");
		cy.get("#pwd").type("123");
		cy.get("#signup").click();
		cy.get("#save").contains("Guardar");
	});

	it("P3: Registro fallido por correo no válido", () => {
		cy.get("#name").type("Tomy");
		cy.get("#user").type("hola");
		cy.get("#pwd").type("12345678");
		cy.get("#signup").click();
		cy.get("#save").contains("Guardar");
	});

	it("P4: Registro fallido por nombre no válido", () => {
		cy.get("#user").type("tomy@gmail.com");
		cy.get("#pwd").type("12345678");
		cy.get("#signup").click();
		cy.get("#save").contains("Guardar");
	});
});
