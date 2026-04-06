export class StartScreen extends Phaser.Scene {
    constructor() {
        super('StartScreen');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Inspired by the provided ESPM visual reference.
        this.add.rectangle(width / 2, height / 2, width, height, 0xb1003b).setDepth(-3);
        this.add.rectangle(width / 2, height / 2, width * 0.86, height * 0.72, 0xc00045, 0.35).setDepth(-2);

        // Title text
        const titleText = this.add.text(width / 2, height / 2 - 120, 'ESPM NINJA', {
            fontFamily: 'Bodoni MT, Didot, Georgia, Times New Roman, serif',
            fontSize: '96px',
            color: '#f3f3f3',
            fontStyle: 'bold',
            stroke: '#8f0032',
            strokeThickness: 4,
            shadow: {
                offsetX: 0,
                offsetY: 5,
                color: '#000000',
                blur: 6,
                fill: true
            }
        }).setOrigin(0.5);

        if (titleText.setLetterSpacing) {
            titleText.setLetterSpacing(6);
        }

        this.add.text(width / 2, height / 2 - 62, 'ARTE DA PRECISAO', {
            fontFamily: 'Bodoni MT, Didot, Georgia, Times New Roman, serif',
            fontSize: '24px',
            color: '#f3f3f3',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Layered start button for a richer visual style.
        const buttonWidth = 320;
        const buttonHeight = 92;
        const buttonColor = 0xf3f3f3;
        const buttonHoverColor = 0xffffff;

        const buttonShadow = this.add.rectangle(width / 2, height / 2 + 84, buttonWidth, buttonHeight, 0x000000, 0.35)
            .setOrigin(0.5);

        const buttonRect = this.add.rectangle(width / 2, height / 2 + 78, buttonWidth, buttonHeight, buttonColor)
            .setStrokeStyle(5, 0x8f0032)
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5);

        const buttonHighlight = this.add.rectangle(width / 2, height / 2 + 56, buttonWidth - 18, 22, 0xffffff, 0.16)
            .setOrigin(0.5);

        // Start Button Text
        const buttonText = this.add.text(width / 2, height / 2 + 78, 'JOGAR', {
            fontFamily: 'Bodoni MT, Didot, Georgia, Times New Roman, serif',
            fontSize: '38px',
            color: '#980037',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 146, 'Clique para iniciar sua jornada', {
            fontFamily: 'Bodoni MT, Didot, Georgia, Times New Roman, serif',
            fontSize: '18px',
            color: '#f9dbe7'
        }).setOrigin(0.5);

        const idlePulse = this.tweens.add({
            targets: [buttonRect, buttonHighlight, buttonText],
            scaleX: 1.03,
            scaleY: 1.03,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Button Interactions
        buttonRect.on('pointerover', () => {
            buttonRect.setFillStyle(buttonHoverColor);
            buttonShadow.setAlpha(0.5);
            buttonHighlight.setAlpha(0.28);
            this.sys.canvas.style.cursor = 'pointer';
        });

        buttonRect.on('pointerout', () => {
            buttonRect.setFillStyle(buttonColor);
            buttonShadow.setAlpha(0.35);
            buttonHighlight.setAlpha(0.16);
            this.sys.canvas.style.cursor = 'default';
        });

        buttonRect.on('pointerdown', () => {
            idlePulse.stop();
            this.tweens.add({
                targets: [buttonRect, buttonText, buttonHighlight],
                scaleX: 0.96,
                scaleY: 0.96,
                duration: 80,
                yoyo: true,
                onComplete: () => {
                    // Transition to Game scene
                    this.scene.start('Game');
                    this.sys.canvas.style.cursor = 'default';
                }
            });
        });
    }
}
