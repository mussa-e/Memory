import '../styles/style.scss'
import '../styles/pages/_game.scss'
import { GameSettings } from "./selected-settings";
import { cvCardsFilePath, gtCardsFilePath } from "./cards";
import { buttonCardHTML } from './template';


const saved = localStorage.getItem("gameSettings");
const settings = JSON.parse(saved!) as GameSettings;
console.log(settings);

let currentPlayer: "blue" | "orange" = settings.player;
let firstCard: HTMLButtonElement | null = null;
let secondCard: HTMLButtonElement | null = null;
let lockBoard: boolean = false;

export let matchedPairsOrange: number = 0;
export let matchedPairsBlue: number = 0;




init();

function init(){
    const fieldRef = document.getElementById("field");
    if(fieldRef){
        fieldRef.addEventListener("click", e=> {
            const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement
            if(card){
                flipCard(card);
            }

            checkIfGamingThemeForBG(settings.theme);
            
        })
    }

    initTheme(settings.theme);
    initBoardSize(settings);
    setPopupTheme(settings.theme);
    setCurrentPlayerImgBG(settings.theme, settings.player);
    setheaderLeftBG(settings.theme);

    updateCurrentPlayer();
    
}


function checkIfGamingThemeForBG(theme: GameSettings["theme"]) {

    let contRef = document.querySelectorAll(".card__face--back");
    if (theme === "gaming-theme") {
        contRef.forEach(card => card.classList.add("gt-card-inner"));
    }
}


function flipCard(card: HTMLButtonElement) {

    if (lockBoard) return;

    if (card === firstCard) return;

    card.classList.add("is-flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkForMatch();
}


function checkForMatch() {

    const firstValue = firstCard?.dataset.card;
    const secondValue = secondCard?.dataset.card;

    if (firstValue === secondValue) {
        matchMark();
        disableCards();
        updateScore();
    } else {
        unflipCards();
    }

}





function matchMark() {
    const ending = settings.theme === "code-vibes" ? "cv" : "gt";

    const firstInner = firstCard?.firstElementChild as HTMLElement | null;
    const secondInner = secondCard?.firstElementChild as HTMLElement | null;

    firstInner?.classList.add(`match-marked-${ending}`);
    secondInner?.classList.add(`match-marked-${ending}`);

    

}


function disableCards() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;

}


function unflipCards() {

    setTimeout(() => {

        firstCard?.classList.remove("is-flipped");
        secondCard?.classList.remove("is-flipped");

        switchPlayer();

        firstCard = null;
        secondCard = null;
        lockBoard = false;

    }, 1000);

}

function switchPlayer() {

    currentPlayer = currentPlayer === "blue" ? "orange" : "blue";

    updateCurrentPlayer();
}


function updateCurrentPlayer() {

    const ending = settings.theme === "code-vibes"
        ? "cv"
        : "gt";

    const currentPlayerImg = document.getElementById("current-player") as HTMLImageElement;

    currentPlayerImg.src =
        `public/assets/${settings.theme}/label-${currentPlayer}-${ending}.svg`;

    setCurrentPlayerImgBG(settings.theme, currentPlayer);

    
}


function initTheme(theme: GameSettings["theme"]){
    const body = document.body;
    body.classList=theme + "__bg";

    const ending = theme === "code-vibes" ? "cv" : "gt";

    const currentPlayerImg = document.getElementById("current-player") as HTMLImageElement | null;
    if(currentPlayerImg){
        
        currentPlayerImg.src = `public/assets/${theme}/label-${settings.player}-${ending}.svg`;
    }

    const exitBtn = document.getElementById("exit-btn") as HTMLButtonElement | null;
    if(exitBtn){
        exitBtn.src = `public/assets/${theme}/exit-${ending}.svg`;
    }

    const headerFont = document.getElementById("header") as HTMLElement | null;
    if(headerFont){
        headerFont.classList=theme + "__font";
    }

    

    const playerBlueImg = document.getElementById("player-blue") as HTMLImageElement | null;
    if(playerBlueImg){
        playerBlueImg.src = `public/assets/${theme}/blue-player-${ending}.svg`;
    }

    const playerOrangeImg = document.getElementById("player-orange") as HTMLImageElement | null;
    if(playerOrangeImg){
        playerOrangeImg.src = `public/assets/${theme}/orange-player-${ending}.svg`;
    }
}


function updateScore() {
    const scoreBlue = document.getElementById("score-blue") as HTMLElement | null;
    const scoreOrange = document.getElementById("score-orange") as HTMLElement | null;

    if (currentPlayer === "blue") {
        matchedPairsBlue++;
        if (scoreBlue) {
            scoreBlue.textContent = matchedPairsBlue.toString();
        }
    } else {
        matchedPairsOrange++;
        if (scoreOrange) {
            scoreOrange.textContent = matchedPairsOrange.toString();
        }
    }

    checkEnding();
    
}


function checkEnding(): void {
    const totalPairs = matchedPairsBlue + matchedPairsOrange;
    const requiredPairs = settings.boardSize / 2;

    if (totalPairs === requiredPairs) {
        checkFinalRedirect();
    }

    
}


function checkFinalRedirect(): void {
    console.log("checkFinalRedirect");

    localStorage.setItem(
    "score",
    JSON.stringify({
        blue: matchedPairsBlue,
        orange: matchedPairsOrange
    })
);

    if(settings.theme==="code-vibes"){
        setTimeout(() => {
            window.location.href = "endscreen-cv.html";
        }, 2000);
    }

    if(settings.theme==="gaming-theme"){
        setTimeout(() => {
            window.location.href = "endscreen-gt.html";
        }, 2000);
    }
}








function initBoardSize(settings: GameSettings){
    const section = document.getElementById("field") as HTMLElement | null;
    const Cards = prepareGameCards(settings);
    
    if(section){
        section.innerHTML = "";
        for(let i = 0; i < settings.boardSize; i++){
            
            section.innerHTML += buttonCardHTML(settings, i, Cards[i]);
        }
    }

    if (settings.boardSize === 16) {
            section?.classList.add("field--16");
        } else if (settings.boardSize === 24) {
            section?.classList.add("field--24");
        } else if (settings.boardSize === 36) {
            section?.classList.add("field--36");
    }
}



function prepareGameCards(settings: GameSettings) {
    const cardPool =
    settings.theme === "code-vibes"
        ? [...cvCardsFilePath]
        : [...gtCardsFilePath];

    for (let i = cardPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardPool[i], cardPool[j]] = [cardPool[j], cardPool[i]];
    }

    const selectedCards = cardPool.slice(0, settings.boardSize / 2);
    const gameCards = [...selectedCards, ...selectedCards];
    
    for (let i = gameCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    return gameCards;
}




function setPopupTheme(theme: string) {
    const root = document.documentElement;

    root.style.setProperty(
        "--back-to-game",
        `url("public/assets/${theme}/back-to-game.svg")`
    );

    root.style.setProperty(
        "--back-to-game-hover",
        `url("public/assets/${theme}/back-to-game-hover.svg")`
    );

    root.style.setProperty(
        "--exit-game",
        `url("public/assets/${theme}/exit-popup.svg")`
    );

    root.style.setProperty(
        "--exit-game-hover",
        `url("public/assets/${theme}/exit-popup-hover.svg")`
    );

    if (theme === "code-vibes") {
        root.style.setProperty("--popup-font", '"Red Rose", serif');
        root.style.setProperty("--popup-radius", "0px");
    } else if (theme === "gaming-theme") {
        root.style.setProperty("--popup-font", '"Orbitron", sans-serif');
        root.style.setProperty("--popup-radius", "20px");
    }
}


function setCurrentPlayerImgBG(theme: string, player: string) {
    const background = document.getElementById("current-player-wrapper") as HTMLElement | null;

    if (theme === "code-vibes") {
        return;
    }

    background!.style.backgroundColor =
        player === "blue" ? "#1FAAFC" : "#F58E39";
    
}


function setheaderLeftBG(theme: string) {
    const headerLeft = document.getElementById("header-left") as HTMLElement | null;

    if(headerLeft && theme === "gaming-theme"){
        headerLeft.classList.add("gaming-theme-left-BG");
    } else if(headerLeft && theme === "code-vibes"){
        headerLeft.classList.remove("gaming-theme-left-BG");
    }

    if(headerLeft && theme === "code-vibes"){
        headerLeft.classList.add("code-vibes-left-BG");
    } else if(headerLeft && theme === "gaming-theme"){
        headerLeft.classList.remove("code-vibes-left-BG");
    }

}





        


const exitBtn = document.getElementById("exit-btn") as HTMLButtonElement | null;
const popup = document.getElementById("popup") as HTMLElement | null;
const overlay = document.getElementById("overlay") as HTMLElement | null;


exitBtn?.addEventListener("click", () => {
    popup?.classList.add("active");
    overlay?.classList.add("overlay-add");
});



const backBtn = document.getElementById("back-btn");
backBtn?.addEventListener("click", () => {
    popup?.classList.remove("active");
    overlay?.classList.remove("overlay-add");
});


const exitPopupBtn = document.getElementById("exit-popup") as HTMLButtonElement | null;
exitPopupBtn?.addEventListener("click", () => {
    window.location.href = "settings.html";
});


document.addEventListener("click", (e) => {
    if (!popup?.classList.contains("active")) return;

    const target = e.target as HTMLElement;

    if (target.closest("#popup") || target.closest("#exit-btn")) {
        return;
    }

    popup.classList.remove("active");
    overlay?.classList.remove("overlay-add");
});


