// to modify the DOM depending on the screen

function buildDom(htmlString) {
    var div = document.createElement("div");
  
    div.innerHTML = htmlString;
  
    return div.children[0];
  }

  // main game function for page load
function main() {
    var game;
    var splashScreen;
    var gameOverScreen;
  
    // SETTING GAME SPLASH SCREEN
    function createSplashScreen() {
      splashScreen = buildDom(`
        <div id="scientist-div">
            <img id="scientist" src="img/Poison Scientist.svg">
            <img id="science-text" src="img/Mad-science-text.png">
            <div id="directions" class="blinking">
              <h1>Click the Balls!</h1>
              <h1>Fill the Beakers!</h1>
            </div>
            
            <button id="start-button">Commence!</button>
        </div>`);
  
      document.body.appendChild(splashScreen);
  
      var startButton = splashScreen.querySelector("#start-button");
  
      startButton.addEventListener("click", function() {
        removeSplashScreen()
        createGameScreen();
        startGame();
      });
    }

    function removeSplashScreen() {
        splashScreen.remove();
      }



      
  
    createSplashScreen();
    
}
  window.addEventListener("load", main);


  



//*********Play Game********

function createGameScreen() {
  gameScreen = buildDom(`
  
  
    <div id="canvas-div">
    <img id="science-text2" src="img/Mad-science-text.png">
      <canvas id="canvas" width="500" height="500"></canvas>
        <div id="beaker-div">
          
          <img id="beakerBlue0" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/blue0.png">
          <img id="beakerBlue1" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/blue1.png">
          <img id="beakerBlue2" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/blue2.png">
          <img id="beakerBlue3" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/blue3.png">

          <img id="beakerRed0" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/red0.png">
          <img id="beakerRed1" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/red1.png">
          <img id="beakerRed2" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/red2.png">
          <img id="beakerRed3" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/red3.png">

          <img id="beakerPurple0" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/purple0.png">
          <img id="beakerPurple1" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/purple1.png">
          <img id="beakerPurple2" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/purple2.png">
          <img id="beakerPurple3" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/purple3.png">

          <img id="beakerGreen0" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/green0.png">
          <img id="beakerGreen1"  class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/green1.png">
          <img id="beakerGreen2"  class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/green2.png">
          <img id="beakerGreen3"  class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/green3.png">

          
          

       </div>

    </div>
    
    `);

  document.body.appendChild(gameScreen);
  return gameScreen;
  
}

function startGame(){ 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let bg = new Image();

//Draw Splat and Sound
let dropletRed = new Image();
dropletRed.src = "img/DropletRed.png";

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
let mySound = new sound("sounds/Splat.mp3");



//bg.src = "img/people-working-science-lab/3696841.jpg";
ctx.fillStyle='white';



//Get Beakers
let beakerBlue0 = document.getElementById('beakerBlue0');
let beakerBlue1 = document.getElementById('beakerBlue1');
let beakerBlue2 = document.getElementById('beakerBlue2');
let beakerBlue3 = document.getElementById('beakerBlue3');

let beakerRed0 = document.getElementById('beakerRed0');
let beakerRed1 = document.getElementById('beakerRed1');
let beakerRed2 = document.getElementById('beakerRed2');
let beakerRed3 = document.getElementById('beakerRed3');

let beakerPurple0 = document.getElementById('beakerPurple0');
let beakerPurple1 = document.getElementById('beakerPurple1');
let beakerPurple2 = document.getElementById('beakerPurple2');
let beakerPurple3 = document.getElementById('beakerPurple3');

let beakerGreen0 = document.getElementById('beakerGreen0');
let beakerGreen1 = document.getElementById('beakerGreen1');
let beakerGreen2 = document.getElementById('beakerGreen2');
let beakerGreen3 = document.getElementById('beakerGreen3');



let ballArray = []
let spawnRate = 400; //(more is less)
let rateOfDescent = 2;
let lastSpawn = -10

//Get cursor position
let rect;
let mouseX;
let mouseY;

function getCursorPosition(canvas, event) {
     rect = canvas.getBoundingClientRect()
     mouseX = event.clientX - rect.left;
     mouseY = event.clientY - rect.top;
     console.log("x: " + mouseX + " y: " + mouseY)
}


//Generate Random Color
var colorArray = ['blue', 'red', 'green', 'purple', 'orange', 'white']
var randomColor;
function getRandomColor(){
  colorArray.forEach(function(el){
    randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    return randomColor;
  })
}
getRandomColor()


//Spawn Balls 
function makeBalls(){
  let balls = {
    x: Math.random() * (canvas.width - 50) + 15,
    y: 0,
    r: 20,
    color:randomColor  
  }
  ballArray.push(balls)
}


//Generate Random Target
var targetArray = ['blue', 'red', 'green', 'purple']
var randomTarget;
function getRandomTarget(){
  targetArray.forEach(function(el){
    randomTarget = targetArray[Math.floor(Math.random() * targetArray.length)];
    return randomTarget;
  })
}
getRandomTarget()


//Build target
let target;
function generateTarget(){
   target = randomTarget; 
}
generateTarget()


let lives = 5;
let clicked = false;



//Make Balls fall
function ballsFall(){
  var time = Date.now();
  if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        makeBalls();
    }
    
  for (let i = 0; i<ballArray.length; i++) {
    let object = ballArray[i];
    object.y += rateOfDescent;
    getRandomColor();
    getRandomTarget();
    ctx.beginPath();
    ctx.arc(object.x, object.y, object.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = object.color;
    ctx.fill();
    if (object.y === canvas.width - 50){
      object.r = 0;
      ctx.drawImage(dropletRed, object.x + object.r, canvas.height - 100,100,100);
    }
    
    //Collision Test
    if(object.y === canvas.height && object.color === target && object.r === 0){
      lives -= 1
      mySound.play();
      console.log(lives)
      if(lives === -1){
        break;
      }
    }
  }
  //End Game
  if(lives === 0){
    clearInterval(ballInterval)     
    createGameOverScreen(score)
 }
}


//test if ball is clicked


let redCounter = 0;
let blueCounter = 0;
let purpleCounter = 0;
let greenCounter = 0;
let score = 0


function grabBall(){ 
  for (let i = 0; i<ballArray.length; i++){
    let object = ballArray[i];
    //Click Test
      if (mouseX >= object.x && mouseX <= object.x + object.r || mouseY >= object.y && mouseY <= object.y + object.r) {
        clicked = true;
        console.log('clicked')
         //Test of ball is target color
        if (object.color === 'red' && target === 'red'){
          redCounter ++;
          lives ++;
          score += 10;
          object.r = 0;
          
            if(redCounter === 3){
            beakerRed2.classList.add('hideBeaker')
            beakerRed3.classList.remove('hideBeaker')
            redCounter = 0;
            beakerRed3.classList.add('hideBeaker')
            generateTarget();
          }
          
        } else if (object.color === 'blue' && target === 'blue'){
          blueCounter ++; // Count until Full (3)
          lives ++;// Increase Lives
          score += 10; //Add to Score
          object.r = 0; //Clear Ball
          
            if (blueCounter === 3){
              beakerBlue2.classList.add('hideBeaker') // Hide Beaker 2
              beakerBlue3.classList.remove('hideBeaker') //Show Beaker 3
                blueCounter = 0; //Reset Counter
                beakerBlue3.classList.add('hideBeaker')
                generateTarget();
          }
        } else if (object.color === 'purple' && target === 'purple'){
          purpleCounter ++;
          lives ++;
          score += 10;
          object.r = 0;
          
          if (purpleCounter === 3){
            beakerPurple2.classList.add('hideBeaker')
            beakerPurple3.classList.remove('hideBeaker')
            purpleCounter = 0;
            beakerPurple3.classList.add('hideBeaker')
            generateTarget();
          }
        } else if (object.color === 'green' && target === 'green'){
          greenCounter ++;
          lives ++;
          score += 10;
          console.log('You got a green! ' + greenCounter);
          object.r = 0;
          
          if (greenCounter === 3){
            beakerGreen2.classList.add('hideBeaker')
            beakerGreen3.classList.remove('hideBeaker')
            greenCounter = 0;
            beakerGreen3.classList.add('hideBeaker')
            generateTarget();
          }
        } 
        
      }  



   
  } //End of ForLoop
      //Change Beaker
    //Red
    if (target === 'red' && redCounter === 0 || target === 'red' && redCounter === 3){
      beakerRed0.classList.remove('hideBeaker')
    } else if (target === 'red' && redCounter === 1){
      beakerRed0.classList.add('hideBeaker')
      beakerRed1.classList.remove('hideBeaker')
    } else if (target === 'red' && redCounter === 2){
      beakerRed1.classList.add('hideBeaker')
      beakerRed2.classList.remove('hideBeaker')
    } //Blue
      else if (target === 'blue' && blueCounter === 0 || target === 'blue' && blueCounter === 3){
      beakerBlue0.classList.remove('hideBeaker')
    } else if (target === 'blue' && blueCounter === 1){
      beakerBlue0.classList.add('hideBeaker')
      beakerBlue1.classList.remove('hideBeaker')
    } else if (target === 'blue' && blueCounter === 2){
      beakerBlue1.classList.add('hideBeaker')
      beakerBlue2.classList.remove('hideBeaker')
    } //Purple
      else if (target === 'purple' && purpleCounter === 0 || target === 'purple' && purpleCounter === 3){
      beakerPurple0.classList.remove('hideBeaker')
    } else if (target === 'purple' && purpleCounter === 1){
      beakerPurple0.classList.add('hideBeaker')
      beakerPurple1.classList.remove('hideBeaker')
    } else if (target === 'purple' && purpleCounter === 2){
      beakerPurple1.classList.add('hideBeaker')
      beakerPurple2.classList.remove('hideBeaker')
    } //Green
      else if (target === 'green' && greenCounter === 0 || target === 'green' && greenCounter === 3){
      beakerGreen0.classList.remove('hideBeaker')
    } else if (target === 'green' && greenCounter === 1){
      beakerGreen0.classList.add('hideBeaker')
      beakerGreen1.classList.remove('hideBeaker')
    } else if (target === 'green' && greenCounter === 2){
      beakerGreen1.classList.add('hideBeaker')
      beakerGreen2.classList.remove('hideBeaker')
    }


}

// On click function
canvas.addEventListener('mousedown', function(e) {
  getCursorPosition(canvas, e)
  grabBall();

})

function DrawText(){
  ctx.font = "30px Arial";
  ctx.fillText("Target: " + target[0].toUpperCase() +  
  target.slice(1), 10, 50);
  
  ctx.fillText("Lives: " + lives, 380, 50);
  ctx.fillStyle='white';
  ctx.fillText("Score: " + score, 10, 150);
  
}


  //Ball Movement (put behavior here)
function draw() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height - 20);
  //Draw Background
  //ctx.drawImage(bg, 0, 0,canvas.width,canvas.height-20);
  DrawText();
  ballsFall();
 
  

}




//Open Loop 

let ballInterval = setInterval(draw, 10);


//clearInterval(ballInterval)

}

//***********

function removeGameScreen(){
  gameScreen.remove()
}
  
function createGameOverScreen(num){
  let gameOverScreen = buildDom(`
  
    <div id="game-over-div">
      <h1 id="game-over-text">Game Over!</h1>
      <img class="sad-scientist"src="img/SadScientistPng.png">
      <div>
        <button id="restart-button">Restart</button>
        <h1 id="final-score">Final Score</h1>
      </div>
    </div>    
    `);
    document.body.appendChild(gameOverScreen);
    removeGameScreen();

    var finalScore = gameOverScreen.querySelector("#final-score");
    finalScore.innerHTML = `FINAL SCORE: ${num}`

    var restartButton = gameOverScreen.querySelector("#restart-button");

    restartButton.addEventListener("click", function() {
      gameOverScreen.remove();
      main();

      
      
    });
    
  return gameOverScreen;
  
}




