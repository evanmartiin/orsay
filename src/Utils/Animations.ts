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

        this.studio = studio.initialize()
        const proj = getProject("Manager")
        const sheet = proj.sheet("Transition")
        const obj = sheet.object("PlaneVideo1", { opacity: 1 })

    }   


    // test pour cacher et afficher la nouvelle video
    hideAndShow = (obj:any, obj2:any, status:string) => {

        // on cache l'ancien, on montre le nouveau
        if(status === "nextOne") {
            this.tl.to(obj.position, {x: -5, duration: 0.6}, 0)
            this.tl.to(obj.material, {opacity: 0, ease:"power2.out", duration: 0.2}, 0.4)
    
            this.tl.to(obj2.position, {x: - (obj2.boundingBox.max )}, 0)
            this.tl.to(obj2.material, { opacity: 1}, 0)
            
        } else {
            this.tl.reverse()
        }
      
    }

    show = () => {

    }
}