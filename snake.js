let direction = { x: 0, y: 0 };
const gamemusic = new Audio("music/music.mp3");
const foodmusic = new Audio("music/food.mp3");
const gameover = new Audio("music/gameover.mp3");
const snakemove = new Audio("music/move.mp3");
let speed = 10;
let score = 0;
let lastpainttime = 0;
let snakesize = [{ x: 14, y: 16 }];
let food = { x: 10, y: 12 };

//game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = ctime;
  gameEngine();
}
function iscollide(snake){
 //if you collide with yurself
 for(let index=1;index<snakesize.length;index++){
     if(snake[index].x===snake[0].x &&snake[index].y===snake[0].y){
         speed=10;
         return true;
     }
 }
 if(snake[0].x>=20||snake[0].x<=0 || snake[0].y >=20 ||snake[0].y<=0){
    speed=10;
    return true;
 }
 return false;
}

function gameEngine() {
  //updating snake and food
  if(iscollide(snakesize)){
      gameover.play();
      gamemusic.pause();
      direction={x:0,y:0};
      alert("Game Over,Press any key to continue");
      snakesize=[{x:14,y:16}];
      gamemusic.play();
      score=0;
  }

  //if food is eaten increase the snake size and score
  if(snakesize[0].y===food.y && snakesize[0].x===food.x){
      foodmusic.play();
      score+=100;
      speed+=0.5;
      if(score>hiscoreval){
        hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        hiscorebox.innerHTML="High Score :"+ hiscoreval;
      }

      scorecontainer.innerHTML="Score: "+score;
      snakesize.unshift({x:snakesize[0].x+direction.x,y:snakesize[0].y+direction.y})
      let a=2;
      let b=19;
      food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
  }

  //moving the snake
  for(let i=snakesize.length-2;i>=0;i--){
      snakesize[i+1]={...snakesize[i]};
  }

  snakesize[0].x+=direction.x;
  snakesize[0].y+=direction.y;

  //displaying snake and food

  //snake
  board.innerHTML = "";
  snakesize.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } 
    else {
      snakeElement.classList.add("tail");
    }
    board.appendChild(snakeElement);
  });

  //food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//logic
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
  hiscoreval=0;
  localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
  hiscoreval=JSON.parse(hiscore);
  hiscorebox.innerHTML="High Score: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
  //game starts
  gamemusic.play();
  direction = { x: 0, y: 0 };
  snakemove.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      direction.x=0;
      direction.y=-1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      direction.x=0;
      direction.y=1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      direction.x=-1;
      direction.y=0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      direction.x=1;
      direction.y=0;
      break;
    default:
      break;
  }
});
