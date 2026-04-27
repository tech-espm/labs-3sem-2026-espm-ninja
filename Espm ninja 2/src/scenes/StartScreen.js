export class StartScreen extends Phaser.Scene {
    constructor() {
        super('StartScreen');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        this.cameras.main.setBackgroundColor('#1f130b');

        const art = this.add.image(width / 2, height / 2, 'startScreenArt').setOrigin(0.5);
        const fitScale = Math.min(width / art.width, height / art.height);
        art.setScale(fitScale);

        // Normalized button area from the provided artwork.
        const buttonZone = this.add.zone(
            width / 2 + (art.width * fitScale * 0.073),
            height / 2 + (art.height * fitScale * 0.232),
            art.width * fitScale * 0.36,
            art.height * fitScale * 0.19
        )
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const ctaHint = this.add.text(buttonZone.x, buttonZone.y + buttonZone.height * 0.78, 'Clique no botão JOGAR', {
            fontFamily: 'Georgia, Times New Roman, serif',
            fontSize: `${Math.max(14, Math.floor(height * 0.026))}px`,
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
            this.tweens.add({
                targets: art,
                scaleX: art.scaleX * 0.98,
                scaleY: art.scaleY * 0.98,
                duration: 85,
                yoyo: true,
                onComplete: () => {
                    this.sys.canvas.style.cursor = 'default';
                    this.scene.start('RulesScreen');
                }
            });
        });
    }
}
