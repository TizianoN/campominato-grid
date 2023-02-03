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


// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
//  (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).

// GENERAZIONE BOMBE
// Il computer deve generare 16 numeri casuali
// nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba
// perciò nell'array delle bombe non potranno esserci due numeri uguali.

// CLICK SU CELLA
// In seguito l'utente clicca su una cella: 
// se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

// TERMINARE LA PARTITA
// La partita termina quando il giocatore clicca su una bomba 
// o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, 
// cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.

// SUPERBONUS 1
// Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
// SUPERBONUS 2
// Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.

const startGameButton = document.getElementById("start-game");
let isGameOver = false;
let bombe;

startGameButton.addEventListener(
	"click",
	startGame
)

/********************************************************************
 * 																	*
 * 							FUNCTIONS								*
 * 																	*
 ********************************************************************/

/**
 * funzione che lancia il gioco
 * 
 */
function startGame() {
	const difficultyEl = document.getElementById("difficulty");
	const gridEl = document.getElementById("grid");

	isGameOver = false;

	generaGriglia(gridEl, difficultyEl.value);
}

/**
 * genera una griglia dinamica per il gioco campominato dato l'elemento
 * in cui inserirla
 * 
 * @param {HTMLElement} grid 
 */
function generaGriglia(grid, difficolta) {
	grid.innerHTML = "";

	let squareNumber = 49

	if (difficolta == 1) {
		squareNumber = 100;
	} else if (difficolta == 2) {
		squareNumber = 81;
	}

	bombe = generaBombe(1, squareNumber);
	console.log(bombe)

	for (let i = 0; i < squareNumber; i++) {
		const testoCella = i + 1;
		const cellaEl = generaCella(testoCella, difficolta, squareNumber);
		grid.append(cellaEl);
	}
}

/**
 * genera una cella dinamica per il gioco campominato e ritorna la cella
 * 
 * @param {string} testo 
 * @return {HTMLElement}
 */
function generaCella(testo, difficolta, squareNumber) {
	const cella = document.createElement("div");
	cella.classList.add("square");

	if (difficolta == 2) {
		cella.classList.add("medium-square");
	} else if (difficolta == 3) {
		cella.classList.add("big-square");
	}

	cella.innerHTML = testo;
	cella.setAttribute("data-index", testo);

	cella.addEventListener(
		"click",
		function () {

			if (!isGameOver) {
				// PRENDO L'INDICE DELLA CELLA CORRENTE
				const cellIndex = parseInt(this.getAttribute("data-index"));

				// PRENDO TUTTE LE CELLE CLICCATE
				const activeSquares = document.querySelectorAll(".square.active");

				// SE LA CELLA CLICCATA è UNA BOMBA
				if (bombe.includes(cellIndex)) {

					// DO LA CLASSE BOMBA E TERMINO IL GIOCO
					this.classList.add("bomb");
					gameOver(activeSquares, false);
				} else {

					// ALTRIMENTI DO LA CLASSE ACTIVE
					this.classList.add("active");
				}

				// SE ERA L'ULTIMA CELLA CLICCABILE
				console.log(activeSquares.length);
				console.log(squareNumber - bombe.length);

				if (activeSquares.length == squareNumber - bombe.length - 1) {
					gameOver(activeSquares, true);
				}
			}
		}
	);

	return cella;
}

/**
 * genera un array casuale di 16 "bombe" (interi) in un range prescelto
 * 
 * @param {int} min 
 * @param {max} max 
 * @return {int[]}
 */
function generaBombe(min, max) {
	const arrayBombe = [];

	while (arrayBombe.length < 16) {
		const randomNumber = Math.floor(Math.random() * max - min + 1) + min;

		if (!arrayBombe.includes(randomNumber)) {
			arrayBombe.push(randomNumber);
		}
	}

	return arrayBombe;
}

/**
 * funzione che termina il gioco
 * 
 * @param {HTMLElement[]} activeSquares 
 * @param {boolean} userWon 
 */
function gameOver(activeSquares, userWon) {
	isGameOver = true;

	console.log(activeSquares);
	if (userWon) {
		alert("Congratulazione, hai vinto!\nHai totalizzato " + activeSquares.length + " punti.");
	} else {
		alert("Peccato, hai perso!\nHai totalizzato " + activeSquares.length + " punti.");
	}

	const squares = document.querySelectorAll(".square");

	for (const square of squares) {
		const squareIndex = parseInt(square.getAttribute("data-index"));
		if (bombe.includes(squareIndex)) {
			square.classList.add("bomb");
		}
	}
}












// ...