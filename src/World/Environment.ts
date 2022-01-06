import GUI from 'lil-gui';
import { DirectionalLight, Scene } from 'three';
import Debug from '../Utils/Debug';
import Experience from '../webgl/Experience'

export default class Environment
{
    private experience: Experience = new Experience();
    private scene: Scene = this.experience.scene as Scene;
    private debug: Debug = this.experience.debug as Debug;
    private debugFolder: GUI | undefined = undefined;
    private sunLight: DirectionalLight | null = null;

    constructor()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui?.addFolder('environment')
            console.log(this.debugFolder);
            
        }

        this.setSunLight()
    }

    setSunLight()
    {
        this.sunLight = new DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunLight)

        // Debug
        if(this.debugFolder && this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 5)
                .max(5)
                .step(0.001)
        }
    }
}