let option = document.querySelectorAll(".option");
let modal = document.querySelector(".modal");
let title = document.querySelector(".title");
let scoreBoard = document.querySelector(".score");
let scoreInfo = document.querySelector(".scoreInfo");
let userScore = document.querySelector(".userScore");
let bestScore = document.querySelector(".bestScore");
let playAgain = document.querySelector(".playAgain");
let endGameBlock = document.querySelector(".endGameBlock");
let menu = document.querySelector(".menu");
let heart = document.querySelectorAll(".life i");
let letter = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let symbols = [",", ".", "/", "'", ";", "=", "-", "`"];
let balloon = ["balloon_1", "balloon_2", "balloon_3"];
let width = document.querySelector(".game").offsetWidth;
let checkStop;
let checkSpeed;
let speed;
let play;


const StartGame = () => {


    let gameFall = 0;
    play = true;
    let color = "#C6CACB";
    let score = 0;


    heart.forEach(val => {
        val.style.display = "inline-block";
    })

    let deleteLetter = e => {

        let text = document.querySelectorAll(".text");
        let letter = [];

        for (let i = 0; i < text.length; i++) {

            if (text[i].innerHTML === e.key) {

                letter.push(text[i]);

                for (let j = 0; j < symbols.length; j++) {
                    if (e.key === symbols[j]) {
                        score += 4;
                    }
                }

                if (parseInt(e.key)) {
                    score += 4;
                } else {
                    score += 2;
                }

                scoreBoard.innerHTML = score;

            }

        }

        if (letter.length !== 0) {
            letter[0].remove();
        }

    }


    window.addEventListener('resize', () => {
        width = document.querySelector(".game").offsetWidth;
    });


    window.addEventListener("keydown", deleteLetter)

    HTMLElement.prototype.up = function (e) {

        let item = this;
        let num = e;

        let timer = setInterval(() => {

            num++;
            item.style.bottom = num + "px";

            if (item.offsetTop <= -75) {

                heart[gameFall].style.display = "none"
                document.querySelector(".life").classList.add("animation")
                setTimeout(() => {
                    document.querySelector(".life").classList.remove("animation")
                }, 600)
                gameFall++
                item.remove();

                if (gameFall === 3) {

                    clearInterval(checkStop);
                    window.removeEventListener("keydown", deleteLetter);
                    scoreInfo.classList.add("active")
                    userScore.innerHTML = score;
                    endGameBlock.classList.add("active");

                    if (+localStorage.getItem("Type game score") < +scoreBoard.innerHTML) {
                        localStorage.setItem("Type game score", scoreBoard.innerHTML);
                    }
                    bestScore.innerHTML = localStorage.getItem("Type game score");

                }

            }

            if (gameFall === 3) { clearInterval(timer); }


        }, speed)

    };


    let check = () => {

        let random = Math.floor(Math.random() * letter.length);
        let widthCalc = width - 100;
        let ran = Math.floor(Math.random() * widthCalc) + 50;
        let item = document.createElement("div");
        let bgN = Math.floor(Math.random() * 3)
        item.style.backgroundImage = "url(./img/" + balloon[bgN] + ".png)";
        item.className = "text";
        item.style.left = ran + "px";
        item.innerHTML = letter[random];
        document.querySelector(".game").append(item);
        item.up(-100);

    }



    checkStop = setInterval(() => {
        check()
    }, checkSpeed)

    scoreBoard.style.background = color;
    scoreBoard.style.display = "block";
    document.querySelector(".life").style.display = "block";
    modal.style.display = "none";

}

for (let i = 0; i < option.length; i++) {

    option[i].addEventListener("click", () => {

        title.innerHTML = option[i].innerHTML;

        switch (title.innerHTML) {
            case "Easy":
                color = "#2293B7";
                break;
            case "Normal":
                color = "#C6CACB";
                break;
            case "Hard":
                color = "#569512";
                break;
        }

        title.style.background = color;

    })

}


playAgain.addEventListener("click", () => {

    document.querySelectorAll(".text").forEach(el => {
        el.remove()
    })
    scoreInfo.classList.remove("active")
    scoreBoard.innerHTML = 0;
    endGameBlock.classList.remove("active");
    StartGame()

})

menu.addEventListener("click", () => {

    document.querySelectorAll(".text").forEach(el => {
        el.remove()
    })
    scoreInfo.classList.remove("active")
    scoreBoard.innerHTML = 0;
    scoreBoard.style.display = "none";
    endGameBlock.classList.remove("active");
    modal.style.display = "flex";

})

document.querySelector(".start").addEventListener("click", () => {

    switch (title.innerHTML) {
        case "Easy":
            speed = 10;
            checkSpeed = 1500;
            break;
        case "Normal":
            speed = 7;
            letter.push(...numbers);
            checkSpeed = 1000;
            break;
        case "Hard":
            speed = 4;
            checkSpeed = 800;
            letter.push(...numbers);
            letter.unshift(...symbols);
            break;
    }

    StartGame()
    console.log("start with -", title.innerHTML)

}, 3000)