class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
     
      form = new Form();
      form.display();
      
      
    }
  }
  play(){
    
    form.hide();
    textSize(18);
    fill("black")
    text("1) Do you think we need to have free lunch meals in our school canteen for the kids who are very poor?  ",5,100);
    var button = createButton('YES');
    button.position(50,150);
    var button2 = createButton('NO');
    button2.position(120,150);
    text("2) Would you be willing to contribute a small amount every month for such a program? ",5,200);
    var button3 = createButton('YES');
    button3.position(50,250);
    var button4 = createButton('NO');
    button4.position(120,250);
    text("3)  How much per month would you be willing to pay?",5,300);
    var button5 = createButton('100');
    button5.position(50,350);
    var button6 = createButton('500');
    button6.position(50,380);
    var button7 = createButton('1000');
    button7.position(50,410);
    var button8 = createButton('MORE');
    button8.position(50,440);


    
    //Player.getPlayerInfo();
    if(allPlayers !== undefined){
        var displayPosition = 130;
        for(var plr in allPlayers){
          if(plr === "player"+player.index){
            fill("red");
          }
          else{
            fill("black")
          }
        
        displayPosition += 20;
        textSize(15);
        text(allPlayers[plr].name+": "+allPlayers[plr].distance,120,displayPosition);
        }  
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance += 50;
        player.update();
    }
  }
}
