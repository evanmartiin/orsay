import { Howl, Howler } from 'howler';


export default class AudioManager {
    subtitles: Object

    constructor() {
       
        this.subtitles = {

            // Esquisse
            sequence1: {
                "part-1": "",
                "part-2": "",
            },

            // Aquarelle
            sequence2: {
                "part-1": "",
            },

            // Atelier
            sequence3: {
                "part-1": "",
            },
        }
    }

    audioSprites = (name) => {
        const sound = new Howl({
            src: ['sounds.mp3'],
            sprite: {
              
              // offset, duration
              esquisseP1: [0, 3000],
              esquisseP2: [4000, 5000],
              esquisseP3: [9000, 6000],
            }
        });


        const esquisseP1 = sound.sprite.esquisseP1
        const esquisseP2 = sound.sprite.esquisseP2
        const esquisseP3 = sound.sprite.esquisseP3

        esquisseP1.on('end', function(){
            
        });

        esquisseP2.on('end', function(){
            
        });

        esquisseP3.on('end', function(){
            
        });
    }

    // todo sprites
    changeAudio = (srcArray: Array<string>) => {
        const sound = new Howl({
            src: srcArray,
            onend: () => {
                sound.fade(1, 0, 1000, sound);
                //sound.pause()
            }
        });

        sound.play()
    }

    playSound = (sprite, name) => {
        sprite.play(name);
    }
    

    pauseAudio = (sound) => {
        sound.pause()
    }

    subtitlesDestroy = (subtitle) => {
        
    }
}