// ========== BOSS LEVEL CHALLENGE 2 - THE SIMON GAME ==========

// alert("Welcome New Player");

// console.log($("h1")); // to test if jQuery is added




var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).ready(function(){
    $(".container").addClass("disable-div");
});

// press function to start the game
$(document).keypress(function (e) {
   
    if (e.keyCode === 32) {
        $(".container").removeClass("disable-div");
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    }
});


function nextSequence() {

    // once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    // generate a new random number between 0 and 3, and store it in a variable called randomNumber
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // select the button with the same id as the randomChosenColour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // $("#" + userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // console.log(userClickedPattern);

    //  Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
    // check if user click the same pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        // move to the next pattern of the game
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {

        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("GAME OVER <br> Press Spacebar Key to Restart");
        startOver();

    }
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    // $(".container").addClass("disable-div");
}
