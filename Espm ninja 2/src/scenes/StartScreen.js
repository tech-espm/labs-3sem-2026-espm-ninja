export class StartScreen extends Phaser.Scene {
    constructor() {
        super('StartScreen');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Title text
        this.add.text(width / 2, height / 2 - 100, 'ESPM NINJA 2', {
            fontFamily: 'Arial',
            fontSize: '64px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Start Button Rectangle
        const buttonWidth = 250;
        const buttonHeight = 80;
        const buttonColor = 0x4CAF50; // Greenish
        const buttonHoverColor = 0x45a049;

        const buttonRect = this.add.rectangle(width / 2, height / 2 + 50, buttonWidth, buttonHeight, buttonColor)
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5);

        // Start Button Text
        const buttonText = this.add.text(width / 2, height / 2 + 50, 'INICIAR', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Button Interactions
        buttonRect.on('pointerover', () => {
            buttonRect.setFillStyle(buttonHoverColor);
            this.sys.canvas.style.cursor = 'pointer';
        });

        buttonRect.on('pointerout', () => {
            buttonRect.setFillStyle(buttonColor);
            this.sys.canvas.style.cursor = 'default';
        });

        buttonRect.on('pointerdown', () => {
             // Transition to Game scene
            this.scene.start('Game');
            this.sys.canvas.style.cursor = 'default';
        });
    }
}
