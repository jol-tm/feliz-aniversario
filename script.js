const url = window.location.search;
const searchParams = new URLSearchParams(url);
const from = searchParams.get("de");
const to = searchParams.get("para");
const age = searchParams.get("idade");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#help").addEventListener("click", help);
    congratulate();
});

function congratulate() {
    const btn = document.querySelector("#surprise");

    btn.addEventListener("click", surprise);

    if (to != null || from != null|| age != null ) {
        document.querySelector("#message").innerHTML = `<h2>Feliz Aniversário ${to}!</h2>${from} te deseja um feliz aniversário de ${age} anos!`;
    } else {
        document.querySelector("#message").innerHTML = `<h2>Feliz Aniversário!</h2>Seu amigo te deseja um feliz aniversário!`;
    }
}

function surprise() {
    const jsConfetti = new JSConfetti();
    const sfx = new Audio("media/confetti.mp3");
    const box = document.querySelector("#box");
    const message = document.querySelector("#message");
    const surprise = document.querySelector("#surprise");
    
    box.style.maxWidth = 0;
    box.style.maxHeight = 0;
    box.style.padding = 0;
    message.style.opacity = 0;
    surprise.style.opacity = 0;
    
    setTimeout(() => {
        box.innerHTML = "<h2>Surpresa!</h2><img src=\"media/cake.svg\"><button id=\"eat\">Comer :P</button>";
        box.style.maxWidth = "90vw";
        box.style.maxHeight = "70vh";
        box.style.padding = "1rem";
        box.style.animation = "none";
        box.style.gap = "1rem";
        sfx.play();

        if (window.innerWidth > 992) {
            jsConfetti.addConfetti({
                emojis: ["🥳", "🎉", "🎊"],
                emojiSize: 50,
                confettiNumber: 50,
            })
        } else if (window.innerWidth > 0) {
            jsConfetti.addConfetti({
                emojis: ["🥳", "🎉", "🎊"],
                emojiSize: 100,
                confettiNumber: 20,
            })
        }

        document.querySelector("#eat").addEventListener("click", eatCake);
    }, 1000);
}

function eatCake() {
    const eatBtn = document.querySelector("#eat");

    eatBtn.removeEventListener("click", eatCake);
    eatBtn.innerHTML = "";
    
    typewrite("Você comeu o bolo, estava delicioso... 😋", eatBtn, 50);

    setTimeout(() => {
        location.reload();
    }, 5000);
}

function help() {
    const helpBox = document.querySelector("#helpBox");

    helpBox.style.opacity = 1;
    helpBox.style.scale = 1;
    document.querySelector("#close").addEventListener("click", () => {
        helpBox.style.opacity = 0;
        helpBox.style.scale = 0;
    })
}

function typewrite(txt, tgt, speed) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < txt.length) {
            tgt.innerHTML += txt[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}