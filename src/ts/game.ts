import '../styles/style.scss'
import '../styles/pages/_game.scss'


init();

function init(){
    const fieldRef = document.getElementById("field");
    if(fieldRef){
        fieldRef.addEventListener("click", e=> {
            const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement
            if(card){
                card.classList.toggle("is-flipped")
            }
        })
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