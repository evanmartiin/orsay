import { AnimationMixer, Mesh, Scene } from 'three';
import Debug from '../Utils/Debug';
import Loaders from '../Utils/Loaders';
import Time from '../Utils/Time';
import Experience from '../webgl/Experience'

export default class Fox
{
    private experience: Experience = new Experience();
    private scene: Scene = this.experience.scene as Scene;
    private loaders: Loaders = this.experience.loaders as Loaders;
    private time: Time = this.experience.time as Time;
    private debug: Debug = this.experience.debug as Debug;
    private debugFolder: any;
    private resource: any;
    private model: any;
    private animation: any;

    constructor()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui?.addFolder('fox')
        }

        // Resource
        this.resource = this.loaders.items.foxModel
        console.log(this.loaders.items);
        

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse((child: any) =>
        {
            if(child instanceof Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name: string) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}