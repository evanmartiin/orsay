import Sequence2 from './Sequence2'
import AudioManager from './AudioManager'
import Experience from '../webgl/Experience'
import { Color, MeshBasicMaterial } from 'three'
import { VideoTexture, LinearFilter, RGBFormat, DoubleSide, FrontSide } from "three";


export default class SequenceManager2 {   
    
    currentSequence: number
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

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera?.instance
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
                cameraPos: []
            },
            {
                nameSequence: 'Aquarelle',
                source: '/videos/Aquarelle.mov', 
                type: "2D",
                cameraPos: []
            },
            {
                nameSequence: 'Atelier',
                source: '/models/Atelier.gltf', 
                type: "3D",
                cameraPos: []
            }
        ]

        this.currentSequence = 1;

        this.initPartTwo = false
        this.initPartThree = false
        
        this.initSequence()
        // this.addEvents()
    }

    initSequences = () => {

        // if(this.currentSequence === 1) {
        //     this.firstSequence = new Sequence(this.currentSequence, '2D', '/videos/Croquis.mov')

        // } else if(this.currentSequence === 2) {
        //     this.secondSequence = new Sequence(this.currentSequence, '2D', '/videos/Aquarelle.mov', -5)
       
        // } else if(this.currentSequence === 3) {
        //     this.thirdSequence = new Sequence(this.currentSequence, '3D', '/models/Atelier.gltf')
        // }
       
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
               
                console.log(sequence.video.currentTime)
                sequence.video.pause() 
                sequence.currentTime = 0
                sequence.video.play()

                //camera position
                
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


    initSequence = () => {
        //this.changeSequence(this.currentSequence, "replay")
        const seq1 = this.scene.getObjectByProperty('name', 'base');

        
        // this.camera.position.x = 0.6565536979067577, 
        // this.camera.position.y = 2.2, 
        // this.camera.position.z = -0.5152404160336064

        // this.camera.rotation.x = -2
        // this.camera.rotation.y = -0
        // this.camera.rotation.z = -1.6

        // this.camera.quaternion.w = -0.5
        // this.camera.quaternion.x = 0.5
        // this.camera.quaternion.y = 0.5
        // this.camera.quaternion.z = 0.5


        const seq2 = this.scene.getObjectByProperty('name', 'sequence-1_1'); 
       
        const video = document.createElement('video')
        video.src = '/videos/Croquis.mov'
        video.autoplay = true
        video.loop = false
        // this.video.play();

        const texture = new VideoTexture(video);
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.format = RGBFormat;
       
        const material = new MeshBasicMaterial({
            map: texture,
        })

    
        seq2.material = material

        
        this.nextBtn.addEventListener('click', this.nextSequence)
        this.prevBtn.addEventListener('click', this.prevSequence)
        this.replayBtn.addEventListener('click', this.replaySequence)
   
    }


    replaySequence = () => {

        //clear material obligé sinon 
       
        const seq2 = this.scene.getObjectByProperty('name', 'sequence-1_1'); 
       
        const video = document.createElement('video')
        video.src = '/videos/Croquis.mov'
        video.autoplay = true
        video.loop = false
        // this.video.play();

        const texture = new VideoTexture(video);
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.format = RGBFormat;
       
        const material = new MeshBasicMaterial({
            map: texture,
        })

    
        seq2.material = material
    }

    prevSequence = (video:any) => {
        //this.changeSequence(this.currentSequence, "back")
        
    }

    nextSequence = (video:any) => {
    
       // this.changeSequence(this.currentSequence, "next")
    }
}