import Sequence2 from './Sequence2'
import AudioManager from './AudioManager'
import Experience from '../webgl/Experience'
import Animations from '../Utils/Animations'
import NavManager from './NavManager'
import { gsap } from "gsap";

export default class SequenceManager2 {   
    
    animations: Animations
    am: AudioManager
    private nextBtn: HTMLElement = document.querySelector(".next") as HTMLElement
    private prevBtn: HTMLElement = document.querySelector(".prev") as HTMLElement
    private replayBtn: HTMLElement = document.querySelector(".replay") as HTMLElement

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
    private navManager: NavManager = new NavManager();

    constructor() {

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
                        pos_x: 4.488,
                        pos_y: .229,
                        pos_z: -.588,
                        rot_x: -1.55,
                        rot_y: .017,
                        rot_z: .165,
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
                camera: [
                    {
                        pos_x: 5.865,
                        pos_y: .229,
                        pos_z: -.033,
                        rot_x: -1.55,
                        rot_y: .017,
                        rot_z: -.302,
                    },
                ]
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
        this.navManager.init();
    }

    initSequences = () => {
        // on pause tous les sons
        this.am.sound.pause()

        this.navManager.update(this.sequenceNumber)
        
        if(this.sequenceNumber === 1) {
           
            this.currentSequence = new Sequence2(this.sources[0])
            this.oldCameraPos = this.currentSequence.sources.camera[0]
            this.am.sound.play('elon')
            const subtitles = this.am.subtitlesCreate('elon')
           
            // this.animations.hideAndShowSubtitles("showAndHide", subtitles.subtitlesDom[1], subtitles.subtitlesOfSequences[0].from, subtitles.subtitlesDom[0])

        } else if(this.sequenceNumber === 2) {
            this.currentSequence = new Sequence2(this.sources[1])
            this.am.sound.play('elon2')

        } else if(this.sequenceNumber === 3) {
            this.currentSequence = new Sequence2(this.sources[2])
            this.am.sound.play('elon3')
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
        
         this.oldSequence = this.currentSequence // celle à l'écran avant de la changer, on la sauvegarde
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
            const orig = this.sources[this.sequenceNumber - 2].camera[0];
            const dest = this.sources[this.sequenceNumber - 1].camera[0];
            
                if(this.currentSequence.type === '2D') {
                    gsap.fromTo(this.camera.position, { x: orig.pos_x, y: orig.pos_y, z: orig.pos_z }, { x: dest.pos_x, y: dest.pos_y, z: dest.pos_z, duration: 1 })
                    gsap.fromTo(this.camera.rotation, { x: orig.rot_x, y: orig.rot_y, z: orig.rot_z }, { x: dest.rot_x, y: dest.rot_y, z: dest.rot_z, duration: 1 })
                } else {
                    
                    this.animations.cameraAnimation("normal", this.camera, this.currentSequence.sources.camera[0], 2)
                }
                
                
                /* SCENE PRECEDENTE */
                
            } else if(state === "back") {
                const orig = this.sources[this.sequenceNumber - 1].camera[0];
                const dest = this.sources[this.sequenceNumber].camera[0];
                // sequence.destroy()
                
                if(this.oldSequence.type === '2D') {
                    
                    gsap.fromTo(this.camera.position, { x: dest.pos_x, y: dest.pos_y, z: dest.pos_z }, { x: orig.pos_x, y: orig.pos_y, z: orig.pos_z, duration: 1 })
                    gsap.fromTo(this.camera.rotation, { x: dest.rot_x, y: dest.rot_y, z: dest.rot_z }, { x: orig.rot_x, y: orig.rot_y, z: orig.rot_z, duration: 1 })

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
        if (this.sequenceNumber < this.sources.length) {
            this.sequenceNumber += 1
            this.changeSequence("next")
        }
    }
}