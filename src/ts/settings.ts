import '../styles/pages/_settings.scss'


const optionSelector =
  ".code-vibes, .gaming-theme, .player__blue, .player__orange, .board__16, .board__24, .board__36";

const options = document.querySelectorAll<HTMLElement>(optionSelector);


options.forEach(option => {
  option.querySelector("img")?.addEventListener("click", () => {
    selectOption(option);
  });
});


const selectOption = (selected: HTMLElement): void => {
  resetGroup(selected);
  activateOption(selected);
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



