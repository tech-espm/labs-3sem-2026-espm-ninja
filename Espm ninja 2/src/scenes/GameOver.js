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

        // Inverted palette relative to the start screen.
        this.add.rectangle(width / 2, height / 2, width, height, 0xffffff).setDepth(-3);
        this.add.rectangle(width / 2, height / 2, width * 0.86, height * 0.72, 0xf7f7f7, 0.9).setDepth(-2);
        this.addWornPaperTexture(width, height);

        // "JOGADOR ELIMINADO" Text
        const failText = this.add.text(width / 2, height / 2 - 110, 'REPROVADO!', {
            fontFamily: 'Bodoni MT, Didot, Georgia, Times New Roman, serif',
            fontSize: '90px',
            color: '#b1003b',
            stroke: '#ffffff',
            strokeThickness: 2,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        if (failText.setLetterSpacing) {
            failText.setLetterSpacing(5);
        }

        // Final Score display (Optional but nice)
        this.add.text(width / 2, height / 2, `Score: ${this.finalScore}`, {
            fontFamily: 'Bodoni MT, Didot, Georgia, Times New Roman, serif',
            fontSize: '32px',
            color: '#b1003b',
            stroke: '#ffffff',
            strokeThickness: 2,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Menu Button Rectangle
        const buttonWidth = 350;
        const buttonHeight = 80;
        const buttonColor = 0xb1003b;
        const buttonHoverColor = 0x980033;

        const buttonShadow = this.add.rectangle(width / 2, height / 2 + 107, buttonWidth, buttonHeight, 0x000000, 0.18)
            .setOrigin(0.5);

        const buttonRect = this.add.rectangle(width / 2, height / 2 + 100, buttonWidth, buttonHeight, buttonColor)
            .setStrokeStyle(4, 0x7d002a)
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5);

        // Menu Button Text
        const buttonText = this.add.text(width / 2, height / 2 + 100, 'VOLTAR AO MENU', {
            fontFamily: 'Bodoni MT, Didot, Georgia, Times New Roman, serif',
            fontSize: '28px',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#7d002a',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Button Interactions
        buttonRect.on('pointerover', () => {
            buttonRect.setFillStyle(buttonHoverColor);
            buttonShadow.setAlpha(0.28);
            this.sys.canvas.style.cursor = 'pointer';
        });

        buttonRect.on('pointerout', () => {
            buttonRect.setFillStyle(buttonColor);
            buttonShadow.setAlpha(0.18);
            this.sys.canvas.style.cursor = 'default';
        });

        buttonRect.on('pointerdown', () => {
            this.sys.canvas.style.cursor = 'default';
            this.scene.start('StartScreen');
        });
    }

    addWornPaperTexture(width, height) {
        // Soft edge darkening to mimic old, handled paper.
        this.add.rectangle(width / 2, 26, width, 52, 0xb1003b, 0.1).setDepth(-1.95);
        this.add.rectangle(width / 2, height - 26, width, 52, 0xb1003b, 0.1).setDepth(-1.95);
        this.add.rectangle(26, height / 2, 52, height, 0xb1003b, 0.08).setDepth(-1.95);
        this.add.rectangle(width - 26, height / 2, 52, height, 0xb1003b, 0.08).setDepth(-1.95);

        // Uneven paper stains.
        for (let i = 0; i < 140; i++) {
            const x = Phaser.Math.Between(40, width - 40);
            const y = Phaser.Math.Between(40, height - 40);
            const r = Phaser.Math.FloatBetween(2, 8);
            this.add.circle(x, y, r, 0xe4c6d1, Phaser.Math.FloatBetween(0.04, 0.1))
                .setDepth(-1.86);
        }

        // Text-like faded lines to suggest old manuscript impression.
        for (let i = 0; i < 30; i++) {
            const x = Phaser.Math.Between(120, width - 120);
            const y = Phaser.Math.Between(90, height - 90);
            const len = Phaser.Math.Between(120, 340);
            this.add.rectangle(x, y, len, Phaser.Math.Between(2, 4), 0xb1003b, Phaser.Math.FloatBetween(0.06, 0.16))
                .setAngle(Phaser.Math.Between(-10, 10))
                .setDepth(-1.8);
        }

        // Worn frame similar to old cover embossing.
        this.add.rectangle(width / 2, height / 2, width * 0.9, height * 0.78)
            .setStrokeStyle(4, 0xb1003b, 0.2)
            .setDepth(-1.7);
    }
}
