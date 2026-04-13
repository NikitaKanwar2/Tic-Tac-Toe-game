let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg =   document.querySelector("#msg");

let turnO = true; //playerX, playerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

resetBtn.addEventListener("click", () => {
  turnO = true;
  msg.innerText = "";

  boxes.forEach((box) => {
    box.innerText = "";
    box.classList.remove("x", "o", "win");
    box.disabled = false;
  });
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        const sound = document.getElementById("clickSound");
        boxes.forEach((box) => {
        box.addEventListener("click", () => {
       sound.currentTime = 0; // restart sound every click
    sound.play();
  });
});
    if (turnO) {
    box.innerText = "O";
    box.classList.add("o");   // add O color
    turnO = false;
    } else {
    box.innerText = "X";
    box.classList.add("x");   // add X color
    turnO = true;
    }
    box.disabled = true;
    checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.innerText = "";
        box.classList.remove("x", "o"); // remove colors
        box.disabled = false;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratilations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                msg.innerText = `Winner is ${pos1Val} 🎉`;
                boxes[pattern[0]].classList.add("win");
                boxes[pattern[1]].classList.add("win");
                boxes[pattern[2]].classList.add("win");
                showWinner(pos1Val);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


