import ASSETS from '../assets.js';

export default class Food extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, targetCircle)
    {
        const sceneWidth = scene.scale.width;
        const sceneHeight = scene.scale.height;
        const targetPoint = targetCircle.getRandomPoint();
        // Determine if bomb or big before setting velocity
        const isBomb = Phaser.Math.Between(1, 100) <= 20;
        let isBig = false;
        if (!isBomb && scene.score >= 100) {
             isBig = Phaser.Math.Between(1, 100) <= 15;
        }

        // O impulso de velocidade aumenta conforme a pontuação sobe (para compensar a gravidade maior)
        let speedBoost = (scene.score || 0) * 2.5;
        speedBoost = Math.min(speedBoost, 600); // Limita o bônus máximo de velocidade
        
        let randomVelocity;
        if (isBig) {
            randomVelocity = Phaser.Math.Between(450 + speedBoost, 550 + speedBoost); // Mais lento
        } else {
            randomVelocity = Phaser.Math.Between(600 + speedBoost, 800 + speedBoost); // Normal
        }
        
        // As peças ficam mais espalhadas conforme a pontuação sobe
        let range = 200 + (scene.score || 0) * 1.5;
        range = Math.min(range, 550); // Limita a dispersão para as frutas não saírem muito da tela (1280/2 = 640)
        
        const x = Phaser.Math.Between(- range, range) + (sceneWidth * 0.5);
        const tileIds = [ 13, 14, 15, 25, 42, 43, 58, 87, 88, 92 ];
        super(scene, x, sceneHeight + 100, ASSETS.spritesheet.tiles.key, Phaser.Math.RND.pick(tileIds));

        this.radius = this.width * 0.5;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.moveToObject(this, targetPoint, randomVelocity);
        this.setCircle(this.radius);
        this.setAngularVelocity(Phaser.Math.Between(-300, 300));
        this.scene = scene;

        // Determine if this item is a bomb (20% chance)
        this.isBomb = isBomb;
        this.isBig = isBig;
        this.health = 1;
        this.invulnerable = false; // Prevents being hit multiple times in a single slash

        let glowColor = 0xfff2c7;
        if (this.isBomb) {
            glowColor = 0xff3e3e;
        } else if (this.isBig) {
            glowColor = 0xffd277;
        }

        this.glow = scene.add.ellipse(this.x, this.y, this.displayWidth * 1.45, this.displayHeight * 1.45, glowColor, 0.24)
            .setBlendMode(Phaser.BlendModes.ADD)
            .setDepth(this.depth - 1);

        this.glowPulse = scene.tweens.add({
            targets: this.glow,
            alpha: { from: 0.18, to: 0.34 },
            duration: 360,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        if (this.isBomb) {
            this.setTint(0xff0000); // Red tinted for visual differentiation
        } else if (this.isBig) {
            this.health = 3;
            this.setScale(2);
            this.radius = this.width; // double radius basically because scale is 2
            this.setCircle(this.radius / 2); // setCircle accounts for unscaled width, so use original half-width
        }
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.glow)
        {
            this.glow.setPosition(this.x, this.y);
        }

        if (this.y > this.scene.scale.height + this.height && this.body.velocity.y > 0)
        {
            if (!this.isBomb) {
                // se o jogador deixar cair um item que NÃO é a bomba, perde 1 vida.
                this.scene.loseLife();
            }
            this.scene.removeFood(this);
        }
    }

    checkCollision (points)
    {
        for (let i = 0; i < points.length; i++)
        {
            const x = points[ i ].x;
            const y = points[ i ].y;
            if (this.radius > 0 && x >= this.body.left && x <= this.body.right && y >= this.body.top && y <= this.body.bottom)
            {
                var dx = (this.x - x) * (this.x - x);
                var dy = (this.y - y) * (this.y - y);

                if ((dx + dy) <= (this.radius * this.radius))
                {
                    this.hit();
                    return;
                }
            }
        }
    }

    hit ()
    {
        // Se o item acabou de ser cortado e está invulnerável temporariamente, não faz nada
        if (this.invulnerable) return;

        if (this.isBomb) {
            this.scene.addExplosion(this.x, this.y);
            this.scene.GameOver();
            this.scene.removeFood(this);
        } else {
            if (this.isBig && this.health > 1) {
                this.health--;
                this.invulnerable = true; // Ativa "i-frames"
                
                // Visual feedback: Flash brief white tint
                this.setTintFill(0xffffff);
                this.scene.time.delayedCall(200, () => {
                    this.clearTint();
                    this.invulnerable = false; // Pode tomar dano de novo
                });
                
                // Efeito de "Mola": faz o item parar de ir pros lados e quicar levemente para cima
                this.body.velocity.x = 0;
                this.body.velocity.y = -300; 

            } else {
                if (this.isBig) {
                    this.scene.updateScore(30); // More points for Big Item
                } else {
                    this.scene.updateScore(10);
                }
                this.scene.addExplosion(this.x, this.y);
                this.scene.removeFood(this);
            }
        }
    }

    destroy (fromScene)
    {
        if (this.glowPulse)
        {
            this.glowPulse.stop();
            this.glowPulse = null;
        }

        if (this.glow)
        {
            this.glow.destroy();
            this.glow = null;
        }

        super.destroy(fromScene);
    }
}