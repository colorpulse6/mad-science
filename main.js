// to modify the DOM depending on the screen

//Sounds
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
let mySplatSound = new sound("sounds/Splat.mp3");
let myFillSound1 = new sound("sounds/Rise01.mp3")
let myFillSound2 = new sound("sounds/Rise03.mp3")
let myFillSound3 = new sound("sounds/Rise02.mp3")
let splashMusic = new sound("sounds/Filthy Flowers.mp3")
let gameMusic = new sound("sounds/Pictures.mp3");
let gameOverSound = new sound("sounds/gameOver.wav");
let levelSound = new sound("sounds/levelSound.mp3")

let bg = new Image();


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
      //splashMusic.play()
      splashScreen = buildDom(`
        <div id="scientist-div">
            <img id="scientist" src="img/Poison Scientist.svg">
            <img id="science-text" src="img/Mad-science-text.png">
            <div id="directions" class="blinking">
              <h1>Click the Balls!</h1>
              <h1>Fill the Beakers!</h1>
              <h1>Each Beaker Holds 3 Ingredients!</h1>
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
//Remove Splash Screen
    function removeSplashScreen() {
        splashScreen.remove();
        splashMusic.stop();
      }

    createSplashScreen();
    
}
  window.addEventListener("load", main);


  



//*********Play Game********

function createGameScreen() {
  gameScreen = buildDom(`
  
  
    <div id="canvas-div">
    <div id="nobel-prizes">
      <img id="np1" class="nobel-prize hideBeaker" src ="img/nobelPrize.png">
      <img id="np2" class="nobel-prize hideBeaker" src ="img/nobelPrize.png">
      <img id="np3" class="nobel-prize hideBeaker" src ="img/nobelPrize.png">
      <img id="np4" class="nobel-prize hideBeaker" src ="img/nobelPrize.png">
      <img id="np5" class="nobel-prize hideBeaker" src ="img/nobelPrize.png">
    </div>
    <img id="science-text2" src="img/Mad-science-text.png">
      <canvas id="canvas" width="500" height="500"></canvas>
      <div class="beakerDivFinished">
          <img id="beakerBlue3" class="hideBeaker"src="img/Nic Beaker/Beaker png/blue3.png">
          <img id="beakerRed3" class="hideBeaker"src="img/Nic Beaker/Beaker png/red3.png">
          <img id="beakerPurple3" class="hideBeaker"src="img/Nic Beaker/Beaker png/purple3.png">
          <img id="beakerGreen3"  class="hideBeaker"src="img/Nic Beaker/Beaker png/green3.png">
      
      </div>
        <div id="beaker-div">
          
          <img id="beakerBlue0" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/blue0.png">
          <img id="beakerBlue1" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/blue1.png">
          <img id="beakerBlue2" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/blue2.png">
          

          <img id="beakerRed0" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/red0.png">
          <img id="beakerRed1" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/red1.png">
          <img id="beakerRed2" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/red2.png">
          

          <img id="beakerPurple0" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/purple0.png">
          <img id="beakerPurple1" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/purple1.png">
          <img id="beakerPurple2" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/purple2.png">
          

          <img id="beakerGreen0" class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/green0.png">
          <img id="beakerGreen1"  class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/green1.png">
          <img id="beakerGreen2"  class="beakerClass hideBeaker"src="img/Nic Beaker/Beaker png/green2.png">
   

       </div>

    </div>
    
    `);

  document.body.appendChild(gameScreen);
  return gameScreen;
  
}

function startGame(){ 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//gameMusic.play();


//Draw Splat 
let dropletRed = new Image();
dropletRed.src = "img/DropletRed.png";
let dropletBlue = new Image();
dropletBlue.src = "img/dropletBlue.png";
let dropletPurple = new Image();
dropletPurple.src = "img/dropletPurple.png";
let dropletGreen = new Image();
dropletGreen.src = "img/dropletGreen.png";



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

let prizes = document.querySelectorAll('.nobel-prize')
let prizesArray = [];
let ballArray = [];
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
     //console.log("x: " + mouseX + " y: " + mouseY)
}

//generate Nobel Prizes
function getPrize(){
  [].forEach.call(prizes, function(el){
    prizesArray.push(el);
    for(let i = 0;i<prizesArray.length;i++){
      prizesArray[0].classList.remove('hideBeaker')
    }
    
  })
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
    x: Math.random() * (canvas.width - 80) + 15,
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
    if (object.y >= canvas.height - 50){
      object.r = 0;

        //Collision Test
      if(object.color === target && object.r === 0){
        lives -= 1
      
        if(target === 'red'){
          ctx.drawImage(dropletRed, object.x - 50, canvas.height - 100,100,100);
        }else if(target === 'blue'){
          ctx.drawImage(dropletBlue, object.x - 50, canvas.height - 100,100,100);
        }else if(target === 'purple'){
          ctx.drawImage(dropletPurple, object.x - 50, canvas.height - 100,100,100);
        }else if(target === 'green'){
          ctx.drawImage(dropletGreen, object.x - 50, canvas.height - 100,100,100);
        }
        
        mySplatSound.play();
      //console.log(lives)
       
    }
    ballArray.shift();
    //End Game
  if(lives === 0){
  clearInterval(ballInterval)   
  gameMusic.stop();  
  gameOverSound.play();
  createGameOverScreen(score, level)
  
  }
    }
    
    
  }
  
}




let redCounter = 0;
let blueCounter = 0;
let purpleCounter = 0;
let greenCounter = 0;
let advanceLevelCounter = 0;
let score = 0
let level = 1;

//Advance Level
function advanceLevel(){
  rateOfDescent += 0.3;
  spawnRate -= 70;
  advanceLevelCounter = 0;
  level ++;
  console.log(rateOfDescent)
  beakerRed3.classList.add('hideBeaker')
  beakerBlue3.classList.add('hideBeaker') 
  beakerPurple3.classList.add('hideBeaker')
  beakerGreen3.classList.add('hideBeaker')
  levelSound.play();
  console.log(level)
  getPrize()


}

//test if ball is clicked
function grabBall(){ 
  for (let i = 0; i<ballArray.length; i++){
    let object = ballArray[i];
    
    //Click Test
      if (mouseX >= object.x && mouseX <= object.x + object.r || mouseY >= object.y && mouseY <= object.y + object.r) {
        console.log(redCounter)
        //console.log('clicked')
        
         //Test of ball is target color

         if (object.color === 'red' && target === 'red'){
          redCounter ++;
          lives ++;
          score += 10;
          ballArray.splice(i, 1);

            if (redCounter === 0){
              beakerRed0.classList.remove('hideBeaker')
              
              
            } else if (redCounter === 1){
              myFillSound1.play();
              beakerRed0.classList.add('hideBeaker')
              beakerRed1.classList.remove('hideBeaker')
            } else if (redCounter === 2){
              myFillSound2.play();
              beakerRed1.classList.add('hideBeaker')
              beakerRed2.classList.remove('hideBeaker')
            }
              else if(redCounter === 3){
              beakerRed2.classList.add('hideBeaker')
              beakerRed3.classList.remove('hideBeaker')
              advanceLevelCounter ++;
              redCounter = 0;
              myFillSound3.play();
              generateTarget();
            }
          
        } else if (object.color === 'blue' && target === 'blue'){
          blueCounter ++; // Count until Full (3)
          lives ++;// Increase Lives
          score += 10; //Add to Score
          ballArray.splice(i, 1); //Clear Ball
          //console.log(i)
           if (target === 'blue' && blueCounter === 0){
              beakerBlue0.classList.remove('hideBeaker')
        
          } else if (target === 'blue' && blueCounter === 1){
              myFillSound1.play();
              beakerBlue0.classList.add('hideBeaker')
              beakerBlue1.classList.remove('hideBeaker')
          } else if (target === 'blue' && blueCounter === 2){
              myFillSound2.play();
              beakerBlue1.classList.add('hideBeaker')
              beakerBlue2.classList.remove('hideBeaker')
          } else if (blueCounter === 3){
              beakerBlue2.classList.add('hideBeaker') // Hide Beaker 2
              beakerBlue3.classList.remove('hideBeaker') //Show Beaker 3
              advanceLevelCounter ++; //Count to next level
              blueCounter = 0; //Reset Counter
              myFillSound3.play();
              generateTarget();
          }
        } else if (object.color === 'purple' && target === 'purple'){
          purpleCounter ++;
          lives ++;
          score += 10;
          ballArray.splice(i, 1);
           if (purpleCounter === 0){
             beakerPurple0.classList.remove('hideBeaker')
    
          } else if (purpleCounter === 1){
              myFillSound1.play();
              beakerPurple0.classList.add('hideBeaker')
              beakerPurple1.classList.remove('hideBeaker')
          } else if (purpleCounter === 2){
              myFillSound2.play();
              beakerPurple1.classList.add('hideBeaker')
              beakerPurple2.classList.remove('hideBeaker')
          } else if (purpleCounter === 3){
              beakerPurple2.classList.add('hideBeaker')
              beakerPurple3.classList.remove('hideBeaker')
              advanceLevelCounter ++;
              purpleCounter = 0;
              myFillSound3.play();
              generateTarget();
          }
        } else if (object.color === 'green' && target === 'green'){
          greenCounter ++;
          lives ++;
          score += 10;
          console.log('You got a green! ' + greenCounter);
          ballArray.splice(i, 1);
           if (greenCounter === 0){
              beakerGreen0.classList.remove('hideBeaker')
    
          } else if (greenCounter === 1){
              myFillSound1.play();
              beakerGreen0.classList.add('hideBeaker')
              beakerGreen1.classList.remove('hideBeaker')
          } else if (greenCounter === 2){
              myFillSound2.play();
              beakerGreen1.classList.add('hideBeaker')
              beakerGreen2.classList.remove('hideBeaker')
          } else if (greenCounter === 3){
              beakerGreen2.classList.add('hideBeaker')
              beakerGreen3.classList.remove('hideBeaker')
              advanceLevelCounter ++;
              greenCounter = 0;
              myFillSound3.play();
              generateTarget();
          }
        } 
        //Advance Level
        if(advanceLevelCounter === 4){
         
          advanceLevel();
        }
        
      }  



   
  } //End of ForLoop
      //Change Beaker
    //Red
     //Blue
       //Purple
       //Green
      


}

// On click function
canvas.addEventListener('mousedown', function(e) {
  getCursorPosition(canvas, e)
  grabBall();

})

function drawText(){
  ctx.font = "30px Arial";
  ctx.fillText("Target: " + target[0].toUpperCase() +  
  target.slice(1), 10, 50);
  ctx.fillText("Lives: " + lives, 380, 50);
  ctx.fillStyle='white';
  ctx.fillText("Score: " + score, 10, 150);
  ctx.fillStyle='white';
  ctx.fillText("Level: " + level, 350, 150);
  
}


  //Ball Movement (put behavior here)
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height - 20);
  //Draw Background
  //ctx.drawImage(bg, 0, 0,canvas.width,canvas.height-20);
  drawText();
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
  
function createGameOverScreen(score, level){
  let gameOverScreen = buildDom(`
  
    <div id="game-over-div">
      <h1 id="game-over-text">Game Over!</h1>
      <img class="sad-scientist"src="img/SadScientistPng.png">
        <button id="restart-button">Restart</button>
        <h1 id="final-score" class= "blinking">Final Score</h1>
        <h2 id="final-level" class= "blinking">Level Reached</h2>
    </div>    
    `);
    document.body.appendChild(gameOverScreen);
    removeGameScreen();
    

    var finalScore = gameOverScreen.querySelector("#final-score");
    var finalLevel = gameOverScreen.querySelector("#final-level");
    finalScore.innerHTML = `FINAL SCORE: ${score}`
    finalLevel.innerHTML = `LEVEL REACHED: ${level}`

    var restartButton = gameOverScreen.querySelector("#restart-button");

    restartButton.addEventListener("click", function() {
      gameOverScreen.remove();
      main();

      
      
    });
    
  return gameOverScreen;
  
}




