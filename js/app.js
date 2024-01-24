const gameBoard = document.querySelector("#gameBoard");
const player = document.querySelector("#player");
const info = document.querySelector("#infoDisplay");
const dimention = 8;
let playerGo = "black";
player.textContent = "black";
const createBoard = () => {
	startPieces.forEach((startPiece, i) => {
		const square = document.createElement("div");
		square.classList.add("square");
		square.innerHTML = startPiece;
		square.firstChild?.setAttribute("draggable", true);
		square.setAttribute("sqare-id", i);
		const row = Math.floor((63 - i) / 8) + 1;
		if (row % 2 === 0) {
			square.classList.add(i % 2 === 0 ? "beige" : "brown");
		} else {
			square.classList.add(i % 2 === 0 ? "brown" : "beige");
		}
		if (i <= 15) {
			square.firstChild.firstChild.classList.add("blackPieces");
		}
		if (i >= 48) {
			square.firstChild.firstChild.classList.add("whitePieces");
		}
		gameBoard.append(square);
	});
};

createBoard();

const allSquares = document.querySelectorAll(".square");
allSquares.forEach((square) => {
	square.addEventListener("dragstart", dragStart);
	square.addEventListener("dragover", dragOver);
	square.addEventListener("drop", dragDrop);
});

let startPostionId;
let draggedElement;

function dragStart(e) {
	draggedElement = e.target;
	startPostionId = e.target.parentNode.getAttribute("square-id");
}

function dragOver(e) {
	e.preventDefault();
}

function dragDrop(e) {
	e.stopPropagation();
	const taken = e.target.classList.contains("piece");
	e.target.append(draggedElement);
	changePlayer();
}

function changePlayer() {
	if (playerGo === "black") {
		reverseIds();
		playerGo = "white";
		player.textContent = "white";
	} else {
		revertIds();
		playerGo = "black";
		player.textContent = "black";
	}
}

function reverseIds() {
	const allSquares = document.querySelectorAll(".square");
	allSquares.forEach((square, i) => {
		square.setAttribute("square-id", dimention * dimention - 1 - i);
	});
}

function revertIds() {
	const allSquares = document.querySelectorAll(".square");
	allSquares.forEach((square, i) => {
		square.setAttribute("square-id", i);
	});
}
