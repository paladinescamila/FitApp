describe("Inicio de sesión", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5500/index.html");
	});

	it("P1: Ingreso exitoso", () => {
		cy.get("#user").type("prueba@gmail.com");
		cy.get("#password").type("12345678");
		cy.get("#login").click();
		cy.get("#sign-out").contains("Salir");
	});

	it("P2: Ingreso fallido por contraseña incorrecta", () => {
		cy.get("#user").type("prueba@gmail.com");
		cy.get("#password").type("87654321");
		cy.get("#login").click();
		cy.get("#sign-out").contains("Salir");
	});

	it("P3: Ingreso fallido por correo no registrado", () => {
		cy.get("#user").type("nuevo@gmail.com");
		cy.get("#password").type("12345678");
		cy.get("#login").click();
		cy.get("#sign-out").contains("Salir");
	});
});
