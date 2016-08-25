//Back End
function Player(username, playerNumber, turnScore, totalScore) {
  this.username = username;
  this.playerNumber = playerNumber;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

function Dice(dice1, dice2) {
  this.dice1 = dice1;
  this.dice2 = dice2;
}

Dice.prototype.diceTotal = function() {
  return this.dice1 + this.dice2;
}

var dice = new Dice(0, 0);
var p1 = new Player("t1k1", 1, 0, 0);
var p2 = new Player("trivassi", 2, 0, 0);
var count = 0;



function diceRoll() {
  dice.dice1 = 1 + Math.floor(Math.random() * 6);
  dice.dice2 = 1 + Math.floor(Math.random() * 6);

  if ((count%2) === 0) {
    if (dice.dice1 != 1 && dice.dice2 != 1) {
      p1.turnScore += dice.diceTotal();
      return p1.turnScore;
    } else if (dice.dice1 === 1 || dice.dice2 === 1) {
      p1.turnScore = 0;
      count += 1;
      return p1.turnScore;
    }
  } else if ((count%2) === 1){
    if (dice.dice1 != 1 && dice.dice2 != 1) {
      p2.turnScore += dice.diceTotal();
      return p2.turnScore;
    } else if (dice.dice1 === 1 || dice.dice2 === 1) {
      p2.turnScore = 0;
      count += 1;
      return p2.turnScore;
    }
  }
}


$(document).ready(function() {
  $("#roll").click(function(event) {
    event.preventDefault();

    $("#turn-score").text(diceRoll());
    $("#end").show();

    if ((count%2) === 1 && (dice.dice1 === 1 && dice.dice2 === 1)) {
      p1.totalScore = 0;
      $("#p1-total-score").text(p1.totalScore);
      $("#arrow1").hide();
      $("#arrow2").show();
    } else if ((count%2) === 0 && (dice.dice1 === 1 && dice.dice2 === 1)) {
      p2.totalScore = 0;
      $("#p2-total-score").text(p2.totalScore);
      $("#arrow2").hide();
      $("#arrow1").show();
    } else if ((count%2) === 1 && (dice.dice1 === 1 || dice.dice2 === 1)) {
      $("#arrow1").hide();
      $("#arrow2").show();
    } else if ((count%2) === 0 && (dice.dice1 === 1 || dice.dice2 === 1)) {
      $("#arrow2").hide();
      $("#arrow1").show();
    } else if (dice.dice1 === dice.dice2) {
      $("#end").hide();
    }
  });

  $("#end").click(function(event) {
    event.preventDefault();

    if ((count%2) === 0) {
      p1.totalScore += p1.turnScore;
      $("#p1-total-score").text(p1.totalScore);
      $("#arrow1").hide();
      $("#arrow2").show();
    } else if ((count%2) === 1) {
      p2.totalScore += p2.turnScore;
      $("#p2-total-score").text(p2.totalScore);
      $("#arrow2").hide();
      $("#arrow1").show();
    }

    if (p1.totalScore >= 100) {
      $(".playing").hide();
      $(".won").show();
      $("#username-won").text($("input#p1-username").val() + " Wins");
      $("#user-points-won").text(p1.totalScore);
    } else if (p2.totalScore >= 100) {
      $(".playing").hide();
      $(".won").show();
      $("#username-won").text($("input#p2-username").val() + " Wins");
      $("#user-points-won").text(p2.totalScore);
    }

    count += 1;
    p1.turnScore = 0;
    p2.turnScore = 0;
    $("#turn-score").text(0);
  });

  $("#play").click(function(event) {
    event.preventDefault();

    $("#username1").text($("input#p1-username").val());
    $("#username2").text($("input#p2-username").val());
    $(".input-username").hide();
    $("#arrow1").show();
    $(".playing").show();
  });

  $("#play-vs-comp").click(function(event) {
    event.preventDefault();

    var nameArray = ["Hal", "TARS", "GERTY", "Zardon"];
    var randomName = nameArray[Math.floor(Math.random() * nameArray.length)];

    $("#username1").text($("input#p1-username").val());
    $("#username2").text(randomName);
    $(".input-username").hide();
    $("#arrow1").show();
    $(".playing").show();
  });
});
