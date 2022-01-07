import { PerspectiveCamera, Scene } from 'three';

import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Sizes from '../Utils/Sizes';
import Debug from '../Utils/Debug';
import GUI from 'lil-gui';

export default class Camera
{
    private experience: Experience = new Experience();
    private sizes: Sizes = this.experience.sizes as Sizes;
    private scene: Scene = this.experience.scene as Scene;
    private debug: Debug = this.experience.debug as Debug;
    private debugFolder: GUI | undefined = undefined;
    private canvas: HTMLCanvasElement = this.experience.canvas as HTMLCanvasElement;
    public instance: PerspectiveCamera | null = null;
    public controls: OrbitControls | null = null;

    constructor()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui?.addFolder('Camera')
        }
        this.setInstance()
        // this.setControls()

    }



    setInstance()
    {
        this.instance = new PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 100)
        this.scene.add(this.instance)
        console.log(this.instance);
        
        
        if(this.debugFolder && this.debug.active)
        {
            this.debugFolder
                .add(this.instance.position, 'x')
                .name('position.x')
                .min(-10)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.instance.position, 'y')
                .name('position.y')
                .min(-10)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.instance.position, 'z')
                .name('position.z')
                .min(-10)
                .max(10)
                .step(0.001)


            this.debugFolder
                .add(this.instance.rotation, 'x')
                .name('rotation.x')
                .min(-10)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.instance.rotation, 'y')
                .name('rotation.y')
                .min(-10)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.instance.rotation, 'z')
                .name('rotation.z')
                .min(-10)
                .max(10)
                .step(0.001)
        }
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
        
        // this.controls?.update()
    }
}