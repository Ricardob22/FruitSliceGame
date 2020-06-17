var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval
var fruits = ['apple', 'grape', 'orange', 'pear', 'pineapple', 'watermelon'];
$(function() {
    //click on start reset button
    $("#startreset").click(function() {
        //are we playing?
        if(playing == true) {
           //reload page
           location.reload();
        } else{
            //are we not playing
            playing = true; //game initiated
            //set score to 0
            score = 0; //set score to 0
            $("#scorevalue").html(score);
            
            //show trials left
            $("#trialsleft").show();
            trialsLeft = 3;
            addHearts();
            
            //hide game over box
            $("#gameover").hide();
            
            //change button text to reset game
            $("#startreset").html("Reset Game");
            
            //start sending fruits
            startFruits();
            
          }
        
    });
});

$("#fruit1").mouseover(function() {
    score++;
    $("#scorevalue").html(score); //update score
    //$("#slicesound")[0].play(); //play sound
    
    //stop fruit 
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit
    
    //send new fruit
    setTimeout(startFruits, 500);
});
//slice a fruit
    //play sound
    //explode fruit

//functions

function addHearts() {
    $("#trialsleft").empty();
    for(i = 0; i < trialsLeft; i++) {
        $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits

function startFruits() {
    
   //generate a fruit
   $("#fruit1").show();
   chooseFruit(); //Choose a random fruit
   $("#fruit1").css({'left': Math.round(550 * Math.random()), 'top': -50});
   //random position
   
        //generate a random step
        step = 1 + Math.round(5 * Math.random());
        
        //Move fruit down by one step every 10ms
        action = setInterval(function(){
            
            $("#fruit1").css('top', $("#fruit1").position().top + step); //move fruit by one step
            
                //check if the fruit is too low
                if($("#fruit1").position().top > $("#fruitscontainer").height()) {
                   //check if we have trials left
                    if(trialsLeft > 1 ) {
                        //generate a fruit
                        $("#fruit1").show();
                        chooseFruit(); //Choose a random fruit
                        $("#fruit1").css({'left': Math.round(550 * Math.random()), 'top': -50});
                        //random position
   
                        //generate a random step
                        step = 1 + Math.round(5 * Math.random());
                        
                        //reduce trials by one
                        trialsLeft--;
                        
                        //populate trialsleft box
                        addHearts();
                       
                    } else { //game over
                        playing = false;//we are not playing anymore
                        $("#startreset").html("Start Game"); // change button to start game
                        $("#gameover").show();
                        $("#gameover").html("<p>Game Over!</p><p>Your score is " + score + "</p>");
                        $("#trialsleft").hide();
                        stopAction();
                    }
                }
            
        }, 10)
        
}

//generate a random fruit
function chooseFruit() {
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(5 * Math.random())] + '.png');
}

function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
}