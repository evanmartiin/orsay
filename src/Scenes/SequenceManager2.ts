import Sequence2 from './Sequence2'
import AudioManager from './AudioManager'
import Experience from '../webgl/Experience'
import Animations from '../Utils/Animations'
import NavManager from './NavManager'
import { gsap } from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
    public scene: any
    private navManager: NavManager = new NavManager();
    private canvas: HTMLCanvasElement = this.experience.canvas as HTMLCanvasElement;

    constructor() {

        // base
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera?.instance
        
        // Audio
        this.am = new AudioManager()
        this.am.music.play()

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
                source: '/videos/Croquis.mp4', 
                type: "2D",
                meshAlreadyInsideScene: 'sequence-1',
                nextMesh: 'sequence-2',
                camera: [
                    {
                        pos_x: 4.488,
                        pos_y: .829,
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
                source: '/videos/Aquarelle.mp4', 
                type: "2D",
                previousMesh: 'sequence-1',
                meshAlreadyInsideScene: 'sequence-2',
                audio: [],
                camera: [
                    {
                        pos_x: 5.865,
                        pos_y: .829,
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
                camera: [ 
                    // coordonnées de destination 
                    {
                        pos_x: -3.274,
                        pos_y:  1.85,
                        pos_z: 14,
                        rot_x:  -.325,
                        rot_y:  -.57,
                        rot_z: -.161,
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
          
            this.currentSequence = new Sequence2(this.sources[0], this.oldSequence)
            this.oldCameraPos = this.currentSequence.sources.camera[0]
           
            this.am.audioStart('sequence1')
            

        } else if(this.sequenceNumber === 2) {
           
            this.currentSequence = new Sequence2(this.sources[1])
            this.am.audioStart('sequence2')

        } else if(this.sequenceNumber === 3) {
           
            this.currentSequence = new Sequence2(this.sources[2])
            this.am.audioStart('sequence3')
            setTimeout(() => {
                this.camera.controls = new OrbitControls(this.camera, this.canvas)
                this.camera.controls.enableDamping = true
            }, 5000);
        }
       
    }

    addEvents = () => {
        this.nextBtn.addEventListener('click', this.nextSequence)
        this.prevBtn.addEventListener('click', this.prevSequence)
        this.replayBtn.addEventListener('click', this.replaySequence)
    }

    


    changeSequence = (state: string) => {
        this.am.audioCleanUp()
        
        this.oldSequence = this.currentSequence // celle à l'écran avant de la changer, on la sauvegarde
        if(state !== "replay") this.initSequences()  // la nouvelle sequence, devient l'actuelle, sauf en cas de replay
        else this.navManager.update(this.sequenceNumber)
    
        /* SCENE REPLAY */

        if(state === "replay") {

                if(this.sequenceNumber === 1) { this.am.audioStart('sequence1') }
                else if(this.sequenceNumber === 2) { this.am.audioStart('sequence2') }
                else if(this.sequenceNumber === 3) { this.am.audioStart('sequence3') }
                
            
                if(this.currentSequence.type === '2D') {
                
                    this.oldSequence.createVideo() //rebuild mesh pour rejouer la sequence video sur le plane
                       
                } else if(this.currentSequence.type === '3D') {
                   
                    this.currentSequence.setCameraStartSequence(this.oldCameraPos)  // si 3d, on revient sur les pos de bases
                }

        /* SCENE SUIVANTE */

        } else if(state === "next") {
           
            const orig = this.sources[this.sequenceNumber - 2].camera[0];
            const dest = this.sources[this.sequenceNumber - 1].camera[0];
            
            gsap.fromTo(this.camera.position, { x: orig.pos_x, y: orig.pos_y, z: orig.pos_z }, { x: dest.pos_x, y: dest.pos_y, z: dest.pos_z, duration: 2.4, ease:"power2.inOut"})
            gsap.fromTo(this.camera.rotation, { x: orig.rot_x, y: orig.rot_y, z: orig.rot_z }, { x: dest.rot_x, y: dest.rot_y, z: dest.rot_z, duration: 2.4, ease:"power2.inOut" })
                
                
        /* SCENE PRECEDENTE */
                
        } else if(state === "back") {
            const orig = this.sources[this.sequenceNumber - 1].camera[0];
            const dest = this.sources[this.sequenceNumber].camera[0];
            // sequence.destroy()
            
            gsap.fromTo(this.camera.position, { x: dest.pos_x, y: dest.pos_y, z: dest.pos_z }, { x: orig.pos_x, y: orig.pos_y, z: orig.pos_z, duration: 1 })
            gsap.fromTo(this.camera.rotation, { x: dest.rot_x, y: dest.rot_y, z: dest.rot_z }, { x: orig.rot_x, y: orig.rot_y, z: orig.rot_z, duration: 1 })
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