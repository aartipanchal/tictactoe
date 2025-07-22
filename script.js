let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let playAgain = document.querySelector('#play-again-btn');

let turnO = true;

const winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (turnO == true) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

printWinner = (winner) => { 
    msgContainer.style.display = 'block';
    msg.innerText = `Congratulations!! Player ${winner} wins!`;
    msg.classList.remove('hide');
    boxes.forEach(box => {
        box.disabled = true;
    });
}
playAgain.addEventListener('click', () => {
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
    });
    msgContainer.style.display = 'none';
    msg.classList.add('hide');
});
resetButton.addEventListener('click', () => {
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
    });
    msgContainer.style.display = 'none';
    msg.classList.add('hide');
    turnO = true;
});
checkWinner = () => {
    for (let pattern of winnerCombos) {
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if (pos1value != "" && pos2value != "" && pos3value != "" ) {
            if (pos1value == pos2value && pos2value == pos3value) {
                console.log(`Player ${pos1value} wins!`);
                printWinner(pos1value);
            }

        else if (Array.from(boxes).every(box => box.innerText !== '')) {
            msgContainer.style.display = 'block';
            msg.innerText = "It's a draw!";
            msg.classList.remove('hide');
            boxes.forEach(box => {
                box.disabled = true;
            });
        }
    }
}
}
