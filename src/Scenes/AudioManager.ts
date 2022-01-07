// @ts-ignore
import { Howl, Howler } from 'howler';
import gsap from "gsap";

let instance: AudioManager;

export default class AudioManager {
    subtitles: any
    sound: Howler | null
    sound2: Howler | null
    sound3: Howler | null
    subtitlesDom: any
    howler: Howler
    sequenceTL: any
    music: Howler
    drawing: Howler
    public videoPlaying: boolean = false;

    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;

        this.sequenceTL = null

        this.music = new Howl({
            src: ['/sounds/music.mp3'],
            loop: true,
            volume: .005
        })

        this.drawing = new Howl({
            src: ['/sounds/drawing.mp3'],
            sprite: {
                0: [0, 4840],
                1: [4840, 4720],
                2: [9560, 3160],
                3: [12720, 4410],
            },
            volume: .02
        })
        
        this.drawing.on('end', () => {
            setTimeout(() => {
                if (this.videoPlaying) {
                    this.drawing.play(Math.floor(Math.random() * 4).toString());
                }
            }, 1000);
        })

        this.sound = null;
        this.subtitlesDom = document.querySelector('.subtitles')
       
        this.subtitles = {
            // Esquisse
            "sequence1": [
                {
                    id: 1,
                    displayFrom: 1,
                    hideAt: 5.8,
                    content: "En 1904, Émile Gallé se lança dans la conception d’une oeuvre unique.",
                },
                {
                    id: 2,
                    displayFrom: 6,
                    hideAt: 11,
                    content: "Cette oeuvre fascine encore aujourd’hui tant par sa conception que par ses symboles sous-jacents.",
                },
                {
                    id: 3,
                    displayFrom: 11.5,
                    hideAt: 17,
                    content: "Émile Gallé fit appel à un dessinateur pour se charger des premiers croquis en dessin et en aquarelle.",
                },
            ],

            "sequence2": [
                {
                    id: 4,
                    displayFrom: 0,
                    hideAt: 6,
                    content: "Ces premiers croquis servirent ainsi de modèle pour le travail de soufflage et de modelage du verre.",
                },
                {
                    id: 5,
                    displayFrom: 6.2,
                    hideAt: 10.5,
                    content: "Ce travail de collaboration était courant pour toutes les créations de Gallé.",
                },
                {
                    id: 6,
                    displayFrom: 10.7,
                    hideAt: 14,
                    content: "Il fallait penser l’objet avant de démarrer la fabrication.",
                },
                {
                    id: 7,
                    displayFrom: 14.5,
                    hideAt: 20,
                    content: "Le but premier de ces croquis était d’avoir une direction pour toute personne travaillant sur le projet.",
                },
            ],

            "sequence3": [
                {
                    id: 8,
                    displayFrom: 4,
                    hideAt: 12,
                    content: "Une fois la conception terminée, il pensa aux étapes de fabrication qui allaient mettre ses compétences de maître-verrier à rude épreuve.",
                },
                {
                    id: 9,
                    displayFrom: 12.5,
                    hideAt: 17.5,
                    content: "Une œuvre complexe comme celle-ci implique de suivre un protocole de fabrication rigoureux.",
                },
                {
                    id: 10,
                    displayFrom: 18,
                    hideAt: 23,
                    content: "L’élaboration en atelier des œuvres pensées par Gallé connaissait une méthode récurrente.",
                },
                {
                    id: 11,
                    displayFrom: 24,
                    hideAt: 32,
                    content: "Il était habituel de réaliser plusieurs fois un même objet, pour s’assurer qu’au moins un exemplaire serait parfait même si l’on rencontrait un problème durant le processus de création.",
                },
                {
                    id: 12,
                    displayFrom: 33,
                    hideAt: 36,
                    content: "Ainsi, plusieurs 'Mains aux Algues' ont été élaborées, il n’y en a pas que celle se trouvant au Musée d’Orsay.",
                },
            ]

           
        }

        this.audioSprites()
    }

    audioSprites = () => {
        
        this.sound = new Howl({
            src: [
                "/audios/new/og/sequence.ogg",
                "/audios/new/og/sequence.m4a",
                "/audios/new/og/sequence.mp3",
                "/audios/new/og/sequence.ac3"
            ],
            sprite: {

                    "sequence1": [
                      0,
                      17151.36054421769
                    ],
                    "sequence2": [
                      19000,
                      20417.278911564623
                    ],
                    "sequence3": [
                      41000,
                      37817.41496598639
                    ]
                  

            },
            onend: () => {
                this.sound.fade(1, 0, 1000, this.sound);
                //sound.pause()
            },
        })
    
    }

    audioCleanUp = () =>{
       
        this.subtitlesDom.innerHTML = ' '
    }


    audioStart = (sequenceName: any) => {
        this.sound.play(sequenceName)
        this.subtitlesCreate(sequenceName)
        this.playSubtitles()
    }



   
    playSound = (sound: any, name: string) => {
        sound.play(name);
    }
    

    pauseAudio = (sound:any) => {
        sound.pause()
    }

    subtitlesCreate = (sequenceName: any) => {

        //on crée une TL gsap si il y a une nouvelle séquence, on clear l'ancienne
        this.sequenceTL = gsap.timeline({paused:true})

        let subtitlesDom: any[] = Array();

        
        const subtitlesOfSequences = this.subtitles[sequenceName]
      
       
        //@ts-ignore
        subtitlesOfSequences.forEach(element => {
            const sub = document.createElement("p")
            sub.className = `subtitle subtitle-${element.id}`
            sub.innerHTML = element.content
            this.subtitlesDom.appendChild(sub)
            subtitlesDom.push(sub)
        
            //on programme l'affichage et la disparition des sous titres
            this.subtitlesProgram(element)
        });
        
        
    }

    subtitlesProgram = (subLogic: any) => {
        
        // on affichera le sous titre en question
        const subDom = document.querySelector(`.subtitle-${subLogic.id}`)
        
        this.sequenceTL.to(subDom, { opacity: .9, duration: 0.3}, subLogic.displayFrom)

        // on cachera à un certain moment le sous titre en question
        this.sequenceTL.to(subDom, { opacity: 0, duration: 0.2}, subLogic.hideAt)       
    }

    playSubtitles = () => {
        
            this.sequenceTL.play()
        
       
    }

    drawingSounds = () => {
        this.videoPlaying = true;
        this.drawing.play(Math.floor(Math.random() * 4).toString());
    }
}