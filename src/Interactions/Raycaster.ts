import * as THREE from 'three'
import Sizes from "../Utils/Sizes";
import { Camera, Scene, Vector2, Mesh, Group, Object3D} from 'three';
import Experience from '../webgl/Experience';

export default class Raycaster {

    //private scene: THREE.Scene
    //private camera: any
    //private renderer: any
    private raycaster: THREE.Raycaster
    private mouse: THREE.Vector2
    private objects: any

    private experience: Experience = new Experience();
    private scene: any
    private camera: any
    private sizes: Sizes = this.experience.sizes as Sizes;
    private intersects: any
    private currentIntersect: any
   
    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera?.instance
        
        this.mouse = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()

        this.currentIntersect = null
        // const rayOrigin = new THREE.Vector3(- 3, 0, 0)
        // const rayDirection = new THREE.Vector3(10, 0, 0)
        // rayDirection.normalize()
       
        
        this.objects = []

    }


 

    onClick = (event: MouseEvent) => {
        
        this.mouse.x = event.clientX / this.sizes.width * 2 - 1
        this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
       
        
        this.raycaster.setFromCamera(new Vector2(this.mouse.x, this.mouse.y), this.camera)
       
        this.intersects = this.raycaster.intersectObjects(this.scene.children, true)
       
       
        if (this.intersects.length) {
           
            this.currentIntersect = this.intersects[0]

            if(this.currentIntersect.object) {
                switch (this.currentIntersect.object.name) {
                case "Floor":
                    console.log('click Floor')
                    break
                }
           }
        }
        
    }

    callEvents = () => {
        window.addEventListener('click', this.onClick)
    }

    setObjectsScene = (sequence: string) => {


        // todo globaliser les objets?
        if(sequence === "one") {
            const floor = this.scene.getObjectByProperty('name', 'Floor');
            this.objects.push(floor)
           
        } 
    }
   
}