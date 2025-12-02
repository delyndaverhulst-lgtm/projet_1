import MaScene from "./MaScene.js";

const config = {
    width: 1024,
    height:1024,
    backgroundColor : '#cccccc',
    type : Phaser.AUTO,
    parent:'projet',
    scene:[MaScene],
    scale : {
        zoom :5,
    },
    physics : {
        default:'matter',
        matter : {
            debug : true,
            gravity : {
                y : 0
            }
        }
    },
    plugins : {
        scene : [
            {
                plugin: PhaserMatterCollisionPlugin.default,
                key: 'Mattercollision',
                mapping: 'mattercollision',
            }
        ]
    }
}

new Phaser.Game(config);