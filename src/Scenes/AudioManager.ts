// @ts-ignore
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

        //this.audioSprites()
    }

    audioSprites = () => {
        const sound = new Howl({
            src: ['/audios/elon.mp3'],
            sprite: {
              
              // offset, duration
              esquisse1: [0, 3000],
              esquisse2: [4000, 5000],
              esquisse3: [9000, 6000],
            }
        });

        const esquisse1 = sound.sprite.esquisse1
        const esquisse2 = sound.sprite.esquisse2
        const esquisse3 = sound.sprite.esquisse3

        esquisse1.on('end', function(){
            esquisse2.play()
        });

        esquisse2.on('end', function(){
            esquisse3.play()
        });

        esquisse3.on('end', function(){
            
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

    playSound = (sprite: any, name: string) => {
        sprite.play(name);
    }
    

    pauseAudio = (sound:any) => {
        sound.pause()
    }

    subtitlesDestroy = (subtitle:any) => {
        
    }
}