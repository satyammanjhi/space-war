var GameState = 1;
var score = 0;

var asteroid1,asteroid2,bg,plane,missile,restart,spp,boom,gameover;
var asteroid1img,asteroid2img,bgimg,planeimg,missileimg,restartimg,boomimg,gameoverimg;
var missileGroup,asteroid1Group,asteroid2Group,invisibleBoundry;


function preload() {
  asteroid1img = loadImage("asteroid-removebg-preview.png");
  planeimg = loadImage("fighter-removebg-preview.png");
  bgimg = loadImage("bg.jpg");
  asteroid2img = loadImage("as1-removebg-preview.png");
  missileimg = loadImage("msi-removebg-preview.png");
  restartimg = loadImage("res-removebg-preview.png");
  spp = loadSound("spp.mp3");
  boomimg = loadImage("download-removebg-preview.png");
  gameoverimg = loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  spp.loop();

  plane = createSprite(width/2, height/2+250, 50, 50);
  plane.addImage(planeimg);
  plane.scale = 0.37;

  invisibleBoundry = createSprite(width/2 ,height/2+180,1500,10);
  invisibleBoundry.visible = false;

  restart = createSprite(width/2,height/2 );
  restart.addImage(restartimg);
  restart.scale = 0.5;
  restart.visible = false;

  gameover = createSprite(width/2,height/2 - 250);
  gameover.addImage(gameoverimg);
  gameover.visible = false;

  asteroid1Group = new Group();
  asteroid2Group = new Group();
  missileGroup = new Group();

}

function draw() {
  background(bgimg);

  stroke(3);
  textSize(20);
  fill("red");
  text("SCORE :"+ score,camera.position.x+500,50);
                                                                                                                       
 if(GameState === 1){
  score = 0;
  gameover.visible = false;
  restart.visible = false;
  
  textSize(50);
  fill("red");
  text("Press Enter To Start ",width/2-200,height/2);

  if(keyWentUp("ENTER")){
    GameState = 2;
  }

 }

  if(GameState === 2){
  plane.x = mouseX;
  spawnasteroid1();
  spawnasteroid2();

  if( keyWentUp("SPACE")){
     Missile();
    }

    if(asteroid1Group.isTouching(missileGroup)){
      missileGroup.destroyEach(); 
      asteroid1Group.destroyEach();  
      score = score+10;
     }
  
     if(asteroid2Group.isTouching(missileGroup)){
      missileGroup.destroyEach(); 
      asteroid2Group.destroyEach();  
      score = score+10;
     }

     if(asteroid1Group.isTouching(invisibleBoundry) || 
      asteroid2Group.isTouching(invisibleBoundry)){
      GameState = 3;
    }
 }

 if(GameState === 3){
  gameover.visible = true;
  restart.visible = true;
  asteroid1Group.destroyEach();
  asteroid2Group.destroyEach();
  if(mousePressedOver(restart)){
    GameState = 1;
  }
 }

  drawSprites();
}

function spawnasteroid1(){
  if(frameCount%100 === 0){
  var asteroidA = createSprite(random(100,width*0.7) ,height/2-400,10,10);
  asteroidA.velocityY = 5;
  asteroidA.addImage(asteroid1img); 
  asteroidA.lifetime = 240;
  asteroidA.scale = 0.27;
  asteroid1Group.add(asteroidA);
  }
}

function spawnasteroid2(){
  if(frameCount%170 === 0){
  var asteroidB = createSprite(random(130,width*0.8) ,height/2-400,10,10);
  asteroidB.velocityY = 5;
  asteroidB.addImage(asteroid2img);
  asteroidB.lifetime = 240;
  asteroidB.scale = 0.2;
  asteroid2Group.add(asteroidB);
  }
}

function Missile(){
  var missile = createSprite(height/2,height/2+200,10,10);
  missile.x = plane.x;
  missile.setCollider("rectangle",0,0,50,50);
  missile.addImage(missileimg);
  missile.velocityY = -25;
  missile.scale = 0.3;
  missileGroup.add(missile);
}