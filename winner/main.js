let canvas = document.getElementById('maincanvas');
let ctx = canvas.getContext('2d');

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

let renderer=new Renderer();
let camera=new Camera(0, -3, 1600, 900);
//инициализация движка

var rightPressed=false;
var leftPressed=false;
var jumpPressed=false;
var timeJumpPressed=false;
var gravityModulePressed=false;
var gravityActivated=false;
var attackPressed=false;

function keyDownHandler(e){
  let keyCode=e.keyCode;
  switch(keyCode){
    case 65:
      if(!leftPressed){
        leftPressed=true;
        player.setAnimation("walk");
      }
      player.accelerationX=-0.5;
    break;
    case 68:
      if(!rightPressed){
        rightPressed=true;
        player.setAnimation("walk");
      }
      player.accelerationX=0.5;
    break;
    case 32:
      if(!jumpPressed && player.speedY<0.2){
        jumpPressed=true;
        player.speedY=-7;
      }
    break;
    case 84:
      if(!timeJumpPressed){
        player.setAnimation("timeTravel");
        player.maxSpeed=0;
        player.width=100;
        player.height=100;
        player.x+=15;
        player.y+=35;
        player.physics=false;
      }
    break;
    case 71:
      if(!gravityModulePressed){
        if(!gravityActivated){
          renderer.setGravity(0.001);
          gravityActivated=true;
        }else{
          renderer.setGravity(0.02);
          gravityActivated=false;
        }
      }
      console.log(renderer.gravity);
    break;
    case  88:
      if(!attackPressed){
        object=new GameObject(player.x+player.width-20, player.y+player.height/2+10, 100, 30, "sprites/bullets/0.png", true, false, true, 14);
        object.accelerationX=0.3;
        player.setAnimation("attack");
        object.addAnimation(new Animation("default", 1, "sprites/bullets/", 0));
        object.addAnimation(new Animation("boom", 10, "sprites/effects/explose/", 4));
        object.setAnimation("default");
        object.onCollision=function(objects){
          this.collision=false;
          this.width=70;
          this.height=70;
          this.y-=30;
          this.x+=50;
          this.setAnimation("boom");
          if(objects.indexOf(15)!=-1){
            renderer.objects[15].drawble=false;
            renderer.objects[15].destroyed=true;
            if(renderer.objects[14].drawble){
              gameWorldObjects[0].texture.src="sprites/houses/towerAlt.png";
              gameWorldObjects[0].width=200;
              gameWorldObjects[0].height+=30;
              gameWorldObjects[0].y-=30;
              gameWorldObjects[0].x+=50;
            }else{
              gameWorldObjects[0].drawble=false;
              gameWorldObjects[0].destroyed=true;
            }
          }
          if(objects.indexOf(14)!=-1){
            renderer.objects[14].drawble=false;
            renderer.objects[14].destroyed=true;
            if(renderer.objects[14].drawble){
              gameWorldObjects[0].texture.src="sprites/houses/towerAlt.png";
              gameWorldObjects[0].width=200;
            }else{
              gameWorldObjects[0].drawble=false;
              gameWorldObjects[0].destroyed=true;
            }
          }
          if(objects.indexOf(22)!=-1){
            npc.setAnimation("dying");
          }
        }
        renderer.addObject(object);
        bullets.push(object);
      }
      attackPressed=true;
    break;
  }
}

function keyUpHandler(e){
  let keyCode=e.keyCode;
  switch(keyCode){
    case 65:
      leftPressed=false;
      player.setAnimation("default");
      player.accelerationX=-0.5;
    break;
    case 68:
      rightPressed=false;
      player.setAnimation("default");
      player.accelerationX=0.5;
    break;
    case 32:
      jumpPressed=false;
    break;
    case 84:
      timeJumpPressed=false;
    break;
    case 71:
      gravityModulePressed=false;
    break;
    case 88:
      attackPressed=false;
    break;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//инициализация управления

let bg=new GameObject(0, 0, 1600, 900, "sprites/background.png", false, false, false, 0);
let ground=new GameObject(0, 770, 1600, 130, "sprites/ground.png", false, false, true, 0);
let gameWorldObjects=new Array();
gameWorldObjects[0]=new GameObject(450, 430, 430, 350, "sprites/houses/houseAlt2.png", false, false, true, 0);
gameWorldObjects[1]=new GameObject(1450, 450, 130, 320, "sprites/portal.png", false, false, true, 5);
gameWorldObjects[2]=new GameObject(300, 530, 120, 250, "sprites/world/treeSmall_green3.png", false, false, false, 0);
gameWorldObjects[3]=new GameObject(1100, 530, 140, 250, "sprites/world/treeDead.png", false, false, false, 0);
gameWorldObjects[4]=new GameObject(900, 530, 80, 250, "sprites/world/treeSmall_greenAlt1.png", false, false, false, 0);
gameWorldObjects[5]=new GameObject(1300, 530, 100, 250, "sprites/world/tree.png", false, false, false, 0);
let clouds=new Array();
clouds[0]=new GameObject(-100, 100, 200, 140, "sprites/clouds/cloud1.png", false, false, false, 10);
clouds[1]=new GameObject(300, 50, 150, 90, "sprites/clouds/cloud2.png", false, false, false, 10);
clouds[2]=new GameObject(600, 120, 100, 60, "sprites/clouds/cloud4.png", false, false, false, 10);
clouds[3]=new GameObject(900, 70, 200, 100, "sprites/clouds/cloud6.png", false, false, false, 10);
clouds[4]=new GameObject(1200, 30, 130, 70, "sprites/clouds/cloud7.png", false, false, false, 10);
clouds[5]=new GameObject(1500, 40, 150, 90, "sprites/clouds/cloud9.png", false, false, false, 10);
let player=new GameObject(100, 550, 130, 200, "sprites/player/idle/1.png", true, true, true, 5);
player.onCollision=function(objects){
  if(objects.indexOf(2)!=-1){
      player.drawble=false;
      gameWorldObjects[1].accelerationY=-0.02;
  }
}
//инициализация игровых объектов

renderer.addObject(bg);
for (let gameObjsInit=0; gameObjsInit<=5; gameObjsInit++){
  renderer.addObject(gameWorldObjects[gameObjsInit]);
}
for (let cloudsInit=0; cloudsInit<=5; cloudsInit++){
  renderer.addObject(clouds[cloudsInit]);
  clouds[cloudsInit].speedX=randomInteger(1, 4);
}
renderer.addObject(ground);
renderer.addCam(camera);
renderer.setGravity(0.02);
//создание мира(сейчас)

let pasteWorldObjects=new Array();
pasteWorldObjects[0]=new GameObject(800, 680, 70, 110, "sprites/world/barrelGrey_sde_rust.png", false, false, true, 0);
pasteWorldObjects[1]=new GameObject(600, 680, 70, 110, "sprites/world/barrelGrey_side.png", false, false, true, 0);
pasteWorldObjects[2]=new GameObject(300, 530, 120, 250, "sprites/world/treeSmall_green3.png", false, false, false, 0);
pasteWorldObjects[3]=new GameObject(1100, 530, 140, 250, "sprites/world/tree.png", false, false, false, 0);
pasteWorldObjects[4]=new GameObject(900, 530, 80, 250, "sprites/world/treeSmall_greenAlt1.png", false, false, false, 0);
pasteWorldObjects[5]=new GameObject(1300, 530, 100, 250, "sprites/world/tree.png", false, false, false, 0);
pasteWorldObjects[6]=new GameObject(460, 660, 120, 120, "sprites/world/waterWheel.png", false, false, false, 0);
for(let init=0; init<=6; init++){
  pasteWorldObjects[init].drawble=false;
  let id=renderer.addObject(pasteWorldObjects[init]);
}
let plane=new GameObject(300, 250, 100, 60, "sprites/planes/green/0.png", true, false, true, 10);
plane.addAnimation(new Animation("fly", 3, "sprites/planes/green/", 7));
plane.setAnimation("fly");
plane.speedX=5;
renderer.addObject(plane);
gameWorldObjects[1].onCollision=function(objects){
  if(objects.indexOf(21)!=-1){
    clearInterval(inter);
    alert("Ваша ракета врезалась в самолёт! Вы проиграли!");
  }
}
plane.onCollision=function(objects){
  if(objects.indexOf(2)!=-1){
    clearInterval(inter);
    alert("Ваша ракета врезалась в самолёт! Вы проиграли!");
  }
}
//мир в прошлом

let npc=new GameObject(1200, 550, 150, 150, "sprites/npc/golems/Golem_01/Idle/0.png", true, true, true, 3);
npc.addAnimation(new Animation("idle", 12, "sprites/npc/golems/Golem_01/Idle/", 4));
npc.addAnimation(new Animation("dying", 15, "sprites/npc/golems/Golem_01/Dying/", 4));
npc.setAnimation("idle");
npc.destroyed=false;

renderer.addObject(npc);
renderer.addObject(player);
renderer.addObject(ground);


player.addAnimation(new Animation("default", 1, "sprites/player/idle/", 0));
player.addAnimation(new Animation("walk", 8, "sprites/player/walk/", 4));
player.addAnimation(new Animation("run", 3, "sprites/player/run/", 5));
player.addAnimation(new Animation("timeTravel", 6, "sprites/effects/smokeWhite/", 10));
player.addAnimation(new Animation("attack", 3, "sprites/player/attack/", 8));
player.setAnimation("default");

var playerInPaste=false;
var bullets=new Array();

function test(){
  renderer.update(ctx, renderer);
  for (let cloudsInit=0; cloudsInit<=5; cloudsInit++){
    if(clouds[cloudsInit].x>1600){
      clouds[cloudsInit].x=-200;
      clouds[cloudsInit].speedX=randomInteger(1, 4);
    }
  }
  if(gameWorldObjects[1].y<-150){
    clearInterval(inter);
    alert("Вы прошли уровень!");
  }
  if(plane.x>1600){
    plane.x=-150;
  }
  if(!leftPressed && !rightPressed && player.speedX!=0){
    if(player.speedX>0){
      player.accelerationX=-0.6;
    }
    if(player.speedX<0){
      player.accelerationX=0.6;
    }
    if(player.speedX>0 && player.speedX<1){
      player.accelerationX=0;
      player.speedX=0;
    }
    if(player.speedX<0 && player.speedX > -1){
      player.accelerationX=0;
      player.speedX=0;
    }
  }
  if(player.anim=="timeTravel" && player.frame==5){
      player.physics=true;
      if(playerInPaste){
        for(let init=0; init<=6; init++){
          if(init!=6){
            pasteWorldObjects[init].drawble=false;
            if(init==0){
              if(!gameWorldObjects[init].destroyed){
                gameWorldObjects[init].drawble=true;
              }
            }else{
              gameWorldObjects[init].drawble=true;
            }
          }else{
            pasteWorldObjects[init].drawble=false;
          }
          npc.drawble=false;
          bg.texture.src="sprites/background.png";
        }
        player.maxSpeed=5;
        playerInPaste=false;
        plane.drawble=true;
        if(!npc.destroyed){
          npc.drawble=true;
        }
      }else{
        plane.drawble=false
        npc.drawble=false;
        for(let init=0; init<=6; init++){
          if(init!=6){
            if(init==0 || init==1){
              if(!pasteWorldObjects[init].destroyed){
                pasteWorldObjects[init].drawble=true;
              }
            }else{
              pasteWorldObjects[init].drawble=true;
            }
            gameWorldObjects[init].drawble=false;
          }else{
            pasteWorldObjects[init].drawble=true;
          }
          bg.texture.src="sprites/background_paste.jpg";
        }
        player.maxSpeed=5;
        playerInPaste=true;
      }
      player.width=130;
      player.height=200;
      player.x-=15;
      player.y-=150;
      player.setAnimation("default");
  }
  if(player.anim=="attack" && player.frame==2){
    if(player.speedX==0){
      player.setAnimation("default");
    }else{
      player.setAnimation("walk");
    }
  }
  if(bullets.length!=0){
    for(let init=0; init<bullets.length; init++){
      if(bullets[init].anim=="boom" && bullets[init].frame==9){
        bullets[init].drawble=false;
      }
    }
  }
  if(npc.anim=="dying" && npc.frame==14){
    npc.drawble=false;
    npc.destroyed=true;
  }
}

var inter=setInterval(test, 15);
