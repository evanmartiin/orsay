import Sequence from './Sequence'
import AudioManager from '../Scenes/AudioManager'


export default class SequenceManager {   
    
    currentSequence: number
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

    //sequences
    firstSequence: any
    secondSequence:any
    thirdSequence:any

    constructor() {
       
        this.am = new AudioManager()
     
        this.nextBtn = document.querySelector(".next")
        this.prevBtn = document.querySelector(".prev")
        this.replayBtn = document.querySelector(".replay")

    

        this.firstSequence = null, this.secondSequence = null, this.thirdSequence = null

        this.sources = [
            {
                nameSequence: 'Esquisse',
                source: '/videos/Croquis.mov', 
                type: "2D",
               
            },
            {
                nameSequence: 'Aquarelle',
                source: '/videos/Aquarelle.mov', 
                type: "2D",

            },
            {
                nameSequence: 'Atelier',
                source: '/models/Atelier.gltf', 
                type: "3D"
            }
        ]


        //states
        this.stepExperience = 1;
        this.totalStep = 3;
        this.currentSequence = 1;

        this.initPartOne3D = false
        this.initPartTwo = false
        this.initPartThree = false
        
        this.initSequences()
        this.addEvents()
    }

    initSequences = () => {

        if(this.currentSequence === 1) {
            this.firstSequence = new Sequence(this.currentSequence, '2D', '/videos/Croquis.mov')

        } else if(this.currentSequence === 2) {
            this.secondSequence = new Sequence(this.currentSequence, '2D', '/videos/Aquarelle.mov', -5)
       
        } else if(this.currentSequence === 3) {
            this.thirdSequence = new Sequence(this.currentSequence, '3D', '/models/Atelier.gltf')
        }
       
    }

    addEvents = () => {
        this.nextBtn.addEventListener('click', this.nextSequence)
        this.prevBtn.addEventListener('click', this.prevSequence)
        this.replayBtn.addEventListener('click', this.replaySequence)
    }


    changeSequence = (currentSequence: any,  state: string) => {

        let sequence;

        if(currentSequence === 1) {
            sequence = this.firstSequence
        } else if(currentSequence === 2) {
            sequence = this.secondSequence
        } else if(currentSequence === 3) {
            sequence = this.thirdSequence
        }

        if(state === "replay") {

            if(sequence.type === '2D') {
               
                sequence.video.pause() 
                sequence.currentTime = 0
                sequence.video.play()
                
            } 

            //if 3d take camera to point
           
        }

        if(state === "next") {
            sequence.destroy()
            this.currentSequence += 1
            this.initSequences()
        }

        if(state === "back") {
            sequence.destroy()
            this.currentSequence -= 1
            this.initSequences()
        }
    }

    destroySequence = () => {

    }


    endOfSequence = () => {

    }


    replaySequence = () => {
        this.changeSequence(this.currentSequence, "replay")
    }


    prevSequence = () => {
        this.changeSequence(this.currentSequence, "back")
    }

    nextSequence = () => {
    
        this.changeSequence(this.currentSequence, "next")
    }
}