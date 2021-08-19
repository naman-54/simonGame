var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    console.log(gamePattern);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    ṭ
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // let i=0;
    // myloop();
    // function myloop(){
    //   console.log('a');
    //     setTimeout(function () {
    //       $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    //       playSound(gamePattern[i]);
    //       i++;
    //       if(i<gamePattern.length){
    //         myloop();
    //       }
    //     }, 700);
    // }
    // for(let i=0;i<gamePattern.length;i++)
    // {
    //     $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    //   playSound(gamePattern[i]);
    //    setTimeout(function(){
    //    },2000);
    // }
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 500);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function playSound(aud) {
    var audio = new Audio('sounds/' + aud + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}