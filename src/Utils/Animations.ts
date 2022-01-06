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

    cameraAnimation = ( type: string, camera:any, cameraDestination: any, durationSequence?: number) => {
        const tl = gsap.timeline()
       
        if(type === "normal") {
            tl.to(camera.position, { z: cameraDestination.pos_z, y: cameraDestination.pos_y, x: cameraDestination.pos_x, duration: durationSequence,  ease:"power2.out"}, 0)
            tl.to(camera.rotation, { z: cameraDestination.rot_z, y: cameraDestination.rot_y, x: cameraDestination.rot_x, duration: durationSequence,  ease:"power2.out"}, 0)
            tl.to(camera.quaternion, { w: cameraDestination.quat_w, z: cameraDestination.quat_z, y: cameraDestination.quat_y, x: cameraDestination.quat_x, duration: durationSequence,  ease:"power2.out"}, 0)
        
        } else if(type === "reverse") {
            tl.to(camera.position, { z: cameraDestination.pos_z, y:cameraDestination.pos_y, x: cameraDestination.pos_x, duration: 2,  ease:"power2.inOut"}, 0)
            tl.to(camera.rotation, { z: cameraDestination.rot_z, y: cameraDestination.rot_y, x: cameraDestination.rot_x, duration: 2,  ease:"power2.inOut"}, 0)
            tl.to(camera.quaternion, { w: cameraDestination.quat_w, z: cameraDestination.quat_z, y: cameraDestination.quat_y, x: cameraDestination.quat_x, duration: 2,  ease:"power2.inOut"}, 0)
        }
    
    }

    hideAndShowSubtitles = (status:string, subtitleToHide:HTMLParagraphElement, disapearTime:number, subtitleToShow?:HTMLParagraphElement) => {

        const tl = gsap.timeline()
        const showTime = disapearTime + 0.6

        if(status === "showAndHide") {
           
            if(subtitleToShow) {  
                tl.to(subtitleToShow, { opacity:1,  ease:"power2.inOut", duration: 0.6}, 0) 
                tl.add(() => { subtitleToShow.remove() }, 1)    
                tl.to(subtitleToHide, { opacity:0,  ease:"power2.out", duration: 0.2}, disapearTime) 
            }
           
        } else if(status === "hideAndShow") {
                tl.to(subtitleToHide, { opacity:0,  ease:"power2.out", duration: 0.6}, disapearTime)
                if(subtitleToShow) { tl.to(subtitleToShow, { opacity:0,  ease:"power2.out", duration: 0.2}, showTime) }
                tl.add(() => { subtitleToHide.remove() }, 1)    
        }
        
        
    }
}