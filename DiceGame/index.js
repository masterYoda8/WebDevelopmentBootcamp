var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var srcFirstDice = "images/dice" + randomNumber1 + ".png";
var srcSecondDice = "images/dice" + randomNumber2 + ".png";
var message;

if (randomNumber1 > randomNumber2) {
    message = "🚩 Player 1 wins!";
} else if (randomNumber2 > randomNumber1) {
    message = "Player 2 wins! 🚩";
} else {
    message = "Draw!";
}

document.getElementsByClassName("img1")[0].setAttribute("src", srcFirstDice);
document.getElementsByClassName("img2")[0].setAttribute("src", srcSecondDice);
document.querySelector("h1").innerText = message;
