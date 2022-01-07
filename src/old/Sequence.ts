import { PlaneGeometry,  MeshBasicMaterial, Mesh, Scene,VideoTexture, LinearFilter, RGBFormat, FrontSide } from "three";
import Experience from "../webgl/Experience";
import Sizes from "../Utils/Sizes";





export default class Sequence
{
    private experience: Experience = new Experience();
    private scene: Scene = this.experience.scene as Scene;
    public  sizes: Sizes = this.experience.sizes as Sizes;
    private geometry: PlaneGeometry | null = null;
    private texture: VideoTexture | null = null;
    private material: any
    public  time: number
    public camera: any
    public video: any

    public type: string
    private mesh: any



    constructor(sequenceNumber: number, sequenceType:string, source: string, position?:number)
    {
        this.experience = new Experience()
    
        //WIP aspect ratio
        this.camera = this.experience.camera?.instance

        this.mesh = null;
        this.material = null;
        this.time = 0.01;
        this.type = sequenceType
        this.video = null;

        if(sequenceType === '2D') {
            this.initSequencePlane(sequenceNumber, source, position);
            
        } else if(sequenceType === "3D") {
            
        }
    
    }  


    initSequencePlane = (sequenceNumber: number, source: string, position?: number) => {
        console.log(sequenceNumber)

        this.video = document.createElement('video')
        this.video.src = source
        this.video.autoplay = true
        this.video.loop = false
        // this.video.play();

        this.texture = new VideoTexture(this.video);
        this.texture.minFilter = LinearFilter;
        this.texture.magFilter = LinearFilter;
        this.texture.format = RGBFormat;
       
        this.geometry = new PlaneGeometry(4,5)
        this.resize(this.texture)

        this.material = new MeshBasicMaterial({
            color:0xffffff,
            map: this.texture,
            side: FrontSide
        })

        this.material.map.needsUpdate = true;
    
        // this.material = new RawShaderMaterial({
        //     uniforms: {   
        //         rez: { value: [this.sizes.width, this.sizes.height] },
        //         uTextureSize: { value: new Vector2(4, 5) },
        //         texture: { value: this.texture },
        //     },
        //     vertexShader: vertShader,
        //     fragmentShader: fragShader,
        // })

        
        this.mesh = new Mesh(this.geometry, this.material)


        if(position) {
            this.mesh.position.z = position
        }

        this.scene.add(this.mesh)
        this.video.play();

    }

    update = () => {
      
       
    }

    destroy = () => {
        this.scene.remove(this.mesh)
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
