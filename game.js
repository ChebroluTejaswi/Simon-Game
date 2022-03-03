
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level); //replaces heading with level-0
      nextSequence();
      started = true;
    }
});

/*
 to make game work with a click
*/
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
/*
 to make game work with keystrokes
 */
$(document).keypress(function(){
  makeSound(event.key);
});

function makeSound(key){
  var userChosenColour;
  switch (key) {
    case "w":
      userChosenColour="green";
      break;
    case "a":
      userChosenColour="red";
      break;
    case "s":
      userChosenColour="yellow";
      break;
    case "d":
      userChosenColour="blue";
      break;
    default: console.log(buttonInnerHTML);
  }
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over-Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 500);

      startOver();
      userClickedPattern = [];
    }
}


function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function (){$("#" + currentColor).removeClass("pressed");}, 200);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  // userClickedPattern = [];
  started = false;
}



// -------------------Concept covered--------------------

/*
before(): gets added before opening tag
after(): gets added after closing tag
prepend(): gets added before context/ after opening tag
append(): gets added after context/before closing tag

these are really useful in placing newly added html element.
*/

/*
animations:

$("button").on("click",function(){
  $("h1").hide();   hides heading
  $("h1").fadeOut();  first reduces opacity then hides
  $("h1").toggle();  hide-unhide-hide
  $("h1").fadeIn();
  $("h1").fadeToggle();
  $("h1").slideDown();
  $("h1").slideUp();
  $("h1").slideToggle();
});
*/

/*
adding event listeners:

$("button").click(function(){
  $("h1").css("color","purple");
});
$("input").keypress(function(event){
  $("h1").text(event.key);
});
$("h1").on("mouseover",function(){
  $("h1").css("color","green");
});
*/

/*
$("h1").addClass("big-title shadow");
$("button").text("<em>hey<em>"); //will print <em>hey<em> on button
$("button").html("<em>hey<em>"); // will print only hey in emphasied form on buttons

$("img").attr("src");//manipulates attribute values.
$("a").attr("href","www...") // sets an attribute
*/

/*
/*
  ready says once our page is loaded then apply the javascript.
  using ready is very important if we are linking js at head part of html.
  if we wre linking at body part, it's not needed.
  jQuery("hi") or $("hi") can be used
  $("button"), there is no diff between select and selectall

  $(document).ready(function(){
  $("h1").css("color","red"); //$("h1").css("color")->returns the value of it.(i.e. black)
});
*/

