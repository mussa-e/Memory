import '../styles/style.scss'
import '../styles/pages/_game.scss'
import { GameSettings } from "./selected-settings";
import { cvCardsFilePath, gtCardsFilePath } from "./cards";
import { buttonCardHTML } from './template';


const saved = localStorage.getItem("gameSettings");
const settings = JSON.parse(saved!) as GameSettings;
console.log(settings);





init();

function init(){
    const fieldRef = document.getElementById("field");
    if(fieldRef){
        fieldRef.addEventListener("click", e=> {
            const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement
            if(card){
                card.classList.toggle("is-flipped")
            }

            
            console.log("card clicked");
            
        })
    }

    initTheme(settings.theme);
    initBoardSize(settings);
    setPopupTheme(settings.theme);
    setCurrentPlayerImgBG(settings.theme, settings.player);
    setheaderLeftBG(settings.theme);
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


