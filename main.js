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

 let randomX = Math.floor(Math.random()* 480) + 20;
  

  let ball1 = new Ball(randomX, 0, 0, 5, 25, "#2e7d32")

  //Move Ball (put behavior here)
function update() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball1.draw();
    ball1.x += ball1.vx;
    ball1.y += ball1.vy;
    //Test behavior
    if(ball1.y === canvas.height){
        console.log('clear')
    }
  }
  //Open Loop 
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
})

  


