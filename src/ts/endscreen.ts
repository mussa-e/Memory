import '../styles/style.scss';
import '../styles/pages/_game.scss';
import '../styles/pages/_endscreen-cv.scss';
import '../styles/pages/_endscreen-gt.scss';
import { GameSettings } from "./selected-settings";


const score = JSON.parse(localStorage.getItem('score')!) as {
    blue: number;
    orange: number;
};

const matchedPairsBlue: number = score.blue;
const matchedPairsOrange: number = score.orange;

const saved = localStorage.getItem("gameSettings");
const settings = JSON.parse(saved!) as GameSettings;


initEnd();


function initEnd(): void {
    endscreenScoreUpdate();
    whoIsWinner();
}


function endscreenScoreUpdate(): void {

    let blueScoreCV = document.getElementById("blue-score-cv");
    let orangeScoreCV = document.getElementById("orange-score-cv");

    let blueScoreGT = document.getElementById("blue-score-gt");
    let orangeScoreGT = document.getElementById("orange-score-gt");
    
    if (blueScoreCV) {
        blueScoreCV.innerHTML = matchedPairsBlue.toString();
    }
    if (orangeScoreCV) {
        orangeScoreCV.innerHTML = matchedPairsOrange.toString();
    }

    if (blueScoreGT) {
        blueScoreGT.innerHTML = matchedPairsBlue.toString();
    }
    if (orangeScoreGT) {
        orangeScoreGT.innerHTML = matchedPairsOrange.toString();
    }
}


function whoIsWinner(): void {
    if(settings.theme==="code-vibes"){
        setTimeout(() => {
            window.location.href = "win-cv.html";
        }, 5000);
    }

    if(settings.theme==="gaming-theme"){
        setTimeout(() => {
            window.location.href = "win-gt.html";
        },5000);
    }
}
