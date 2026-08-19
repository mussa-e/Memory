import "../styles/pages/_settings.scss";
import { GameSettings } from "./selected-settings";

let selectedTheme: HTMLElement;
let selectedPlayer: HTMLElement;
let selectedBoard: HTMLElement;

const settings: GameSettings = {
  theme: "",
  player: "",
  boardSize: 0,
};


const themeLabels: Record<string, string> = {
  "code-vibes": "Code vibes",
  "gaming-theme": "Gaming theme",
};


const playerLabels: Record<string, string> = {
  blue: "Blue Player",
  orange: "Orange Player",
};


const infoTheme = document.querySelector(".settings-info__theme") as HTMLElement;
const infoPlayer = document.querySelector(".settings-info__player") as HTMLElement;
const infoBoard = document.querySelector(".settings-info__board") as HTMLElement;
const startBtn = document.querySelector(".settings-info__start-btn") as HTMLImageElement;
const skewLines = document.querySelectorAll<HTMLImageElement>(".settings-info__skew");


const updateSettingsInfo = (): void => {
  infoTheme.textContent = themeLabels[settings.theme] ?? "Theme";
  infoPlayer.textContent = playerLabels[settings.player] ?? "Player";
  infoBoard.textContent = settings.boardSize
    ? `Board-${settings.boardSize} Cards`
    : "Board size";

  const ready =
    settings.theme !== "" &&
    settings.player !== "" &&
    settings.boardSize > 0;

  startBtn.src = ready
    ? `${import.meta.env.BASE_URL}assets/start-settings/start-btn.svg`
    : `${import.meta.env.BASE_URL}assets/start-settings/start-btn-disabled.svg`;

  skewLines.forEach((line) => {
    line.src = ready
      ? `${import.meta.env.BASE_URL}assets/start-settings/line-skew-picked.svg`
      : `${import.meta.env.BASE_URL}assets/start-settings/line-skew.svg`;
  });

  startBtnHover(ready);
};


function startBtnHover(ready: boolean): void {
  if (!ready) return;

  startBtn.onmouseenter = () => {
    startBtn.src = `${import.meta.env.BASE_URL}assets/start-settings/start-btn-hover.svg`;
    startBtn.style.transform = "scale(1.2)";
  };


  startBtn.onmouseleave = () => {
    startBtn.src = `${import.meta.env.BASE_URL}assets/start-settings/start-btn.svg`;
    startBtn.style.transform = "scale(1)";
  };


  startBtn.onclick = () => {
    localStorage.setItem("gameSettings", JSON.stringify(settings));
    window.location.href = "game.html";
  };
}


const optionSelector =
  ".code-vibes, .gaming-theme, .player__blue, .player__orange, .board__16, .board__24, .board__36";


const options = document.querySelectorAll<HTMLElement>(optionSelector);


options.forEach((option) => {
  option.addEventListener("click", () => {
    selectOption(option);
  });
});


const addHoverEffect = (
  options: NodeListOf<HTMLElement>,
  selectedOption: () => HTMLElement
): void => {
  options.forEach((option) => {
    option.addEventListener("mouseenter", () => {
      resetGroup(option);
      activateOption(option);

      if (
        option.classList.contains("code-vibes") ||
        option.classList.contains("gaming-theme")
      ) {
        updateThemeImage(option);
      }
    });

    option.addEventListener("mouseleave", () => {
      resetGroup(option);

      const selected = selectedOption();

      if (selected) {
        activateOption(selected);

        if (
          selected.classList.contains("code-vibes") ||
          selected.classList.contains("gaming-theme")
        ) {
          updateThemeImage(selected);
        }
      }
    });
  });
};


const themeOptions = document.querySelectorAll<HTMLElement>(
  ".code-vibes, .gaming-theme"
);

const playerOptions = document.querySelectorAll<HTMLElement>(
  ".player__blue, .player__orange"
);

const boardOptions = document.querySelectorAll<HTMLElement>(
  ".board__16, .board__24, .board__36"
);


addHoverEffect(themeOptions, () => selectedTheme);
addHoverEffect(playerOptions, () => selectedPlayer);
addHoverEffect(boardOptions, () => selectedBoard);


const selectOption = (selected: HTMLElement): void => {
  resetGroup(selected);
  activateOption(selected);

  updateSettings(selected);
  updateSettingsInfo();

  if (
    selected.classList.contains("code-vibes") ||
    selected.classList.contains("gaming-theme")
  ) {
    selectedTheme = selected;
    updateThemeImage(selected);
  }

  if (
    selected.classList.contains("player__blue") ||
    selected.classList.contains("player__orange")
  ) {
    selectedPlayer = selected;
  }

  if (
    selected.classList.contains("board__16") ||
    selected.classList.contains("board__24") ||
    selected.classList.contains("board__36")
  ) {
    selectedBoard = selected;
  }
};


const updateSettings = (selected: HTMLElement): void => {
  switch (true) {
    case selected.classList.contains("code-vibes"):
      settings.theme = "code-vibes";
      break;

    case selected.classList.contains("gaming-theme"):
      settings.theme = "gaming-theme";
      break;

    case selected.classList.contains("player__blue"):
      settings.player = "blue";
      break;

    case selected.classList.contains("player__orange"):
      settings.player = "orange";
      break;

    case selected.classList.contains("board__16"):
      settings.boardSize = 16;
      break;

    case selected.classList.contains("board__24"):
      settings.boardSize = 24;
      break;

    case selected.classList.contains("board__36"):
      settings.boardSize = 36;
      break;
  }

  updateSettingsInfo();
};


const themeImg = document.querySelector<HTMLImageElement>(".theme__img");


const updateThemeImage = (option: HTMLElement): void => {
  if (!themeImg) return;

  themeImg.src = option.classList.contains("code-vibes")
    ? `${import.meta.env.BASE_URL}assets/start-settings/code-vibes-theme.svg`
    : `${import.meta.env.BASE_URL}assets/start-settings/gaming-theme.svg`;
};


const resetGroup = (option: HTMLElement): void => {
  option.parentElement
    ?.querySelectorAll<HTMLElement>(":scope > div:not(:first-child)")
    .forEach(resetOption);
};


const resetOption = (option: HTMLElement): void => {
  option.querySelector("img")!.src = `${import.meta.env.BASE_URL}assets/start-settings/circle.svg`;
  option.querySelector("p")!.style.fontWeight = "400";
  option.querySelector<HTMLElement>(".line-short")!.style.display = "none";
};


const activateOption = (option: HTMLElement): void => {
  option.querySelector("img")!.src = `${import.meta.env.BASE_URL}assets/start-settings/circle-dot.svg`;
  option.querySelector("p")!.style.fontWeight = "900";
  option.querySelector<HTMLElement>(".line-short")!.style.display = "flex";
};


const defaultTheme = document.querySelector<HTMLElement>(".code-vibes");


if (defaultTheme) {
  activateOption(defaultTheme);
  settings.theme = "code-vibes";
  selectedTheme = defaultTheme;
}


updateSettingsInfo();