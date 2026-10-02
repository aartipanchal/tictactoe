const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('#reset-btn');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');
const newRoundBtn = document.querySelector('#new-round-btn');
const turnIndicator = document.querySelector('#turn-indicator');
const scoreEls = { O: document.querySelector('#score-o'), X: document.querySelector('#score-x'), draw: document.querySelector('#score-draw') };
const scores = { O: 0, X: 0, draw: 0 };
let turnO = false;
let gameOver = false;
const winnerCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const currentPlayer = () => (turnO ? 'O' : 'X');
const updateTurnIndicator = () => { turnIndicator.innerText = `Player ${currentPlayer()}'s turn`; };
const updateScores = () => { scoreEls.O.innerText = scores.O; scoreEls.X.innerText = scores.X; scoreEls.draw.innerText = scores.draw; };
const showResult = (text) => {
    gameOver = true;
    msg.innerText = text;
    msgContainer.classList.remove('hide');
    msgContainer.style.display = 'block';
    cells.forEach(cell => (cell.disabled = true));
    turnIndicator.innerText = 'Game over';
};
const checkWinner = () => {
    for (const pattern of winnerCombos) {
        const [a, b, c] = pattern.map(i => cells[i].innerText);
        if (a && a === b && b === c) {
            pattern.forEach(i => cells[i].classList.add('win'));
            scores[a] += 1; updateScores();
            showResult(`Player ${a} takes the round!`);
            return true;
        }
    }
    if (Array.from(cells).every(cell => cell.innerText !== '')) {
        scores.draw += 1; updateScores();
        showResult("No winner this time!");
        return true;
    }
    return false;
};
const clearBoard = () => {
    cells.forEach(cell => { cell.innerText = ''; cell.disabled = false; cell.classList.remove('win'); });
    msgContainer.style.display = 'none';
    msgContainer.classList.add('hide');
    turnO = false; gameOver = false;
    updateTurnIndicator();
};
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameOver || cell.innerText) return;
        cell.innerText = currentPlayer();
        cell.disabled = true;
        if (!checkWinner()) { turnO = !turnO; updateTurnIndicator(); }
    });
});
newRoundBtn.addEventListener('click', clearBoard);
resetButton.addEventListener('click', () => { scores.O = 0; scores.X = 0; scores.draw = 0; updateScores(); clearBoard(); });
updateTurnIndicator();
updateScores();
