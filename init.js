
const config = {
    title: "Hola Phaser",
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        type: Phaser.AUTO,
        parent: "container",
        width: 800,
        height: 600,
    },
    scene: {
        preload,
        create,
        update,
    },
    physics:{
        default: "arcade",
        arcade:{
            gravity:{
                debug:false
            }
        
        }
    }
     
};

 var game = new Phaser.Game(config);

function preload (){
    this.load.image('fondo', 'src/preview.jpg');
    this.load.image('planeta', 'src/volleyball.png');
    //particulas
    this.load.image('particula','src/yellow.png');
    this.load.image('raqueta','src/raqueta.png' );
    this.load.audio('sonido_raqueta', 'src/audio.mp3');
  
    
};
function create (){
    fondo = this.add.image(400, 300,'fondo');

    puntacion = 0;
    
    this.physics.world.setBoundsCollision(true,true,true,false);
    audio_raqueta= this.sound.add('sonido_raqueta');
    fondo.setScale(2);
    raqueta = this.physics.add.image(400,550,'raqueta').setInteractive().setImmovable();
    particulas = this.add.particles('particula');
    var emitter = particulas.createEmitter({
        speed:100,
        scale: {start:1,end:0},
        blendMode:'SCREEN'
    });

    mundo = this.physics.add.image(400, 10, 'planeta');
    //mundo.setAlpha(0.6);//transparencia(???) del objeto
    mundo.setAngle(45);//inclinacion del objeto
    mundo.setScale(0.5);//escala del objeto
    //mundo.setFlipX(true);//gira el objeto
    mundo.setOrigin(0.5, 0.5);//define su espacio programable en el mundo
    mundo.setCollideWorldBounds(true);//define la colicion del objeto en el mundo
    mundo.setBounce(1); //rebote del objeto con collide
    mundo.setVelocity(300,400);
    emitter.startFollow(mundo);//seteamos particules en mundo
    //agregamos un texto
    var texto = this.add.text(340,10, 'Puntos:',{
        color:'white',
        fontSize: 20,
        padding:{
            top:15,
            bottom:15,
            right:15,
            left:15
        },
        fontFamily: 'Verdana, arial, sans-serif',
        align:'center',
    });
    texto.setAlpha(0.6);
    //define entradas
    const entrada_raton = Phaser.Input.Events;
    const entrada_teclas = Phaser.Input.Keyboard.KeyCodes;
   
    //teclas down:40,up:38,left:37,right:39
    tecla_left = this.input.keyboard.addKey(37);
    tecla_right = this.input.keyboard.addKey(39);

    //keypress
   /*
    tecla_left.on('down',()=>{
        console.log('Left');
    });
    tecla_right.on('down',()=>{
        console.log('right');
    });
    */

    //movimiento de la raqueta
    this.input.on('pointermove', function(pointer){
        raqueta.x= pointer.x;
    });

    //cambio de color raqueta al presionarlo
    this.input.on(entrada_raton.GAMEOBJECT_DOWN,(pointer,gameObject)=>{
        gameObject.setTint(0x00ff00);
    });
    this.input.on(entrada_raton.GAMEOBJECT_UP,(pointer,gameObject)=>{
        gameObject.clearTint();
    });

    //añadimos fisicas a la raqueta
    this.physics.add.collider(raqueta,mundo,rebote,null,this);
    function rebote(){
        mundo.setBounce(1)
        audio_raqueta.play();
        puntacion++;
        return texto.setText('Puntos '+puntacion);
    }

};
function update(time, delta){
 mundo.angle+=5;
  if(tecla_right.isDown){
     raqueta.x++;
  }else if(tecla_left.isDown){
    raqueta.x--;
  }

  if(mundo.y>550 ){
    var texto = this.add.text(200,240, 'FIN DEL JUEGO SOQUETE',{
        color:'white',
        fontSize: 30,
        padding:{
            top:15,
            bottom:15,
            right:15,
            left:15
        },
        backgroundColor: 'black',
        fontFamily: 'Verdana, arial, sans-serif',
        align:'center',
    });
  }else{
      console.log("false");
  }
  

 
}; 