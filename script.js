// Select elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

// Initialize game state
let turnO = true; // true for Player O, false for Player X

// Winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Function to enable all boxes
const enableBoxes = () => {
    boxes.forEach(box => box.disabled = false);
};

// Function to display the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

// Function to display a tie
const showTie = () => {
    msg.innerText = "It's a tie!";
    msgContainer.classList.remove("hide");
};

// Function to check for a winner or a tie
const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern.map(index => boxes[index].innerText);
        if (a && a === b && a === c) {
            showWinner(a);
            disableBoxes(); // Disable all boxes
            highlightWinningBoxes(pattern);
            return;
        }
    }
    // Check for tie
    if ([...boxes].every(box => box.innerText)) {
        showTie();
        disableBoxes(); // Disable all boxes
    }
};

// Function to highlight winning boxes
const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add("animated");
    });
};

// Function to reset the game
const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("animated"); // Remove animation class
    });
    msgContainer.classList.add("hide");
    turnO = true; // Reset to Player O's turn
};

// Add event listeners for each box
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!box.innerText) {
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            box.disabled = true;
            checkWinner();
        }
    });
});

// Add event listeners for buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

// Initialize game on page load (if needed)
document.addEventListener("DOMContentLoaded", () => {
    resetGame();
});
