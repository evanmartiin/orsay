import { PlaneGeometry, RawShaderMaterial, Mesh, Scene, Vector2, VideoTexture, LinearFilter, RGBFormat } from "three";
import Experience from "../webgl/Experience";
import Sizes from "../Utils/Sizes";


// shaders
import vertShader from '../shaders/sequence/vertex.vert?raw'
import fragShader from '../shaders/sequence/fragment.frag?raw'



export default class Sequence
{
    private experience: Experience = new Experience();
    private scene: Scene = this.experience.scene as Scene;
    private sizes: Sizes = this.experience.sizes as Sizes;
    private geometry: PlaneGeometry | null = null;
    private texture: VideoTexture | null = null;
    private material: any
    private time: number
    private camera: any
    private video: any


    private fov_y: any

    constructor(sequenceNumber: number, sequenceType:string, source: string, position:number)
    {
        this.experience = new Experience()
    
        //WIP aspect ratio
        this.camera = this.experience.camera?.instance
        this.fov_y = this.camera.position.z * this.camera.getFilmHeight() / this.camera.getFocalLength();


        this.material = null;
        this.time = 0.01;



        if(sequenceType === '2D') {
            this.initSequencePlane(sequenceNumber, source, position);
        } else if(sequenceType === "3D") {
            
        }
    
    }  


    initSequencePlane = (sequenceNumber: number, source: string, position?: number) => {

        this.video = document.createElement('video')
        this.video.src = source
        this.video.autoplay = true
        this.video.loop = false

        this.texture = new VideoTexture(this.video);
        this.texture.minFilter = LinearFilter;
        this.texture.magFilter = LinearFilter;
        this.texture.format = RGBFormat;
       
        this.geometry = new PlaneGeometry(4,5)
        this.resize(this.texture)

    
        this.material = new RawShaderMaterial({
            uniforms: {   
                rez: { value: [this.sizes.width, this.sizes.height] },
                uTextureSize: { value: new Vector2(16, 9) },
                texture: { value: this.texture },
            },
            vertexShader: vertShader,
            fragmentShader: fragShader,
        })

        
        const mesh = new Mesh(this.geometry, this.material)

        if(position) {
            mesh.position.x = position
        }

        this.scene.add(mesh)

    }

    update = () => {
      
       
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
