import Sequence2 from './Sequence2'
import AudioManager from './AudioManager'
import Experience from '../webgl/Experience'
import Animations from '../Utils/Animations'

export default class SequenceManager2 {   
    
    animations: Animations
    am: AudioManager
    nextBtn:any
    prevBtn: any
    replayBtn:any

    sources: any
    initPartTwo: boolean
    initPartThree: false

    //sequences
    currentSequence: any
    oldSequence: any
    oldCameraPos: any
    sequenceNumber:any
    sequence: any

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

        // Variable pour lancer les étapes du projets (1. story - 2. AR - 3. Main custo)
        this.initPartTwo = false
        this.initPartThree = false

        // Sequences de la scene, on a l'ancienne (qui s'est terminé) et la nouvelle, qui est en cours
        this.oldSequence = null
        this.currentSequence = null;

        // Variable globale pour incrémenter ou décrémenter les séquences
        this.sequenceNumber = 1;


        // Stash des infos de caméras de la séquence précédente, pour faire un replay
        this.oldCameraPos = null;

        

        this.sources = [
            {
                sequenceNumber: 1,
                nameSequence: 'Esquisse',
                source: '/videos/Croquis.mov', 
                type: "2D",
                meshAlreadyInsideScene: 'sequence-1_1',
                nextMesh: 'sequence-2_1',
                audio: [],
                camera: [
                    {
                        pos_x: 0.72,
                        pos_y: 1.8,
                        pos_z: -0.51,
                        rot_x:  -1.57,
                        rot_y:  -0,
                        rot_z: -1.6,
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
                previousMesh: 'sequence-1_1',
                meshAlreadyInsideScene: 'sequence-2_1',
                audio: [],
                camera: []
            },
            {
                sequenceNumber: 3,
                nameSequence: 'Atelier',
                type: "3D",
                audio: [],   
                camera: [ 
                    // coordonnées de destination 
                    {
                        pos_x: -0.78,
                        pos_y:  1.85,
                        pos_z: 2.5,
                        rot_x:  -0.08,
                        rot_y:  -0.43,
                        rot_z: -0.03,
                        quat_w:  0.97,
                        quat_x:  -0.03,
                        quat_y: -0.21,
                        quat_z: -0.008
                    }
                   
                ]
            },
        ]

        // on lance la première scene
        this.initSequences()
        this.addEvents()
    }

    initSequences = () => {

        if(this.sequenceNumber === 1) {
            this.currentSequence = new Sequence2(this.sources[0])
            this.oldCameraPos = this.currentSequence.sources.camera[0]

        } else if(this.sequenceNumber === 2) {
            this.currentSequence = new Sequence2(this.sources[1])
            

        } else if(this.sequenceNumber === 3) {
            this.currentSequence = new Sequence2(this.sources[2])
            
        }
       
    }

    addEvents = () => {
        this.nextBtn.addEventListener('click', this.nextSequence)
        this.prevBtn.addEventListener('click', this.prevSequence)
        this.replayBtn.addEventListener('click', this.replaySequence)
    }


    changeSequence = (state: string) => {
        console.log(this.currentSequence)
        console.log(this.sequenceNumber)
        
        if(state !== "back")  this.oldSequence = this.currentSequence // celle à l'écran avant de la changer, on la sauvegarde
        if(state !== "replay") this.initSequences()  // la nouvelle sequence, devient l'actuelle, sauf en cas de replay
       
    
        /* SCENE REPLAY */

        if(state === "replay") {

                if(this.currentSequence.type === '2D') {
                
                    this.oldSequence.createVideo() //rebuild mesh pour rejouer la sequence video sur le plane
                       
                } else if(this.currentSequence.type === '3D') {
                   
                    this.currentSequence.setCameraStartSequence(this.oldCameraPos)  // si 3d, on revient sur les pos de bases
                }

        /* SCENE SUIVANTE */

        } else if(state === "next") {
            
                if(this.currentSequence.type === '2D') {
                
                    this.animations.hideAndShow(this.oldSequence.mesh, this.currentSequence.mesh, "next")
                } else {
                  
                    this.animations.cameraAnimation("normal", this.camera, this.currentSequence.sources.camera[0], 10)
                }


        /* SCENE PRECEDENTE */

        } else if(state === "back") {
                // sequence.destroy()
                console.log(this.oldSequence.mesh, this.currentSequence.prevMesh)

                if(this.oldSequence.type === '2D') {
                    
                    this.animations.hideAndShow(this.currentSequence.mesh, this.currentSequence.prevMesh, "prev")

                } else if(this.oldSequence.type === '3D') {
                    
                    this.animations.cameraAnimation("reverse", this.camera, this.oldCameraPos)
                }
        }
        
    }



    replaySequence = () => {
        this.changeSequence("replay")
    }

    prevSequence = () => {
        this.sequenceNumber -= 1
        this.changeSequence( "back")
        
    }

    nextSequence = () => {
    
        this.sequenceNumber += 1
       this.changeSequence("next")
    }


}