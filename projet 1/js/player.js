export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data){
        //take back the in creation
        let{scene,x,y,texture,frame} = data;
        //parent
        super(scene.matter.world,x,y,texture,frame);
        //add the character in the scene
        scene.add.existing(this);
        //console.log(this.anims.currentFrame);
        this.setScale(1.5);

        const {Body , Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x,this.y, 8, {isSensor:false, label:'playerCollider'});
        var playerScensor = Bodies.circle(this.x,this.y, 16, {isSensor:true, label:'playerScensor'}); 
        const compoundBody = Body.create({
            parts: [playerCollider,playerScensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
        this.direction = "down"; // at the begining , the character look down
        this.state ="idle"; // at the begining , the character is idling
    }

    static preload(scene) {
        scene.load.atlas('boy',"../assets/boy.png","../assets/boy_atlas.json"); //animation
        scene.load.animation('boy_anim',"../assets/boy_anim.json"); //animation
    }

    create(){
    }
    
    // get the speed
    get velocity(){
        return this.body.velocity;
    } 
    
    update() {

        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
            this.direction = "left";
        }
        else if(this.inputKeys.right.isDown) {
            playerVelocity.x = +1;
            this.direction = "right";
        } 
        else if(this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
            this.direction = "up";
        }
        else if(this.inputKeys.down.isDown) {
            playerVelocity.y = +1;
            this.direction = "down";
        }
        this.anims.play('boy_'+ this.state +'_' + this.direction,true);
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x,playerVelocity.y);

        //this.anims.play('boy_attack_'+ this.direction,true);

        if (this.inputKeys.attack.isDown) {
            this.setVelocity(0, 0); //stop movement
            this.anims.play('boy_attack_'+ this.direction,true); //play anim
            this.state = "attack" ;


            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.state = "idle";   
            return;
        });
    }

        if(Math.abs(this.velocity.x)>0.1 || Math.abs(this.velocity.y)>0.1){
            this.state = "walk";
        } 
        else {
            this.state = "idle";
        }
    }
}