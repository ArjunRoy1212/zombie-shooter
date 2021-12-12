var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var count = 0
var score = 0
var gamestate = 0

var bulletcount =11
var zombiecount=0

function preload() {

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bulletImg = loadImage("assets/bullet.png")

  resetImg = loadImage("assets/reset.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1


  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  //player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)


  //creating sprites to depict lives remaining
  heart1 = createSprite(displayWidth - 150, 40, 20, 20)
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth - 100, 40, 20, 20)
  heart2.visible = false
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth - 150, 40, 20, 20)
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4


  //creating group for zombies    
  zombieGroup = new Group();
  bulletGroup = new Group();

  resetB = createImg('assets/reset.png')
  resetB.size(100, 100)
  resetB.position(width / 2, height / 2)
  resetB.hide()


}

function draw() {
  background(0);

  drawSprites();

  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)


  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
    createBullet()
    bulletcount -= 1
  }

  if (zombieGroup.isTouching(bulletGroup)) {
    for (var i = 0; i < zombieGroup.length; i++) {

      if (zombieGroup[i].isTouching(bulletGroup)) {
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score = score + 2
        zombiecount += 1
        
      }
    }
  }
  //destroy zombie when player touches it
  if (zombieGroup.isTouching(player)) {
    
    for (var i = 0; i < zombieGroup.length; i++) {

      if (zombieGroup[i].isTouching(player)) {
        zombieGroup[i].destroy()
        count += 1
      }
    }
  }

  if (count == 1) {
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if (count == 2) {
    heart2.visible = false
    heart1.visible = true
    heart3.visible = false
  }
  if (count == 3 || bulletcount<=0 ) {
    heart2.visible = false
    heart1.visible = false
    heart3.visible = false
    //console.log("gs end")

    gamestate = 1
  }

  if(zombiecount == 10){
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
    player.destroy()

    textSize(45)
    fill("red")
    text("WELL DONE YOU WON!!! PRESS RESET TO PLAY AGAIN", 120, displayHeight/2-100)
   
    resetB.show()

    resetB.mouseClicked(() => {
      location.reload()
    })
  }

  if (gamestate == 1) {
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
    player.destroy()

    //resetButton=createSprite(width/2,height/2)
    //resetButton.addImage(resetImage)

    resetB.show()

    resetB.mouseClicked(() => {
      location.reload()
    })


  }


  //calling the function to spawn zombies
  enemy();

  textSize(30)
  fill("red")
  text("Score : " + score, displayWidth/2, 40)
  
  text("No. of Bullets Left : " + bulletcount , displayWidth/2,80)
  
  text("No. of Zombies Killed : " + zombiecount , displayWidth/2, 120)

  fill("white")
  text("*** KILL 20 zombies to WIN ***" , 20, 40  )
}



//creating function to spawn zombies
function enemy() {
  if (frameCount % 50 === 0) {

    //giving random x and y positions for zombie to appear
    zombie = createSprite(width + 50, random(100, 500), 40, 40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    //zombie.debug = true
    zombie.setCollider("rectangle", 0, 0, 400, 400)

    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }

}

function createBullet() {


  //giving random x and y positions for zombie to appear
  bullet = createSprite(player.x + 50, player.y - 30)

  bullet.addImage(bulletImg)
  bullet.scale = 0.13
  bullet.velocityX = 8
  //bullet.debug= true
  //bullet.setCollider("rectangle",0,0,400,400)

  bullet.lifetime = 400
  bulletGroup.add(bullet)


}