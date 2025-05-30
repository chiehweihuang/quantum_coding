var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false // Set to true to visualize physics bodies and zones
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
// Scene properties will be defined in create() using 'this.'

function preload ()
{
    // Create a texture for the player (green 32x32 rectangle)
    let playerGraphics = this.make.graphics({x:0, y:0}, false);
    playerGraphics.fillStyle(0x00ff00); // Green color
    playerGraphics.fillRect(0, 0, 32, 32);
    playerGraphics.generateTexture('playerTexture', 32, 32);
    playerGraphics.destroy();

    // Create textures for the Quantum Gate states
    let gateGraphics = this.make.graphics({x:0, y:0}, false);
    gateGraphics.fillStyle(0x0000ff, 0.5); // Blue color, 0.5 alpha
    gateGraphics.fillRect(0, 0, 32, 100); // x, y, width, height
    gateGraphics.generateTexture('gateUnobservedTexture', 32, 100);
    gateGraphics.clear();
    gateGraphics.fillStyle(0xff0000, 1.0); // Red color, 1.0 alpha
    gateGraphics.fillRect(0, 0, 32, 100);
    gateGraphics.generateTexture('gateObservedTexture', 32, 100);
    gateGraphics.destroy();

    // Create texture for Info Spot (yellow 16x16 circle)
    let circleGraphics = this.make.graphics({x:0,y:0}, false);
    circleGraphics.fillStyle(0xffff00); // Yellow color
    circleGraphics.fillCircle(8, 8, 8); // cx, cy, radius
    circleGraphics.generateTexture('infoSpotTexture', 16, 16);
    circleGraphics.destroy();
}

function create ()
{
    // Set background color to dark gray
    this.cameras.main.setBackgroundColor(0x333333);

    // Player
    this.player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'playerTexture');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Quantum Gate
    this.quantumGate = this.physics.add.sprite(600, 300, 'gateUnobservedTexture');
    this.quantumGate.body.setImmovable(true);
    this.quantumGate.body.setAllowGravity(false);
    this.quantumGate.body.setEnable(false);

    // Observation Zone
    this.observationZone = this.physics.add.zone(500, 300).setSize(100, 200);
    this.observationZone.body.setAllowGravity(false);
    this.observationZone.body.moves = false;

    // Collider for player and gate
    this.gateCollider = this.physics.add.collider(this.player, this.quantumGate);
    this.gateCollider.active = false;
    this.isObserving = false;

    // Info Spot
    this.infoSpot = this.physics.add.sprite(200, 300, 'infoSpotTexture');
    this.infoSpot.body.setImmovable(true);
    this.infoSpot.body.setAllowGravity(false); // Typically info spots don't fall

    // Dialogue UI
    this.dialogueBox = this.add.graphics();
    // Style and draw the box
    this.dialogueBox.fillStyle(0x222222, 0.9); // Dark gray, 90% alpha
    this.dialogueBox.fillRect(50, 500, 700, 80); // x, y, width, height
    this.dialogueBox.lineStyle(2, 0xeeeeee, 1); // Border: thickness, color, alpha
    this.dialogueBox.strokeRect(50, 500, 700, 80);
    this.dialogueBox.setVisible(false);
    this.dialogueBox.setScrollFactor(0); // Keep dialogue box fixed on screen

    this.dialogueText = this.add.text(70, 515, '', {
        fontFamily: 'Arial', // Using Arial, common fallback
        fontSize: '16px',
        fill: '#ffffff',
        wordWrap: { width: 660 } // width - padding (50 + 700 - 70 - some margin)
    });
    this.dialogueText.setVisible(false);
    this.dialogueText.setScrollFactor(0); // Keep dialogue text fixed on screen

    // Interaction
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.isDialogueVisible = false;
}

function update ()
{
    // Player movement logic
    this.player.setVelocity(0);
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
    }
    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
    }

    // Observation logic
    var isCurrentlyOverlappingGateZone = this.physics.overlap(this.player, this.observationZone);
    if (isCurrentlyOverlappingGateZone && !this.isObserving) {
        this.isObserving = true;
        this.quantumGate.setTexture('gateObservedTexture');
        this.quantumGate.body.setEnable(true);
        this.gateCollider.active = true;
    } else if (!isCurrentlyOverlappingGateZone && this.isObserving) {
        this.isObserving = false;
        this.quantumGate.setTexture('gateUnobservedTexture');
        this.quantumGate.body.setEnable(false);
        this.gateCollider.active = false;
    }

    // Dialogue Interaction Logic
    var canInteractWithInfoSpot = this.physics.overlap(this.player, this.infoSpot);

    if (canInteractWithInfoSpot && Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        if (!this.isDialogueVisible) {
            this.dialogueText.setText("The world is strange... observe closely. The gate changes when you're near that other zone.");
            this.dialogueBox.setVisible(true);
            this.dialogueText.setVisible(true);
            this.isDialogueVisible = true;
        } else {
            this.dialogueBox.setVisible(false);
            this.dialogueText.setVisible(false);
            this.isDialogueVisible = false;
        }
    }
}
