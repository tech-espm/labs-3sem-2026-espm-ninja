export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // "JOGADOR ELIMINADO" Text
        this.add.text(width / 2, height / 2 - 100, 'REPROVADO!', {
            fontFamily: 'Arial',
            fontSize: '64px',
            color: '#ff4444',
            stroke: '#000000',
            strokeThickness: 8,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Final Score display (Optional but nice)
        this.add.text(width / 2, height / 2, `Score: ${this.finalScore}`, {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Menu Button Rectangle
        const buttonWidth = 350;
        const buttonHeight = 80;
        const buttonColor = 0x4CAF50;
        const buttonHoverColor = 0x45a049;

        const buttonRect = this.add.rectangle(width / 2, height / 2 + 100, buttonWidth, buttonHeight, buttonColor)
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5);

        // Menu Button Text
        const buttonText = this.add.text(width / 2, height / 2 + 100, 'VOLTAR AO MENU', {
            fontFamily: 'Arial',
            fontSize: '28px',
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
            this.sys.canvas.style.cursor = 'default';
            this.scene.start('StartScreen');
        });
    }
}
