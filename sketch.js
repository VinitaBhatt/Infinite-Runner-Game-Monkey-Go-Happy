var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, back, backImage;
var FoodGroup, obstacleGroup;
var restartImg,restart,gameOverImg,gameOver;
var score,survivalTime;

function preload(){
  
   monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backImage=loadImage("jungle.jpg");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameover.png")

}

function setup() {
  createCanvas(600,400);
  
  back=createSprite(300,200);
  back.addImage(backImage);
  back.velocityX=-3;
  back.scale=0.8;
  
  monkey=createSprite(100,340);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,800,10);
  ground.shapeColor="lightgreen";
  ground.velocityX=-5;
  ground.visible=false;
  
  restart = createSprite(300,240);
  restart.addImage(restartImg);
  restart.scale=0.6;
  
  gameOver = createSprite(300,180);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.8;

  FoodGroup =new Group();
  obstaclesGroup =new Group();

  score =0;
  survivalTime=0;
}


function draw() {
  background("black");
  
  if(back.x<150) { 
    back.x=width/2; 
  }
  
  if(gameState===PLAY) {
    
  
    if (keyDown("space") && monkey.y>300) {
      monkey.velocityY=-18;
    } 
  
      monkey.velocityY=monkey.velocityY+1;

    if(ground.x<0){
      ground.x=ground.width/2;
    }
  
   if(obstaclesGroup.isTouching(monkey)) {
        monkey.velocityY = 0;
        ground.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        FoodGroup.destroyEach();
        monkey.scale=0.08;
        FoodGroup.visible=false;
        gameState = END;
   }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+2;
    monkey.scale=0.13;
    }
  
  if (score % 10 === 0){
  switch(score) {
      case 10: monkey.scale=0.10;
              break;
      case 20: monkey.scale=0.12;
              break;
      case 30: monkey.scale=0.14;
              break;
      case 40: monkey.scale=0.16;
              break;
      default: break;
    }
  }
    
  gameOver.visible=false;
  restart.visible=false;
    
    food();
    obstacles();
  }
  else if (gameState === END) {
    
        back.velocityX=0;

    
      obstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
    
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
    
      gameOver.visible=true;
      restart.visible=true;
    
      if (mousePressedOver(restart)) {
       reset();
      }
  }
  
    monkey.collide(ground);
    monkey.collide(obstaclesGroup);
  
    drawSprites();  
  
      textSize(20);
      fill("red");
      survivalTime = Math.round(frameCount/frameRate());
      text("Survival Time: "+survivalTime,10,20);
      text("Score: "+score,510,20);
  
}

function food() {
   
    if (frameCount % 100 === 0) {
      banana = createSprite(600,200);
      banana.addImage(bananaImage);
      banana.scale=0.05 ;
      banana.y = random(120,250);    
      banana.velocityX =-6;
      banana.lifetime=100;
    
      FoodGroup.add(banana);
  
  }
}

function obstacles(){
    if(frameCount % 300 === 0) {
      obstacle = createSprite(600,320);
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.17;
      obstacle.velocityX =-6;
      obstacle.lifetime=100;
      obstacle.setCollider("circle",0,0,200);
      //obstacle.debug=true;
      obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.scale=0.1;
  survivalTime=0;
  score=0;
}


