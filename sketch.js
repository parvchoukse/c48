var mario,marioImg,ob1Img,ob2Img,bg,bgImg,restart;
var obstaclesGroup;
var score=0;

var play=1;
var end=0;''
var gameState = "play";



function preload(){
  marioImg=loadImage("sprites/mario.png");
  ob1Img=loadImage("sprites/ob1.png");
  ob2Img=loadImage("sprites/ob2.png");
  //load ob3Img,ob4Img

    gameOverImg=loadImage("sprites/gameoverImg.jpg");

    //load restartImg
    restartImg=loadImage("sprites/restart.png")
    //load coinImg;
      coinImg=loadImage("sprites/coins.png")

   bgImg=loadImage("sprites/bg.jpg");
}


function setup() {
  createCanvas(1000,650);
  bg=createSprite(650, 250, 1300, 650);
  bg.addImage(bgImg);
  bg.scale=3.5;
  
  mario=createSprite(60,380,10,10);
  mario.addImage(marioImg);
  mario.scale=0.1;
  //console.log(mario.y);

  ground=createSprite(650,590,1300,10);
  ground.visible=false;

  obstaclesGroup=createGroup();
  coinsGroup=createGroup(); 

  gameOver=createSprite(500,300,10,10);
      gameOver.addImage(gameOverImg);
      gameOver.scale=0.8;
      gameOver.visible=false;             

      restart = createSprite(500,300,10,10);
      restart.addImage(restartImg);
      restart.scale=0.5;
      restart.visible=false;
  
}
          
function draw() {
  background(0); 
  
  bg.velocityX=-5;
  console.log(bg.x);


  if(gameState==="play"){
  if (bg.x<0) {
    bg.x=bg.width/2;
  }

  if(keyDown("space")&& mario.y>=200){
  mario.velocityY=-10;

   }  

  spawnObstacles();
  spawnCoins();
 

  
   if(mario.isTouching(obstaclesGroup)){

    gameState="end";
   }


  }
    else if(gameState==="end"){

      bg.velocityX=0;

     // bg.addImage(gameOverImg);
     // bg.scale=1.0;

      //mario.destroy();

      mario.visible=false;


      
      //mario.velocityY=0;
      gameOver.visible=true;
      restart.visible=true;    
     

      obstaclesGroup.setVelocityXEach(0);
      coinsGroup.setVelocityXEach(0);

      obstaclesGroup.setLifetimeEach(-1);
      coinsGroup.setLifetimeEach(-1);

      if(mousePressedOver(restart)) {
        reset();
      }

  }

  mario.collide (ground);   
   
   //add gravity
   mario.velocityY=mario.velocityY +0.6;

  drawSprites();

}

function spawnObstacles(){

if (frameCount%120===0) {
  obstacle = createSprite(990,580,50,50);
  obstacle.velocityX=-5;

  var rand = Math.round(random(1,2));
  switch(rand){
case 1 : obstacle.addImage(ob1Img);
break;

case 2 : obstacle.addImage(ob2Img);
break;


//case3,case4

  }
  obstacle.scale=0.3;
  obstaclesGroup.add(obstacle);
}
}

  

  function spawnCoins(){

    if (frameCount%100===0) {
      coins = createSprite(990,180,50,50);
      coins.velocityX=-8;

      coins.addImage(coinImg);  
         
      coins.scale=0.1;
      coinsGroup.add(coins);

      mario.depth=coins.depth;
      coins.depth=coins.depth+1;

    }
    }

    function reset(){
      gameState="play";
      obstaclesGroup.destroyEach();
      coinsGroup.destroyEach();
      gameOver.visible=false;
      restart.visible=false;
      //obstaclesGroup.setLifetimeEach(-1);
      //coinsGroup.setLifetimeEach(-1);  
      
      mario.visible=true;

    }
                                      