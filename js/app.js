const gameBoard = document.querySelector("#gameBoard");
const player = document.querySelector("#player");
const info = document.querySelector("#infoDisplay");
const dimention = 8;

const createBoard = () => {
	startPieces.forEach((startPiece, i) => {
		const square = document.createElement("div");
		square.classList.add("square");
		square.innerHTML = startPiece;
		square.setAttribute("sqare-id", i);
		const row = Math.floor((63 - i) / 8) + 1;
		if (row % 2 === 0) {
			square.classList.add(i % 2 === 0 ? "beige" : "brown");
		} else {
			square.classList.add(i % 2 === 0 ? "brown" : "beige");
		}
        if(i<=15){
            square.firstChild.firstChild.classList.add('blackPieces')
        }
        if(i>=48){
            square.firstChild.firstChild.classList.add('whitePieces')
        }
		gameBoard.append(square);
	});
};

createBoard();
