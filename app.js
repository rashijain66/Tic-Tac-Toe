let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newbtn = document.querySelector("#new-btn");
let rstbtn = document.querySelector("#reset-btn");
let boxes = document.querySelectorAll(".box");

let turnX = true;
let count = 0;

const WinPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turnX){
            box.innerText = "X"
            turnX = false;
            box.classList.add("red");
            box.classList.remove("blue");
        }else{
            box.innerText = "O"
            turnX = true;
            box.classList.add("blue");
            box.classList.remove("red");
        }
        box.disabled = true;
        count ++;

        let isWinner = checkwinner();

        if(count === 9 && !isWinner){
            drawGame();
        }
    })
});

const drawGame = () =>{
    msg.innerText = `Game is Draw`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
};

const showWinner = (winner) =>{
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
};

const disabledboxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enabledboxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const newGame = () =>{
    turnX = true;
    count = 0;
    enabledboxes();
    msgcontainer.classList.add("hide");
}

const checkwinner = () =>{
    for(let pattern of WinPatterns){
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1 === val2 && val2 === val3) {
                showWinner(val1);
                return true;
            }
        }
    }
}

rstbtn.addEventListener("click", newGame);
newbtn.addEventListener("click", newGame)

