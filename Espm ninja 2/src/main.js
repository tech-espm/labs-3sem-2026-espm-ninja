import { Boot } from './scenes/Boot.js';
import { Preloader } from './scenes/Preloader.js';
import { StartScreen } from './scenes/StartScreen.js';
import { Game } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#2d3436',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 400 } // Reduced gravity so objects float slower
        }
    },
    scene: [
        Boot,
        Preloader,
        StartScreen,
        Game,
        GameOver
    ]
};

new Phaser.Game(config);
