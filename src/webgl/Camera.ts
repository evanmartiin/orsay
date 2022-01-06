import { PerspectiveCamera, Scene } from 'three';

import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Sizes from '../Utils/Sizes';

export default class Camera
{
    private experience: Experience = new Experience();
    private sizes: Sizes = this.experience.sizes as Sizes;
    private scene: Scene = this.experience.scene as Scene;
    private canvas: HTMLCanvasElement = this.experience.canvas as HTMLCanvasElement;
    public instance: PerspectiveCamera | null = null;
    public controls: OrbitControls | null = null;

    constructor()
    {
        this.setInstance()
        this.setControls()
    }



    setInstance()
    {
        this.instance = new PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
        
    }

    setControls()
    {
        if (this.instance) {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true
        }
    }

    resize()
    {
        if (this.instance) {
            this.instance.aspect = this.sizes.width / this.sizes.height
        }
        this.instance?.updateProjectionMatrix()
    }

    update()
    {

        // console.log(this.instance?.position, this.instance?.rotation, this.instance?.quaternion)
        
        this.controls?.update()
    }
}