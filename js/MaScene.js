import Player from './player.js'

export default class MaScene extends Phaser.Scene {
    constructor() {
        super("MaScene");
    }

    preload() {
        Player.preload(this);
        this.load.image('tiles','assets/Nature.png'); //map
        this.load.tilemapTiledJSON('map','assets/nature.json'); //map json
    }
 
    create(){
        const map = this.make.tilemap({key:'map'});
        this.map = map;
        const tileset = map.addTilesetImage('Nature','tiles'); //map
        const layer1 = map.createLayer('Calque de Tuiles 1', tileset , 0 , 0); 
        const layer2 = map.createLayer('Calque de Tuiles 2', tileset , 0 , 0);
        const layer3 = map.createLayer('Calque de Tuiles 3', tileset , 0 , 0);

        //active the collisoner of the layer un proprete layer ture
        layer2.setCollisionByProperty({collision:true});
        this.matter.world.convertTilemapLayer(layer2);
        layer3.setCollisionByProperty({collision:true});
        this.matter.world.convertTilemapLayer(layer3);
        //layer3.setCollisionByProperty({collision:true});


        //create player
        this.player = new Player({scene : this ,x : 200,y : 200,texture :'boy',frame :'boy_idle_down1'}); // player texture and animation

        //The movement of the player
        this.player.inputKeys = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.Z,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.Q,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            attack:Phaser.Input.Keyboard.KeyCodes.E
        });
    }
       
    

    update()  {
        this.player.update();
    }
        
}