class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.rightArmX = this.bodyX + 115;
        this.rightArmY = this.bodyY + 80;
        this.leftArmX = this.bodyX - 115;
        this.leftArmY = this.bodyY + 80;
        
        this.rightLegX = this.bodyX + 60;
        this.rightLegY = this.bodyY + 140;
        this.leftLegX = this.bodyX - 65;
        this.leftLegY = this.bodyY + 140;

        this.rightEyeX = this.bodyX + 40;
        this.rightEyeY = this.bodyY - 20;
        this.leftEyeX = this.bodyX - 40;
        this.leftEyeY = this.bodyY - 20;


        this.rightAntennaX = this.bodyX + 42;
        this.rightAntennaY = this.bodyY - 80;
        this.leftAntennaX = this.bodyX - 42;
        this.leftAntennaY = this.bodyY - 80;

        this.fangsX = this.bodyX + 0;
        this.fangsY = this.bodyY + 30;   

        this.smileX = this.fangsX;
        this.smileY = this.fangsY;

        this.spaceKey = null;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_darkD.png");
        
        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_darkA.png");
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_darkA.png");
        this.my.sprite.leftArm.flipX = true;
        
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_darkA.png");
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_darkA.png");
        this.my.sprite.leftLeg.flipX = true;

        my.sprite.rightEye = this.add.sprite(this.rightEyeX, this.rightEyeY, "monsterParts", "eye_red.png");
        my.sprite.leftEye = this.add.sprite(this.leftEyeX, this.leftEyeY, "monsterParts", "eye_red.png");
        this.my.sprite.leftEye.flipX = true;

        my.sprite.rightAntenna = this.add.sprite(this.rightAntennaX, this.rightAntennaY, "monsterParts", "detail_dark_horn_large.png");
        my.sprite.leftAntenna = this.add.sprite(this.leftAntennaX, this.leftAntennaY, "monsterParts", "detail_dark_horn_large.png");
        this.my.sprite.leftAntenna.flipX = true;

        my.sprite.fangs = this.add.sprite(this.fangsX, this.fangsY, "monsterParts", "mouth_closed_fangs.png");        
        my.sprite.smile = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouth_closed_happy.png");

        my.sprite.smile.visible = false;

        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);



        this.input.keyboard.on('keydown', (event) =>{
            console.log("RANDOM KEY");
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S){
                my.sprite.smile.visible = true;  
                my.sprite.fangs.visible = false;              // move left
            }else if ((event.keyCode === Phaser.Input.Keyboard.KeyCodes.F)){
                my.sprite.fangs.visible = true; 
                my.sprite.smile.visible = false;  
            }
        })

    }
    moveMonster(dx) {
        let my = this.my;
    
        this.bodyX += dx;
    
        my.sprite.body.x += dx;
    
        my.sprite.rightArm.x += dx;
        my.sprite.leftArm.x += dx;
    
        my.sprite.rightLeg.x += dx;
        my.sprite.leftLeg.x += dx;
    
        my.sprite.rightEye.x += dx;
        my.sprite.leftEye.x += dx;
    
        my.sprite.rightAntenna.x += dx;
        my.sprite.leftAntenna.x += dx;
    
        my.sprite.fangs.x += dx;

        my.sprite.smile.x += dx;
        // this.smileY = this.fangsY;
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability 

        const moveSpeed = 2;

         // Move left while A is held
        if (this.aKey.isDown) {
            this.moveMonster(-moveSpeed);
        }

        // Move right while D is held
        if (this.dKey.isDown) {
            this.moveMonster(moveSpeed);
        }


        
        // //smile
        // if (Phaser.Input.Keyboard.JustDown(this.sKey)) {
        //     console.log("read update ");
        // }
        // if (Phaser.Input.Keyboard.JustUp(this.sKey)){
        //     console.log("done Up");

        // }

        // //fangs
        // if (Phaser.Input.Keyboard.JustDown(this.fKey)) {
        //     console.log("read update ");
        // }
        // if (Phaser.Input.Keyboard.JustUp(this.fKey)){
        //     console.log("done Up");

        // }
        
        // //left 
        // if (Phaser.Input.Keyboard.JustDown(this.aKey)) {
        //     this.bodyX = this.bodyY - 20;
        //     this.bodyY = this.bodyY - 20;
        // }
        // if (Phaser.Input.Keyboard.JustUp(this.aKey)){
        //     this.bodyX = this.bodyY;
        //     this.bodyY = this.bodyY;

        // } 
        
        // //right     
        // if (Phaser.Input.Keyboard.JustDown(this.dKey)) {
        //     this.bodyX = this.bodyY + 20;
        //     this.bodyY = this.bodyY + 20;
        // }
        // if (Phaser.Input.Keyboard.JustUp(this.dKey)){
        //     this.bodyX = this.bodyY;
        //     this.bodyY = this.bodyY;
        // }  

        // this.aKey.on('down', (key, event)=>{
        //     this.moveMonster(-5);  // move left
        //     console.log("ook")


        // })
        // this.dKey.on('down', (key, event)=>{
        //     this.moveMonster(5);  // move right
        //     console.log("ok");

        // })
        

    }}