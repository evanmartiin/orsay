import * as THREE from 'three'
import Sizes from "../Utils/Sizes";
import { Vector2, Object3D, Scene, PerspectiveCamera, Intersection, Mesh} from 'three';
import Experience from '../webgl/Experience';
import Interactions from './Interactions';

export default class Raycaster {

    //private scene: THREE.Scene
    //private camera: any
    //private renderer: any
    private raycaster: THREE.Raycaster = new THREE.Raycaster();
    private mouse: THREE.Vector2 = new THREE.Vector2();
    private objects: any = [];

    private experience: Experience = new Experience();
    public interactions: Interactions = new Interactions();
    private scene: Scene = this.experience.scene as Scene;
    private camera: PerspectiveCamera | null | undefined = this.experience.camera?.instance;
    private sizes: Sizes = this.experience.sizes as Sizes;
    public intersects: Intersection[] = [];
    private currentIntersect: Intersection | null = null;
    private selectedObjects: Object3D[] = []
   
    constructor() {

        // const rayOrigin = new THREE.Vector3(- 3, 0, 0)
        // const rayDirection = new THREE.Vector3(10, 0, 0)
        // rayDirection.normalize()

    }
 

    onClick = (event: MouseEvent) => {

        this.mouse.x = event.clientX / this.sizes.width * 2 - 1
        this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
       
        
        this.raycaster.setFromCamera(new Vector2(this.mouse.x, this.mouse.y), this.camera as PerspectiveCamera)
       
        this.intersects = this.raycaster.intersectObjects(this.scene.children, true)
       
       
        if (this.intersects.length) {
           
            this.currentIntersect = this.intersects[0]
            

            if(this.currentIntersect.object) {
                switch (this.currentIntersect.object.name) {
                case "base":
                    this.interactions.animate(this.currentIntersect.object as Mesh);
                    break
                }
            }
        }

    }

    onHover = (event: PointerEvent) => {

        if ( event.isPrimary === false ) return;

        this.mouse.x = event.clientX / this.sizes.width * 2 - 1
        this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1

        this.checkIntersection();

    }

    addSelectedObject = (object: Object3D) => {

        this.selectedObjects = [];
        this.selectedObjects.push(object);

    }

    checkIntersection = () => {

        this.raycaster.setFromCamera(this.mouse, this.camera as PerspectiveCamera);

        const intersects = this.raycaster.intersectObject(this.scene, true);

        if (intersects.length > 0) {
            const selectedObject: Object3D = intersects[0].object;
            this.addSelectedObject(selectedObject);
            this.interactions.outlinePass.selectedObjects = this.selectedObjects;

        } else {

            // outlinePass.selectedObjects = [];

        }

    }

    callEvents = () => {
        window.addEventListener('click', this.onClick)
        this.experience.renderer?.instance?.domElement.addEventListener('pointermove', this.onHover)
    }

    setObjectsScene = (sequence: string) => {

        // todo globaliser les objets?
        if(sequence === "one") {
            const floor = this.scene.getObjectByProperty('name', 'Floor');
            
            this.objects.push(floor)
           
        }
    }
   
}