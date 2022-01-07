import { MeshBasicMaterial,  Scene, VideoTexture, LinearFilter, RGBFormat, ShaderMaterial, FrontSide } from "three";
import Experience from "../webgl/Experience";
import NavManager from "./NavManager";
import { gsap, Power1 } from 'gsap';
import AudioManager from "./AudioManager";

export default class Sequence
{
    private experience: Experience = new Experience();
    private scene: Scene = this.experience.scene as Scene;
    private navManager: NavManager = new NavManager();
    private audioManager: AudioManager = new AudioManager();
    private camera: any
    public video: any

    public sources: any
    public type: string
    public mesh: any
    public prevMesh:any
    public nextMesh:any

    public audio: any
    public subtitles: any
    
    private oldSequence: any

    constructor(sources: any, oldSequence?: any)
    {
        this.experience = new Experience()
    
        //WIP aspect ratio
        this.camera = this.experience.camera?.instance

        //la video si on est en 2D
        this.mesh = null;
        this.video = null;

        if(oldSequence) this.oldSequence = oldSequence


        // les sources qui permettent de faire toute la scène (position, source video..)
        this.sources = sources
        console.log(this.sources);
        
        this.type = sources.type

        if(this.sources.sequenceNumber > 1 && this.sources.sequenceNumber < 2) {
            this.prevMesh = this.scene.getObjectByProperty('name', this.sources.previousMesh); 
        } else {
            this.nextMesh = this.scene.getObjectByProperty('name', this.sources.nextMesh); 
        }

        this.initSequence()    
    }  


    // soit c'est une video, et alors la caméra y fait face (2D), soit c'est un déplacement dans la scène 3D
    initSequence = () => {
        // init audio,

        if(this.type === "2D") {

           this.createVideo() 
           
           if(this.sources.camera.length > 0) this.setCameraStartSequence()
            
        } else {

           this.create3DSequence()

        }
        console.log(this.oldSequence);
        

        if(!this.oldSequence && this.sources.sequenceNumber === 1) {
            gsap.fromTo(this.camera.position, { y: -.5 }, { y: .829, duration: 3, ease: Power1.easeInOut })
        }
        
    }

    createVideo = () => {

        this.mesh = this.scene.getObjectByProperty('name', this.sources.meshAlreadyInsideScene); 
        
        this.video = document.createElement('video')
        this.video.src = this.sources.source
        this.video.autoplay = true
        this.video.loop = false
        this.video.onloadedmetadata = () => {
            this.navManager.animateBar(this.video.duration);

            this.audioManager.drawingSounds();
    
            setTimeout(() => {
                this.audioManager.videoPlaying = false;
                this.audioManager.drawing.stop();
            }, (this.video.duration * 1000));
        }

        
        
        // this.video.play();

        const texture = new VideoTexture(this.video);
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.format = RGBFormat;
        
        const vertex = /* glsl */`
            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            }
        `
        const fragment = /* glsl */`
            uniform sampler2D uTexture;

            varying vec2 vUv;

            void main() {
                vec4 finalTexture = texture2D(uTexture, 1. - vUv.yx);

                gl_FragColor = finalTexture;
            }
        `
       
        // const material = new MeshBasicMaterial({
        //     map: texture,
        // })
        const material = new ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                uTexture: { value: texture }
            },
            side: FrontSide
        })

       this.mesh.material = material
    }


    create3DSequence = () => {

        // on a le manager nav qui suit la progression
        this.navManager.animateBar(38);

    }

    setCameraStartSequence = () => {
    
        // TODO faire ça avec les transitions en theatre.js ou avec du lerp
        console.log(this.sources.camera[0]);
        
        
        this.camera.position.x = this.sources.camera[0].pos_x, 
        this.camera.position.y = this.sources.camera[0].pos_y, 
        this.camera.position.z = this.sources.camera[0].pos_z

        this.camera.rotation.x = this.sources.camera[0].rot_x
        this.camera.rotation.y = this.sources.camera[0].rot_y
        this.camera.rotation.z = this.sources.camera[0].rot_z


    }


    destroy = () => {
        this.scene.remove(this.mesh)
        this.video.remove()
    }

    setBackground(texture: any) {

        let imgRatio = texture.image.width / texture.image.height;
        let planeRatio = innerWidth / innerHeight;
        let ratio = planeRatio / imgRatio;
      
        texture.repeat.x = ratio;
        texture.offset.x = 0.5 * (1 - ratio);
        
    }


    resize = (texture: any) => {
        texture.matrixAutoUpdate = false;

        const aspect = window.innerWidth / window.innerHeight;
        const imageAspect = texture.image.width / texture.image.height;

        if ( aspect < imageAspect ) {

            texture.matrix.setUvTransform( 0, 0, aspect / imageAspect, 1, 0, 0.5, 0.5 );

        } else {

            texture.matrix.setUvTransform( 0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5 );

        }
    }
}
