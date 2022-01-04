import { Mesh, Scene } from 'three'

import Debug from '../Utils/Debug'
import Sizes from '../Utils/Sizes'
import Time from '../Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from '../World/World'
import Loaders from '../Utils/Loaders'
import Sources from './sources'

//New
import Device from '../Utils/Device'
import Raycaster from '../Interactions/Raycaster'

declare global {
  interface Window {
    experience: Experience;
  }
}

export interface ISource {
    name: string;
    type: 'gltfModel' | 'texture' | 'video'; 
    path: string;
}

let instance: Experience

export default class Experience
{
    public canvas: HTMLCanvasElement | null = null
    private sources: ISource[] | null = null
    public debug: Debug | null = null
   
    public sizes: Sizes | null = null
    public time: Time | null = null
    public scene: Scene | null = null
    public loaders: Loaders | null = null
    public camera: Camera | null = null
    private renderer: Renderer | null = null
    private world: World | null = null

    public raycaster: Raycaster | null = null
    public device: Device | null = null

    constructor(_canvas?: HTMLCanvasElement)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        if (_canvas) this.canvas = _canvas
        this.device = new Device();
        this.sources = Sources
        this.loaders = new Loaders(this.sources);
        this.sizes = new Sizes();
        this.time = new Time();
        this.debug = new Debug();
        this.scene = new Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();


        this.raycaster = new Raycaster()

        //todo a mettre dans le manager
        this.raycaster.callEvents()

        new Promise((resolve, reject) => {
  
            setTimeout(resolve, 5000);
        }).then(() => {
            this.raycaster?.setObjectsScene("one")
        });
       
        // Resize event
        this.sizes.on('resize', () =>
        {
            console.log(this.scene?.children)
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
           
        })

      
        
    }

    resize()
    {
        this.camera?.resize()
        this.renderer?.resize()
    }

    update()
    {
        this.camera?.update()
        this.world?.update()
        this.renderer?.update()
        this.debug?.update()
       
        
    }

    destroy()
    {
        this.sizes?.off('resize')
        this.time?.off('tick')

        // Traverse the whole scene
        this.scene?.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera?.controls?.dispose()
        this.renderer?.instance?.dispose()

        if(this.debug?.active)
            this.debug.ui?.destroy()
    }
}