const gameBoard = document.querySelector("#gameBoard");
const player = document.querySelector("#player");
const info = document.querySelector("#infoDisplay");
const dimention = 8;
let playerGo = "black";
player.textContent = "black";
(function createBoard() {
	startPieces.forEach((startPiece, i) => {
		const square = document.createElement("div");
		square.classList.add("square");
		square.innerHTML = startPiece;
		square.firstChild?.setAttribute("draggable", true);
		square.setAttribute("square-id", i);
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
})();

const allSquares = document.querySelectorAll(".square");
allSquares.forEach((square) => {
	square.addEventListener("dragstart", dragStart);
	// square.addEventListener("dragover", dragOver);
	square.addEventListener("drop", dragDrop);
});

let draggedElement;
let startPostionId;

function dragStart(e) {
	draggedElement = e.target;
	startPostionId = e.target.parentNode.getAttribute("square-id");
}

// function dragOver(e) {
// 	e.preventDefault();
// }

function dragDrop(e) {
	e.stopPropagation();
	const correctGo = draggedElement.firstChild.classList.contains(playerGo);
	const taken = e.target.classList.contains("piece");
	const valid = checkIfValid(e.target);
	const opponentGo = playerGo === "white" ? "black" : "white";
	const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);

	if (true) {
		if (takenByOpponent && valid) {
			e.target.parentNode.append(draggedElement);
			e.target.remove();
			changePlayer();
			return;
		}
		if (taken && !takenByOpponent) {
			info.textContent = "You cannot go there!";
			setTimeout(() => {
				info.textContent = "";
			}, 3000);
			return;
		}
		if (valid) {
			e.target.append(draggedElement);
			changePlayer();
			return;
		}
	}
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

function checkIfValid(target) {
	const startSquareId = Number(startPostionId);
	const targetSquareId =
		Number(target.getAttribute("square-id")) ||
		Number(target.parentNode.getAttribute("square-id"));
	const draggedPieceName = draggedElement.id;
	switch (draggedPieceName) {
		case "pawn":
			const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
			if (
				(starterRow.includes(startSquareId) &&
					startSquareId + dimention * 2 === targetSquareId) ||
				startSquareId + dimention === targetSquareId ||
				(startSquareId + dimention - 1 === targetSquareId &&
					document.querySelector(
						`[square-id="${startSquareId + dimention - 1}"]`
					).firstChild) ||
				(startSquareId + dimention + 1 === targetSquareId &&
					document.querySelector(
						`[square-id="${startSquareId + dimention + 1}"]`
					).firstChild)
			)
				return true;
			break;
		case "knight":
			if (
				startSquareId + dimention * 2 - 1 === targetSquareId ||
				startSquareId + dimention * 2 + 1 === targetSquareId ||
				startSquareId + dimention - 2 === targetSquareId ||
				startSquareId + dimention + 2 === targetSquareId ||
				startSquareId - dimention * 2 - 1 === targetSquareId ||
				startSquareId - dimention * 2 + 1 === targetSquareId ||
				startSquareId - dimention - 2 === targetSquareId ||
				startSquareId - dimention + 2 === targetSquareId
			) {
			}
	}
}
