import { MeshBasicMaterial,  Scene, VideoTexture, LinearFilter, RGBFormat } from "three";
import Experience from "../webgl/Experience";


export default class Sequence
{
    private experience: Experience = new Experience();
    private scene: Scene = this.experience.scene as Scene;
    private camera: any
    public video: any

    public sources: any
    public type: string
    public mesh: any
    public prevMesh:any
    public nextMesh:any

    constructor(sources: any)
    {
        this.experience = new Experience()
    
        //WIP aspect ratio
        this.camera = this.experience.camera?.instance

        //la video si on est en 2D
        this.mesh = null;
        this.video = null;


        // les sources qui permettent de faire toute la scène (position, source video..)
        this.sources = sources
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

        if(this.type === "2D") {

           this.createVideo() 
           
           if(this.sources.camera.length > 0) this.setCameraStartSequence()
            
        } else {

           this.create3DSequence()

        }

       
    
    }

    createVideo = () => {

        this.mesh = this.scene.getObjectByProperty('name', this.sources.meshAlreadyInsideScene); 
        
        this.video = document.createElement('video')
        this.video.src = this.sources.source
        this.video.autoplay = true
        this.video.loop = false
        // this.video.play();

        const texture = new VideoTexture(this.video);
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.format = RGBFormat;
       
        const material = new MeshBasicMaterial({
            map: texture,
        })

       this.mesh.material = material

    }


    create3DSequence = () => {

        // on a le déplacement de la caméra

        // on a l'audio qui démarre

        // on a le manager nav qui suit la progression

    }

    setCameraStartSequence = () => {
    
        // TODO faire ça avec les transitions en theatre.js ou avec du lerp
        
        this.camera.position.x = this.sources.camera[0].pos_x, 
        this.camera.position.y = this.sources.camera[0].pos_y, 
        this.camera.position.z = this.sources.camera[0].pos_z

        this.camera.rotation.x = this.sources.camera[0].rot_x
        this.camera.rotation.y = this.sources.camera[0].rot_y
        this.camera.rotation.z = this.sources.camera[0].rot_z

        this.camera.quaternion.w = this.sources.camera[0].quat_w
        this.camera.quaternion.x = this.sources.camera[0].quat_x
        this.camera.quaternion.y = this.sources.camera[0].quat_y
        this.camera.quaternion.z = this.sources.camera[0].quat_z

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
