import {  Mesh, MeshBasicMaterial, Scene } from 'three';
import Debug from '../Utils/Debug';
import Loaders from '../Utils/Loaders';
import Time from '../Utils/Time';
import Experience from '../webgl/Experience'

export default class Atelier
{
    private experience: Experience = new Experience();
    private scene: Scene = this.experience.scene as Scene;
    private loaders: Loaders = this.experience.loaders as Loaders;
    private time: Time = this.experience.time as Time;
    private debug: Debug = this.experience.debug as Debug;
    private debugFolder: any;
    private resource: any;
    private model: any;
    private baked: any

    constructor()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui?.addFolder('atelier')
        }

        // Resource
        this.resource = this.loaders.items.atelierModel
        this.baked = this.loaders.items.baked
        this.baked.flipY = false

        this.setModel()
        
        
    }

    setModel()
    {
        this.model = this.resource.scene

    
        
        this.scene.add(this.model)

        this.model.traverse((child: any) =>
        {
            if(child instanceof Mesh)
            {
                child.castShadow = true

                if(child.name === "binbinks-joined") {
                    
                    const material = new MeshBasicMaterial({map: this.baked})
                    child.material = material
                }
            }
            
        })
    }

   
}