import { GameSettings } from "./selected-settings";

export function buttonCardHTML(
    settings: GameSettings,
    index: number,
    card: string
) {
    return `
        <button class="card" data-card="${card}">
            <div class="card__inner">
                <div class="card__face card__face--front">
                    <img
                        id="card-front-${index}"
                        src="public/assets/${settings.theme}-cards/back.svg"
                    >
                </div>
                <div class="card__face card__face--back">
                    <img
                        id="card-back-${index}"
                        src="${card}"
                    >
                </div>
            </div>
        </button>
    `;
}