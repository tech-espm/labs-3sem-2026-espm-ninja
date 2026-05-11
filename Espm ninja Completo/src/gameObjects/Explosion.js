import ASSETS from '../assets.js';

export default class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'explosion');
        scene.add.existing(this);
        
        // Crie e inicie a animação de explosão se ela existir (ou apenas adicione um efeito visual simples se não tiver sprite sheet de explosão)
        // Por exemplo, podemos criar várias pequenas "partículas" (pedaços da fruta)
        this.createParticles(scene, x, y);
        
        // Destruir este sprite base já que usaremos partículas
        this.destroy();
    }

    createParticles(scene, x, y) {
        // Criar um emissor de partículas
        const emitter = scene.add.particles(x, y, ASSETS.spritesheet.tiles.key, {
            frame: [13, 14, 25], // Frames de frutas aleatórias para parecer pedaços
            scale: { start: 0.5, end: 0 }, // Começa pequeno e encolhe
            speed: { min: 100, max: 300 }, // Velocidade de explosão
            angle: { min: 0, max: 360 }, // Explode em todas as direções
            gravityY: 300, // Partículas caem
            lifespan: 800, // Duração das partículas
            quantity: 8, // Quantidade de pedaços
            blendMode: 'ADD'
        });

        // O emissor só emite uma vez (explosão)
        emitter.explode();
        
        // Destruir o emissor após a animação
        scene.time.delayedCall(1000, () => {
            emitter.destroy();
        });
    }
}
