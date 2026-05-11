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
        this.cameras.main.setBackgroundColor('#1f130b');

        const art = this.add.image(width / 2, height / 2, 'gameOverArt').setOrigin(0.5);
        const fitScale = Math.min(width / art.width, height / art.height);
        art.setScale(fitScale);

        this.add.text(width * 0.5, height * 0.12, `Score: ${this.finalScore}`, {
            fontFamily: 'Georgia, Times New Roman, serif',
            fontSize: `${Math.max(28, Math.floor(height * 0.05))}px`,
            color: '#fff0d6',
            stroke: '#4a220d',
            strokeThickness: 7,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Normalized button area from the provided artwork.
        const buttonZone = this.add.zone(
            width / 2 + (art.width * fitScale * 0.073),
            height / 2 + (art.height * fitScale * 0.247),
            art.width * fitScale * 0.43,
            art.height * fitScale * 0.2
        )
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const ctaHint = this.add.text(width / 2, buttonZone.y + buttonZone.height * 0.82, 'Clique em VOLTAR AO MENU', {
            fontFamily: 'Georgia, Times New Roman, serif',
            fontSize: `${Math.max(14, Math.floor(height * 0.023))}px`,
            color: '#ffe0b4',
            stroke: '#3f220f',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const pulse = this.tweens.add({
            targets: ctaHint,
            alpha: { from: 1, to: 0.45 },
            duration: 750,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        buttonZone.on('pointerover', () => {
            this.sys.canvas.style.cursor = 'pointer';
        });

        buttonZone.on('pointerout', () => {
            this.sys.canvas.style.cursor = 'default';
        });

        buttonZone.on('pointerdown', () => {
            pulse.stop();
            this.sys.canvas.style.cursor = 'default';
            this.scene.start('StartScreen');
        });
    }
}
