export class RulesScreen extends Phaser.Scene {
    constructor() {
        super('RulesScreen');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.cameras.main.setBackgroundColor('#2a170b');

        const art = this.add.image(width / 2, height / 2, 'rulesArt').setOrigin(0.5);
        const fitScale = Math.min(width / art.width, height / art.height);
        art.setScale(fitScale);

        const artWidth = art.width * fitScale;
        const artHeight = art.height * fitScale;
        const leftPageCenterX = art.x - (artWidth * 0.23);
        const rightPageCenterX = art.x + (artWidth * 0.23);
        const pageTextWidth = Math.floor(artWidth * 0.22);
        const pageTop = art.y - (artHeight * 0.245);
        const pageBottom = art.y + (artHeight * 0.15);
        const titleSize = Math.max(14, Math.floor(artHeight * 0.034));
        const bodySize = Math.max(10, Math.floor(artHeight * 0.025));
        const hintSize = Math.max(20, Math.floor(artHeight * 0.05));

        const titleStyle = {
            fontFamily: 'Georgia, Times New Roman, serif',
            fontSize: `${titleSize}px`,
            color: '#552611',
            fontStyle: 'bold'
        };

        const ruleStyle = {
            fontFamily: 'Georgia, Times New Roman, serif',
            fontSize: `${bodySize}px`,
            color: '#4a2a17',
            lineSpacing: 4,
            wordWrap: { width: pageTextWidth }
        };

        const buildPageText = (centerX, titleText, bodyText) => {
            const title = this.add.text(centerX, pageTop, titleText, titleStyle).setOrigin(0.5, 0);

            let dynamicSize = bodySize;
            const bodyY = title.y + title.height + (artHeight * 0.02);
            const maxBodyHeight = pageBottom - bodyY;
            let dynamicLineSpacing = 4;

            let body = this.add.text(centerX - (pageTextWidth * 0.5), bodyY, bodyText, {
                ...ruleStyle,
                fontSize: `${dynamicSize}px`,
                lineSpacing: dynamicLineSpacing,
                wordWrap: { width: pageTextWidth }
            }).setOrigin(0, 0);

            while (body.height > maxBodyHeight && dynamicSize > 8) {
                dynamicSize -= 1;
                dynamicLineSpacing = Math.max(2, dynamicLineSpacing - 0.5);
                body.destroy();
                body = this.add.text(centerX - (pageTextWidth * 0.5), bodyY, bodyText, {
                    ...ruleStyle,
                    fontSize: `${dynamicSize}px`,
                    lineSpacing: dynamicLineSpacing,
                    wordWrap: { width: pageTextWidth }
                }).setOrigin(0, 0);
            }

            title.setShadow(2, 2, '#f3dcc0', 1, false, true);
            body.setShadow(1, 1, '#f7e6cd', 0.9, false, true);
            return { title, body };
        };

        buildPageText(
            leftPageCenterX,
            'Regras do Desafio',
            '1. Corte apenas os alimentos para pontuar.\n2. Evite as bombas para nao perder vidas.\n3. O jogo termina quando suas vidas acabarem.'
        );

        buildPageText(
            rightPageCenterX,
            'Como Jogar',
            '1. Toque e arraste para fazer o corte.\n2. Seja rapido para acertar mais itens.\n3. Quanto mais pontos, maior o desafio.'
        );

        const startHint = this.add.text(art.x, art.y + (artHeight * 0.45), 'Toque em qualquer lugar para iniciar', {
            fontFamily: 'Georgia, Times New Roman, serif',
            fontSize: `${hintSize}px`,
            color: '#5f2b11',
            stroke: '#f5e2c2',
            strokeThickness: 5,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: startHint,
            alpha: { from: 1, to: 0.4 },
            duration: 850,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}