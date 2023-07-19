// change heading

function onover() {
    document.getElementById("change").innerHTML = "X & 0";
}
function onout() {
    document.getElementById("change").innerHTML = "Eks & Jeero";
}

//sfx ke liye

let clicked = new Audio("click.mp3");
let isgameover = false;

//declaration of turn

let turn="";

function chooseX(){
    turn="X";
    document.getElementById("choosetext").innerHTML="Player 1 is X <br> Player 2 is 0";
    document.getElementById("badachoose").style.display = "none";

}

function choose0(){
    turn="0";
    document.getElementById("choosetext").innerHTML="Player 1 is 0 <br> player 2 is X";

}

let tick=0;

//function to change the turn

const changeTurn = () => {
        if(turn=="X"||turn=="0"){
        return turn === "X"?"0":"X";
        }
}

//check draw

function checkDraw(){
    if(tick===9 && !isgameover){
        document.getElementsByClassName("info")[0].innerText="Draw";
        document.getElementById("choosetext").innerHTML="";
    }
}

//function to check winner

const checkWinner = () => {
    let gametexts = document.getElementsByClassName("gametext");
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    wins.forEach(e => {
        if((gametexts[e[0]].innerText === gametexts[e[1]].innerText)&&(gametexts[e[1]].innerText === gametexts[e[2]].innerText)&&(gametexts[e[0]].innerText !== "")){
            isgameover=true;
            if(isgameover){
            // document.querySelector('.info').innerText=gametexts[e[0]].innerText +" won";
                if(check0E()){
                    document.getElementsByClassName("info")[0].innerText="Player 1 wins";
                    document.getElementById("choosetext").innerHTML="";
                }else if(!check0E()){
                    document.getElementsByClassName("info")[0].innerText="Player 2 wins";
                    document.getElementById("choosetext").innerHTML="";
                }
                else{
                    return 0;
                }

            }
        }
    })
}

//check even odd

function check0E(){
    let out = tick%2;
    if(out==0){
        return 0;
    }else{
        return 1;
    }
}


//Game Logic
document.addEventListener('DOMContentLoaded', () => {
    let boxes = document.getElementsByClassName("elements");
    Array.from(boxes).forEach(element => {
        let gametext = element.querySelector('.elements .gametext');
        element.addEventListener('click', () => {
            if((!isgameover && gametext.innerText==='') && turn!==""){
                gametext.innerText = turn;
                turn = changeTurn();
                tick++;
                clicked.play();
                checkWinner();
                if (!isgameover){
                    if(check0E()){
                        document.getElementsByClassName("info")[0].innerText = "turn for player 2";
                    }
                    else{
                        document.getElementsByClassName("info")[0].innerText = "turn for player 1";
                    }
                    checkDraw();
                }
            }
        })
    })
});

// add onclick listener to reset button

function reset(){
    let boxtexts = document.querySelectorAll('.gametext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    clicked.play();
    isgameover = false;
    turn = "X";
    document.getElementsByClassName("info")[0].innerText = "";
    turn="";
    tick=0;
    document.getElementById("badachoose").style.display = "block";
    document.getElementById("choosetext").innerHTML="Player 1 Select";
}