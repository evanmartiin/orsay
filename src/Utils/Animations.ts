import {getProject} from "@theatre/core"
import studio from "@theatre/studio"
import { gsap } from "gsap";


export default class Animations {
    tl: any
    studio: any

    constructor() {

        // Init GSAP    
        this.tl = gsap.timeline()

        // Init theatreJS

        // this.studio = studio.initialize()
        // const proj = getProject("Manager")
        // const sheet = proj.sheet("Transition")
        // const obj = sheet.object("PlaneVideo1", { opacity: 1 })

    }   


    // test pour cacher et afficher la nouvelle video
    hideAndShow = (obj:any, obj2:any, status:string) => {

        
        // on cache l'ancien, on montre le nouveau
        if(status === "next") {
            this.tl.to(obj.position, {x: -5, duration: 0.6, ease:"power2.out"}, 0)
    
            this.tl.to(obj2.position, {z: - parseFloat(obj2.geometry.boundingBox.max.x).toFixed(2) * 2.5}, 0)

        } else {
            this.tl.reverse()
        }
      
    }

    cameraAnimation = (camera:any, cameraDestination: any, durationSequence: number) => {
        this.tl.to(camera.position, {  z: cameraDestination[0].pos_z, y:cameraDestination[0].pos_y, x: cameraDestination[0].pos_x, duration: durationSequence}, 0)
        this.tl.to(camera.rotation, {  z: cameraDestination[1].rot_z, y: cameraDestination[1].rot_y, x: cameraDestination[1].rot_x, duration: durationSequence}, 0)
        this.tl.to(camera.quaternion, {  w: cameraDestination[2].quat_w, z: cameraDestination[2].quat_z, y: cameraDestination[2].quat_y, x: cameraDestination[2].quat_x, duration: durationSequence}, 0)
    }

    show = () => {

    }
}