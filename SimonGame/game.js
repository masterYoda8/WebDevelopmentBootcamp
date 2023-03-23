var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(4 * Math.random());
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("h1").text("Level " + level);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

}


$(".btn").click(function(event){
    var userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}
);

$(document).keypress(function(){
    if (level === 0){nextSequence();}
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){$("." + currentColor).removeClass("pressed");}, 50);
}

function checkAnswer(currenLevel) {
    if (userClickedPattern[currenLevel] === gamePattern[currenLevel]){
        console.log("success");
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    if (currenLevel === level - 1) {setTimeout(nextSequence, 1000);}
}

function startOver(){
    level = 0;
    gamePattern = [];
}
