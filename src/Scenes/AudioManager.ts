// @ts-ignore
import { Howl, Howler } from 'howler';

export default class AudioManager {
    subtitles: any
    sound: Howler | null
    subtitlesDom: any
    howler: Howler

    constructor() {

        this.sound = null;
        this.subtitlesDom = document.querySelector('.subtitles')
        this.howler = Howler
        this.subtitles = {
            // Esquisse
            "elon": [
                {
                    id: 1,
                    from: 0,
                    to: 3,
                    content: "This is Elon Musk",
                },
            ],

            "elon2": [
                {
                    id: 2,
                    from: 3.2,
                    to: 6,
                    content: "Tesla Cofounder and CEO",
                },
            ]

           
        }

        this.audioSprites()
    }

    audioSprites = () => {
        this.sound = new Howl({
            src: [
                "/audios/elonFinal.ogg",
                "/audios/elonFinal.m4a",
                "/audios/elonFinal.mp3",
                "/audios/elonFinal.ac3"
              ],
            sprite: {
                elon: [
                  0,
                  99346.59863945578
                ],
                elon2: [
                  101000,
                  99346.59863945578
                ],
                elon3: [
                  202000,
                  99346.5986394558
                ]
            },

            onend: () => {
                this.sound.fade(1, 0, 1000, this.sound);
                //sound.pause()
            },

            onplay: () => {

                //on va chercher le son qui joue
                console.log(this.sound._sounds[0])
               
            }
        });

        

    }

    clearSubtitles = () =>{

    }

   
    playSound = (sound: any, name: string) => {
        sound.play(name);
    }
    

    pauseAudio = (sound:any) => {
        sound.pause()
    }

    subtitlesCreate = (sequenceName: any) => {

        let subtitlesDom: any[] = Array();

        const subtitlesOfSequences = this.subtitles[sequenceName]
      

        //@ts-ignore
        subtitlesOfSequences.forEach(element => {
            const sub = document.createElement("p")
            sub.className = "subtitle"
            sub.id = element.id
            sub.innerHTML = element.content
            this.subtitlesDom.appendChild(sub)
            subtitlesDom.push(sub)
        });
        

        return {subtitlesOfSequences, subtitlesDom}
        
        
    }

    subtitlesDestroy = (subtitle:any) => {
        
    }
}