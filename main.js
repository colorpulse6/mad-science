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
bg.src = "img/pexels-photo-3786215.jpeg";
bg.addEventListener('load', function(){
  ctx.drawImage(bg, 0, 0)
})

//Draw Splat

let dropletRed = new Image();
dropletRed.src = "img/DropletRed.png"

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
let spawnRate = 300; //(more is less)
let rateOfDescent = 2;
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
  console.log(target)
}

generateTarget()

let lives = 10;
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

//Collision Test
function collision(){
  for (let i = 0; i< ballArray.length; i++){
    let object = ballArray[i];
    
    if(object.y === canvas.height && object.color === target){
        lives -= 1
        console.log(lives)
        }   
        if(lives === 0){
          createGameOverScreen()
        }  
  }
  

}




//Img movement
/*
function moveImg(img) {
  
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      img.style.top = pos + 'px';
      img.style.left = pos + 'px';
    }
  }
}
/*/
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
    
      if (mouseX >= object.x && mouseX <= object.x + object.r || mouseY >= object.y && mouseY <= object.y + object.r) {
        
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
      beakerRed2.classList.add('hideBeaker')
      beakerRed3.classList.remove('hideBeaker')
      setTimeout(function(){
        redCounter = 0;
        beakerRed3.classList.add('hideBeaker')
      }, 1000)
      generateTarget();
    } else if (blueCounter === 3){
      beakerBlue2.classList.add('hideBeaker')
      beakerBlue3.classList.remove('hideBeaker')
      setTimeout(function(){
        blueCounter = 0;
        beakerBlue3.classList.add('hideBeaker')
      }, 1000)
      generateTarget();
    } else if (purpleCounter === 3){
      beakerPurple2.classList.add('hideBeaker')
      beakerPurple3.classList.remove('hideBeaker')
      setTimeout(function(){
        purpleCounter = 0;
        beakerPurple3.classList.add('hideBeaker')
      }, 1000)
      generateTarget();
    } else if (greenCounter === 3){
      beakerGreen2.classList.add('hideBeaker')
      beakerGreen3.classList.remove('hideBeaker')
      setTimeout(function(){
        greenCounter = 0;
        beakerGreen3.classList.add('hideBeaker')

      }, 1000)
      generateTarget();
    }

    
   
 }
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




  //Ball Movement (put behavior here)
function draw() {
  //Draw Background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0,canvas.width,canvas.height);
  ctx.font = "30px Arial";
  ctx.fillText("Target: " + target[0].toUpperCase() +  
  target.slice(1), 10, 50);
  ctx.fillStyle='black';
  ctx.fillText("Lives: " + lives, 200, 50);
  ctx.fillStyle='black';
  ballsFall();
  collision()

  
 

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
//***********
  


function createGameOverScreen(){
  removeGameScreen();
  gameOverScreen = buildDom(`
  
    <div id="game-over-div">

          
          <img class="sad-scientist"src="img/SadScientistPng.png>
          <h1 id="game-over-text">Game Over!</h1>


    </div>
    
    `);

    document.body.appendChild(gameOverScreen);
  return gameOverScreen;
  
}

