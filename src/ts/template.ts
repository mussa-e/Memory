import { GameSettings } from "./selected-settings";

export function buttonCardHTML(
    settings: GameSettings,
    index: number,
    card: string
) {
    return `
        <button class="card" data-card="${card}">
            <div class="card__inner">
                <section class="card__face card__face--front">
                    <img
                        id="card-front-${index}"
                        src="${import.meta.env.BASE_URL}assets/${settings.theme}-cards/back.svg"
                    >
                </section>
                <section class="card__face card__face--back">
                    <img
                        id="card-back-${index}"
                        src="${card}"
                    >
                </section>
            </div>
        </button>
    `;
}