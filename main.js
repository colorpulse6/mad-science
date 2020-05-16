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
        startGame();
      });
    }

    function removeSplashScreen() {
        splashScreen.remove();
      }
  

    createSplashScreen();
    splashScreen.remove()
}
  window.addEventListener("load", main);




//*********Play Game********

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//Generate random Starting Position
var randomX = Math.floor(Math.random()* 480) + 20;
var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

//Ball Class
  class Ball {
      constructor(x, y, vx, vy, radius, color){
          this.x = x;
          this.y = y;
          this.vx = vx;
          this.vy = vy;
          this.radius = radius;
          this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
  }

//Generate Random Balls
let ball;
let ballArray = [];
function generateBalls(){
    
    for (let i=0; i<10; i++){
         ballArray.push(new Ball(0, 0, 0, 5, 20, 'color'))
         
    } 
    for(let i=0;i<ballArray.length;i++){
      ball = ballArray[i]
      //change x and color each iteration
      ball.x = Math.floor(Math.random()* 480) + 20
      ball.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      console.log(randomColor)
    }
    
}


  //Ball Movement (put behavior here)
function update() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    //Test behavior
    if (ball.y === canvas.height){
        console.log('clear')
        generateBalls()
        
    }
  }
  
  //Open Loop 
generateBalls();

let inervalId = setInterval(update, 20);
 




  //Get cursor position
function getCursorPosition(grid, event) {
    const rect = grid.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y)
    console.log(ball.x, ball.y);
    if (x >= ball.x  && x <= ball.x + ball.radius || y >= ball.y  && y <= ball.y + ball.radius)
     {
    console.log('clicked')
    
  }
}

const grid = document.querySelector('#canvas');
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
    //Clear Ball
    ball.radius = 0;
})

  


