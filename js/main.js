// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

const startGameButton = document.getElementById("start-game");

startGameButton.addEventListener(
	"click",
	function () {
		const gridEl = document.getElementById("grid");
		generaGriglia(gridEl);
	}
)

/********************************************************************
 * 																	*
 * 							FUNCTIONS								*
 * 																	*
 ********************************************************************/

/**
 * genera una griglia dinamica per il gioco campominato dato l'elemento
 * in cui inserirla
 * 
 * @param {HTMLElement} grid 
 */
function generaGriglia(grid) {
	grid.innerHTML = "";
	for (let i = 0; i < 100; i++) {
		const testoCella = i + 1;
		const cellaEl = generaCella(testoCella);
		grid.append(cellaEl);
	}
}

/**
 * genera una cella dinamica per il gioco campominato e ritorna la cella
 * 
 * @param {string} testo 
 * @return {HTMLElement}
 */
function generaCella(testo) {
	const cella = document.createElement("div");
	cella.classList.add("square");
	cella.innerHTML = testo;
	cella.addEventListener(
		"click",
		function () {
			console.log(this.innerHTML);
		}
	);

	return cella;
}