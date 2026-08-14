import '../styles/style.scss';
import '../styles/pages/_game.scss';
import '../styles/pages/_endscreen-cv.scss';
import '../styles/pages/_endscreen-gt.scss';
import '../styles/pages/_win-gt.scss';
import { GameSettings } from "./selected-settings";


const score = JSON.parse(localStorage.getItem("score")!);

const matchedPairsBlue = score.blue;
const matchedPairsOrange = score.orange;


const savedSettings = localStorage.getItem("gameSettings");
const settings = JSON.parse(savedSettings!) as GameSettings;


initWinGT();


function initWinGT(): void {
    checkWinnerGT();
}


function checkWinnerGT() {
    if (matchedPairsBlue > matchedPairsOrange) {
        blueWinsGT();
    } else if (matchedPairsOrange > matchedPairsBlue) {
        orangeWinsGT();
    } else if(matchedPairsBlue===matchedPairsOrange){
        drawGT();
    }
}


function blueWinsGT(): void {
    const playerDiv = document.getElementById("player-gt");
    const playerColor = document.getElementById("player-color-gt");
    

    if (playerDiv) {
        playerDiv.style.color = "#2298DB";
    }

    if (playerColor) {
        playerColor.textContent = "Blue";
    }
}


function orangeWinsGT(): void {
    const playerDiv = document.getElementById("player-gt");
    const playerColor = document.getElementById("player-color-gt");
    

    if (playerDiv) {
        playerDiv.style.color = "#EA6900";
    }

    if (playerColor) {
        playerColor.textContent = "Orange";
    }
}


function drawGT(): void {
    const winSec = document.getElementById("win-section-gt");
    const drawSec = document.getElementById("draw-section-gt");

    if(winSec){
        winSec.style.display = "none";
    }
    
    if(drawSec){
        drawSec.style.display = "flex";
    }
}