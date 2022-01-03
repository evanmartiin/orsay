import Sequence from './Sequence'
import AudioManager from './AudioManager'


export default class SequenceManager {   
    
    currentScene: number
    am: AudioManager
    nextBtn:any
    prevBtn: any
    replayBtn:any
    stepExperience: number
    totalStep:number
    sources: any

    initPartOne3D: false
    initPartTwo: boolean
    initPartThree: false

    constructor() {
       
        this.am = new AudioManager()
     
        this.nextBtn = document.querySelector(".next")
        this.prevBtn = document.querySelector(".prev")
        this.replayBtn = document.querySelector(".replay")


        this.sources = [
            {
                nameSequence: 'Esquisse',
                source: '/videos/Croquis.mov', 
            },
            {
                nameSequence: 'Aquarelle',
                source: '/videos/Aquarelle.mov', 
            },
            {
                nameSequence: 'Atelier',
                source: '/models/Atelier.mov', 
            }
        ]


        //states
        this.stepExperience = 1;
        this.totalStep = 3;
        this.currentScene = 1;

        this.initPartOne3D = false
        this.initPartTwo = false
        this.initPartThree = false
        
        this.initManager()
    }

    initManager = () => {
        const initSequence = new Sequence(this.currentScene, '2D', '/videos/Croquis.mov', -5)
    }

    addEvents = () => {
        this.nextBtn.addEventListener('click', this.nextSequence)
        this.prevBtn.addEventListener('click', this.prevSequence)
        this.replayBtn.addEventListener('click', this.replaySequence)
    }


    partOne = (choiceStatus: string, currentSequence: number) => {

        if(choiceStatus === "replay") {

        } else if(choiceStatus === "next") {

        } else if(choiceStatus === "back") { 

        }
        
    }


    changeSequence = (video: any, currentSequence: number, newSequence: number, state: string) => {

        if(state === "replay") {



            video.pause()
            video.currentTime = 0
            video.play()
           
        }
    }


    replaySequence = () => {
        
    }


    prevSequence = () => {
        
    }

    nextSequence = () => {
        
    }
}