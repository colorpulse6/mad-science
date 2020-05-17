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
      <canvas id="canvas" width="700" height="700"></canvas>
        <div id="beaker-div">
          
          <img class="beakerClass"src="img/Nic Beaker/Beaker png/blue1.png">
          <img class="beakerClass"src="img/Nic Beaker/Beaker png/blue2.png">
          <img class="beakerClass"src="img/Nic Beaker/Beaker png/blue3.png">
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
bg.src = "img/pexels-photo-3786215.jpeg";
bg.addEventListener('load', function(){
  ctx.drawImage(bg, 0, 0)
})

//Draw beakers
let beakerRed0 = new Image();
let beakerRed1 = new Image();
let beakerRed2 = new Image();
let beakerRed3 = new Image();
let beakerBlue0 = new Image();
let beakerBlue1 = new Image();
let beakerBlue2 = new Image();
let beakerBlue3 = new Image();
let beakerPurple0 = new Image();
let beakerPurple1 = new Image();
let beakerPurple2 = new Image();
let beakerPurple3 = new Image();
let beakerGreen0 = new Image();
let beakerGreen1 = new Image();
let beakerGreen2 = new Image();
let beakerGreen3 = new Image();
let dropletRed = new Image();


beakerRed1.src = "img/Nic Beaker/Beaker png/red1.png"

dropletRed.src = "img/DropletRed.png"






let ballArray = []
let spawnRate = 500; //(more is less)
let rateOfDescent = 1;
let lastSpawn = -10

//Get cursor position
let rect;
let mouseX;
let mouseY;
let counter = 0;
function getCursorPosition(canvas, event) {
     rect = canvas.getBoundingClientRect()
     mouseX = event.clientX - rect.left;
     mouseY = event.clientY - rect.top;
     console.log("x: " + mouseX + " y: " + mouseY)
}


//Generate Random Color
var colorArray = ['blue', 'red', 'green', 'purple', 'orange', 'black']
var randomColor;
function getRandomColor(){
  colorArray.forEach(function(el){
    randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    return randomColor;
  })
}
getRandomColor()

var targetArray = ['blue', 'red', 'green', 'purple']
var randomTarget;
function getRandomTarget(){
  targetArray.forEach(function(el){
    randomTarget = targetArray[Math.floor(Math.random() * targetArray.length)];
    return randomTarget;
  })
}
getRandomTarget()


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
  }
}

//Build target
let target;
function generateTarget(){
   target = randomTarget;
  console.log(target)
}
generateTarget()


//test if ball is clicked

redCounter = 0;
blueCounter = 0;
purpleCounter = 0;
greenCounter = 0;
var mouseDown = false;
canvas.onmousedown = function() { 
  mouseDown = true;
}

function grabBall(){ 
  for (let i = 0; i<ballArray.length; i++){
    let object = ballArray[i];
    
      if (mouseX >= object.x  && mouseX <= object.x + object.radius || mouseY >= object.y  && mouseY <= object.y + object.r) {
        
        console.log('clicked')
         //Test of ball is target color
        if (object.color === 'red' && target === 'red'){
          redCounter ++;
          console.log('You got a red!' + redCounter);
          object.r = 0;
          
        } else if (object.color === 'blue' && target === 'blue'){
          blueCounter ++;
          console.log('You got a blue!' + blueCounter);
          object.r = 0;
        } else if (object.color === 'purple' && target === 'purple'){
          purpleCounter ++;
          console.log('You got a purple!' + purpleCounter);
          object.r = 0;
        } else if (object.color === 'green' && target === 'green'){
          greenCounter ++;
          console.log('You got a green! ' + greenCounter);
          object.r = 0;
        }
        
    }
   
    //Change Target
    if(redCounter === 3){
      redCounter = 0;
      generateTarget()
     

    } else if (blueCounter === 3){
      blueCounter = 0;
      generateTarget();
    } else if (purpleCounter === 3){
      purpleCounter = 0;
      generateTarget();
    } else if (greenCounter === 3){
      greenCounter = 0;
      generateTarget();
    }
    //Collision Test
    if(object.y === canvas.height){
      console.log('clear')
    }
   
 }



}

  //Ball Movement (put behavior here)
function draw() {
  //Draw Background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0,canvas.width,canvas.height);
  ctx.font = "30px Arial";
  ctx.fillText("Target: " + target[0].toUpperCase() +  
  target.slice(1), 10, 50);
  

  ballsFall();
 

}

// On click function
canvas.addEventListener('mousedown', function(e) {
  getCursorPosition(canvas, e)
  grabBall();

  
})


  //Open Loop 

let ballInterval = setInterval(draw, 10);


//clearInterval(ballInterval)

}
  


