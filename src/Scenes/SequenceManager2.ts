import Sequence2 from './Sequence2'
import AudioManager from './AudioManager'
import Experience from '../webgl/Experience'
import Animations from '../Utils/Animations'

export default class SequenceManager2 {   
    
    currentSequence: number
    animations: Animations
    am: AudioManager
    nextBtn:any
    prevBtn: any
    replayBtn:any


    sources: any
    initPartTwo: boolean
    initPartThree: false

    //sequences
    firstSequence: any
    secondSequence:any
    thirdSequence:any

    private experience: Experience = new Experience();
    private camera: any
    private scene: any

    constructor() {

        // dom
        this.nextBtn = document.querySelector(".next")
        this.prevBtn = document.querySelector(".prev")
        this.replayBtn = document.querySelector(".replay")

        // base
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera?.instance
        

        // Audio
        this.am = new AudioManager()
        this.animations = new Animations()

        // variable pour lancer les étapes du projets (1. story - 2. AR - 3. Main custo)
        this.initPartTwo = false
        this.initPartThree = false

        // sequences de la scene
        this.firstSequence = null, this.secondSequence = null, this.thirdSequence = null
        this.currentSequence = 1;

        this.sources = [
            {
                sequenceNumber: 1,
                nameSequence: 'Esquisse',
                source: '/videos/Croquis.mov', 
                type: "2D",
                meshAlreadyInsideScene: 'sequence-1_1',
                audio: [],
                camera: [
                    {
                        pos_x: 0.72,
                        pos_y: 1.8,
                        pos_z: -0.51
                    },
                    {
                        rot_x:  -1.57,
                        rot_y:  -0,
                        rot_z: -1.6
                    },
                    {
                        quat_w:  0.5,
                        quat_x:  -0.5,
                        quat_y:  -0.5,
                        quat_z: -0.5
                    },
                    
                ]
            },
            {
                sequenceNumber: 2,
                nameSequence: 'Aquarelle',
                source: '/videos/Aquarelle.mov', 
                type: "2D",
                meshAlreadyInsideScene: 'sequence-2_1',
                cameraPos: [ 
               
                ]
            },
            
        ]

        
        this.initSequences()
        this.addEvents()
    }

    initSequences = () => {

        if(this.currentSequence === 1) {
            this.firstSequence = new Sequence2(this.sources[0])

        } else if(this.currentSequence === 2) {
            this.secondSequence = new Sequence2(this.sources[1])
       
        } else if(this.currentSequence === 3) {
            this.thirdSequence = new Sequence2(this.sources[2])
        }
       
    }

    addEvents = () => {
        this.nextBtn.addEventListener('click', this.nextSequence)
        this.prevBtn.addEventListener('click', this.prevSequence)
        this.replayBtn.addEventListener('click', this.replaySequence)
    }


    changeSequence = (currentSequence: any,  state: string) => {

        let sequence;

        // on choppe la bonne séquence
        if(currentSequence === 1) {
            sequence = this.firstSequence
        } else if(currentSequence === 2) {
            sequence = this.secondSequence
        } else if(currentSequence === 3) {
            sequence = this.thirdSequence
        }


        if(state === "replay") {

            if(sequence.type === '2D') {
                
                //rebuild mesh pour rejouer la sequence video sur le plane
                sequence.createVideo()
                
            } else {
                // if 3d take camera to point
                // ça fade au black puis ça revient sur la position de base, et ça relance
                sequence.setCameraStartSequence()
            }
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