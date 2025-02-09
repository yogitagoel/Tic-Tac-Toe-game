let boxes=document.querySelectorAll(".box");
let rstbtn=document.getElementById("reset");
let newbtn=document.querySelector("#ng");
let msgCont=document.querySelector(".msg");
let msg=document.querySelector("#m");
let turnO=false;
const win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!turnO && box.innerText === "") {
            box.innerText = "X";
            box.disabled = true;
            turnO = true;
            checkWinner();
            setTimeout(computerMove, 500);
        }
    });
});

function computerMove() {
    let emptyBoxes = Array.from(boxes).filter(box => !box.disabled);
    if (emptyBoxes.length === 0) return;
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    let box = emptyBoxes[randomIndex];
    box.innerText = "O";
    box.disabled = true;
    turnO = false;
    checkWinner();
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations,Winner is ${winner}`;
    for(box of boxes){
        box.disabled=true;
    }
    celebrateWinner();
    rstbtn.classList.add("hide");
    msgCont.classList.remove("hide");
}
function celebrateWinner() {
    var duration = 2 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
const checkWinner=()=>{
    for(let pattern of win){
        let v1=boxes[pattern[0]].innerText;
        let v2=boxes[pattern[1]].innerText;
        let v3=boxes[pattern[2]].innerText;
        if(v1!="" && v2!="" && v3!=""){
            if(v1===v2 && v2===v3){
                boxes[pattern[0]].style.backgroundColor="#6ff06d";
                boxes[pattern[1]].style.backgroundColor="#6ff06d";
                boxes[pattern[2]].style.backgroundColor="#6ff06d";
                console.log("winner ",v1);
                showWinner(v1);
            }
        }
    }
}
const reset=()=>{
    turnO=false;
    for(box of boxes){
        box.style.backgroundColor="#ffffc7";
        box.disabled=false;
        box.innerText="";
    }
    msgCont.classList.add("hide");
    rstbtn.classList.remove("hide");
}
newbtn.addEventListener("click",reset);
rstbtn.addEventListener("click",reset);
