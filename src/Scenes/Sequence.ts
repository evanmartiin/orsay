import { PlaneGeometry, RawShaderMaterial, Mesh, Scene, Vector2, VideoTexture, LinearFilter, RGBFormat } from "three";
import Experience from "../webgl/Experience";
import Sizes from "../Utils/Sizes";


// shaders
import vertShader from '../Shaders/sequence/vertex.vert?raw'
import fragShader from '../Shaders/sequence/fragment.frag?raw'


export default class Sequence
{
    private experience: Experience = new Experience();
    private scene: Scene = this.experience.scene as Scene;
    private sizes: Sizes = this.experience.sizes as Sizes ;
    private geometry: PlaneGeometry | null = null;
    private texture: VideoTexture | null = null;
    private material: any
    private time: number


    constructor()
    {
        this.experience = new Experience()
        // Resource
        
        
        this.material = null;
    
        this.time = 0.01;
        this.initSequence();
    }  

    initSequence = () => {

        let video = document.createElement('video')
        video.src = '/videos/file-ex.mp4'
        video.autoplay = true
        video.loop = true

        this.texture = new VideoTexture(video);
        this.texture.minFilter = LinearFilter;
        this.texture.magFilter = LinearFilter;
        this.texture.format = RGBFormat;
       
        this.geometry = new PlaneGeometry(2, 2, 1, 1)

        this.material = new RawShaderMaterial({
            uniforms: {   
                time: { value: 1.0 },
                rez: { value: [this.sizes.width, this.sizes.height] },
                uTextureSize: { value: new Vector2(this.sizes.width, this.sizes.height) },
                texture: { value: this.texture },
            },
            vertexShader: vertShader,
            fragmentShader: fragShader,
        })

        
        const mesh = new Mesh(this.geometry, this.material)

        this.scene.add(mesh)
       
    }

    update = () => {
        this.time += 0.01
        this.material.uniforms.time.value = this.time
       
    }
}
