// import '../styles/pages/_settings.scss';
// import { GameSettings } from "./selected-settings";



// let selectedTheme: HTMLElement;


// const settings = {
//   theme: "",
//   player: "",
//   board: "",
// };




// const infoTheme = document.querySelector(".settings-info__theme") as HTMLElement;
// const infoPlayer = document.querySelector(".settings-info__player") as HTMLElement;
// const infoBoard = document.querySelector(".settings-info__board") as HTMLElement;
// const startBtn = document.querySelector(".settings-info__start-btn") as HTMLImageElement;
// const skewLines = document.querySelectorAll<HTMLImageElement>(".settings-info__skew");


// const updateSettingsInfo = (): void => {
//   infoTheme.textContent = settings.theme || "Theme";
//   infoPlayer.textContent = settings.player || "Player";
//   infoBoard.textContent = settings.board || "Board size";

  

//   const ready =
//     settings.theme !== "" &&
//     settings.player !== "" &&
//     settings.board !== "";

//   startBtn.src = ready
//     ? "public/assets/start-btn.svg"
//     : "public/assets/start-btn-disabled.svg";

//   skewLines.forEach(line => {
//     line.src = ready
//       ? "public/assets/line-skew-picked.svg"
//       : "public/assets/line-skew.svg";
//   });

//   startBtnHover(ready); 
// };


// function startBtnHover(ready: boolean): void {
//   if (ready) {
//     startBtn.addEventListener("mouseenter", () => {
//       startBtn.src = "public/assets/start-btn-hover.svg";
//       startBtn.style.transform = "scale(1.2)";
//     });

//     startBtn.addEventListener("mouseleave", () => {
//       startBtn.src = "public/assets/start-btn.svg";
//       startBtn.style.transform = "scale(1)";
//     });

//     startBtn.addEventListener("click", () => {
//       const settingsInt: GameSettings = {
//         theme: settings.theme,
//         player: settings.player,
//         boardSize: Number(settings.board.match(/\d+/)?.[0])
//     };

//     localStorage.setItem(
//         "gameSettings",
//         JSON.stringify(settingsInt)
//     );

//       window.location.href = "game.html";
//     });
//   } 
// }







// const optionSelector =
//   ".code-vibes, .gaming-theme, .player__blue, .player__orange, .board__16, .board__24, .board__36";

// const options = document.querySelectorAll<HTMLElement>(optionSelector);


// options.forEach(option => {
//   option.addEventListener("click", () => {
//     selectOption(option);
//   });
// });



// const themeOptions = document.querySelectorAll<HTMLElement>(
//   ".code-vibes, .gaming-theme"
// );

// themeOptions.forEach(option => {

//   option.addEventListener("mouseenter", () => {
//     resetGroup(option);
//     activateOption(option);
//     updateThemeImage(option);
//   });

//   option.addEventListener("mouseleave", () => {
//     resetGroup(option);
//     activateOption(selectedTheme);
//     updateThemeImage(selectedTheme);
//   });

// });


// const selectOption = (selected: HTMLElement): void => {
//   resetGroup(selected);
//   activateOption(selected);

//   updateSettings(selected);

//   updateSettingsInfo();

//   if (
//     selected.classList.contains("code-vibes") ||
//     selected.classList.contains("gaming-theme")
//   ) {
//     selectedTheme = selected;
//     updateThemeImage(selected);
//   }
// };



// const updateSettings = (selected: HTMLElement): void => {
//   switch (true) {
//     case selected.classList.contains("code-vibes"):
//       settings.theme = "Code vibes";
//       break;

//     case selected.classList.contains("gaming-theme"):
//       settings.theme = "Gaming theme";
//       break;

//     case selected.classList.contains("player__blue"):
//       settings.player = "Blue Player";
//       break;

//     case selected.classList.contains("player__orange"):
//       settings.player = "Orange Player";
//       break;

//     case selected.classList.contains("board__16"):
//       settings.board = "Board-16 Cards";
//       break;

//     case selected.classList.contains("board__24"):
//       settings.board = "Board-24 Cards";
//       break;

//     case selected.classList.contains("board__36"):
//       settings.board = "Board-36 Cards";
//       break;
//   }

//   updateSettingsInfo();
// };



// const themeImg = document.querySelector<HTMLImageElement>(".theme__img");

// const updateThemeImage = (option: HTMLElement): void => {
//   if (!themeImg) return;

//   themeImg.src = option.classList.contains("code-vibes")
//     ? "public/assets/code-vibes-theme.svg"
//     : "public/assets/gaming-theme.svg";
// };


// const resetGroup = (option: HTMLElement): void => {
//   option.parentElement
//     ?.querySelectorAll<HTMLElement>(":scope > div:not(:first-child)")
//     .forEach(resetOption);
// };


// const resetOption = (option: HTMLElement): void => {
//   option.querySelector("img")!.src = "public/assets/circle.svg";
//   option.querySelector("p")!.style.fontWeight = "400";
//   option.querySelector<HTMLElement>(".line-short")!.style.display = "none";
// };


// const activateOption = (option: HTMLElement): void => {
//   option.querySelector("img")!.src = "public/assets/circle-dot.svg";
//   option.querySelector("p")!.style.fontWeight = "900";
//   option.querySelector<HTMLElement>(".line-short")!.style.display = "flex";
// };


// const defaultOption = document.querySelector<HTMLElement>(".code-vibes");

// if (defaultOption) {
//   activateOption(defaultOption);
//   settings.theme = "Code vibes";
//   updateSettingsInfo();
//   selectedTheme = defaultOption;
// }

import "../styles/pages/_settings.scss";
import { GameSettings } from "./selected-settings";

let selectedTheme: HTMLElement;

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
    ? "public/assets/start-btn.svg"
    : "public/assets/start-btn-disabled.svg";

  skewLines.forEach((line) => {
    line.src = ready
      ? "public/assets/line-skew-picked.svg"
      : "public/assets/line-skew.svg";
  });

  startBtnHover(ready);
};

function startBtnHover(ready: boolean): void {
  if (!ready) return;

  startBtn.onmouseenter = () => {
    startBtn.src = "public/assets/start-btn-hover.svg";
    startBtn.style.transform = "scale(1.2)";
  };

  startBtn.onmouseleave = () => {
    startBtn.src = "public/assets/start-btn.svg";
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

const themeOptions = document.querySelectorAll<HTMLElement>(
  ".code-vibes, .gaming-theme"
);

themeOptions.forEach((option) => {
  option.addEventListener("mouseenter", () => {
    resetGroup(option);
    activateOption(option);
    updateThemeImage(option);
  });

  option.addEventListener("mouseleave", () => {
    resetGroup(option);
    activateOption(selectedTheme);
    updateThemeImage(selectedTheme);
  });
});

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
    ? "public/assets/code-vibes-theme.svg"
    : "public/assets/gaming-theme.svg";
};

const resetGroup = (option: HTMLElement): void => {
  option.parentElement
    ?.querySelectorAll<HTMLElement>(":scope > div:not(:first-child)")
    .forEach(resetOption);
};

const resetOption = (option: HTMLElement): void => {
  option.querySelector("img")!.src = "public/assets/circle.svg";
  option.querySelector("p")!.style.fontWeight = "400";
  option.querySelector<HTMLElement>(".line-short")!.style.display = "none";
};

const activateOption = (option: HTMLElement): void => {
  option.querySelector("img")!.src = "public/assets/circle-dot.svg";
  option.querySelector("p")!.style.fontWeight = "900";
  option.querySelector<HTMLElement>(".line-short")!.style.display = "flex";
};

const defaultOption = document.querySelector<HTMLElement>(".code-vibes");

if (defaultOption) {
  activateOption(defaultOption);
  settings.theme = "code-vibes";
  updateSettingsInfo();
  selectedTheme = defaultOption;
}
