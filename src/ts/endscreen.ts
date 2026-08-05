import '../styles/style.scss'
import '../styles/pages/_game.scss'
import '../styles/pages/_endscreen-cv.scss'
import { GameSettings } from "./selected-settings";
import { cvCardsFilePath, gtCardsFilePath } from "./cards";
import { buttonCardHTML } from './template';


initEnd();

function initEnd(settings: GameSettings, matchedPairsBlue: number, matchedPairsOrange: number) {
    console.log("initEnd");
}