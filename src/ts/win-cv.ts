import '../styles/style.scss';
import '../styles/pages/_game.scss';
import '../styles/pages/_endscreen-cv.scss';
import '../styles/pages/_endscreen-gt.scss';
import '../styles/pages/_win-cv.scss';
import { GameSettings } from "./selected-settings";


const score = JSON.parse(localStorage.getItem("score")!);

const matchedPairsBlue = score.blue;
const matchedPairsOrange = score.orange;


const savedSettings = localStorage.getItem("gameSettings");
const settings = JSON.parse(savedSettings!) as GameSettings;

console.log(settings);


initWin();


function initWin(): void {
    checkWinner();
}


function checkWinner(): void {
    if (matchedPairsBlue > matchedPairsOrange) {
        blueWins();
    } else if (matchedPairsOrange > matchedPairsBlue) {
        orangeWins();
    } else if(matchedPairsBlue===matchedPairsOrange){
        drawCV();
    }
}


function blueWins(): void {
    const playerDiv = document.getElementById("player");
    const playerColor = document.getElementById("player-color");
    const playerPawn = document.getElementById("pawn") as HTMLImageElement | null;;

    if (playerDiv) {
        playerDiv.style.color = "#2BB1FF";
    }

    if (playerColor) {
        playerColor.textContent = "Blue";
    }

    if (playerPawn){
        playerPawn.src = "public/assets/win/blue-pawn.svg";
    }
}

function orangeWins(): void {
    const playerDiv = document.getElementById("player");
    const playerColor = document.getElementById("player-color");
    const playerPawn = document.getElementById("pawn") as HTMLImageElement | null;;

    if (playerDiv) {
        playerDiv.style.color = "#F58E39";
    }

    if (playerColor) {
        playerColor.textContent = "Orange";
    }

    if (playerPawn){
        playerPawn.src = "public/assets/win/orange-pawn.svg";
    }
}


function drawCV(): void {
    const winSec = document.getElementById("win-section-cv");
    const drawSec = document.getElementById("draw-section-cv");

    if(winSec){
        winSec.style.display = "none";
    }
    
    if(drawSec){
        drawSec.style.display = "flex";
    }
    
}