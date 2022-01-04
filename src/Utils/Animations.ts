import {getProject} from "@theatre/core"
import studio from "@theatre/studio"


export default class Animations {
    tl: any
    studio: any

    constructor() {

        this.studio = studio.initialize()
        
        const proj = getProject("Manager")

        const sheet = proj.sheet("Transition")

        // create an object
        const obj = sheet.object("PlaneVideo1", { opacity: 1 })
    }   

    hide = () => {

    }

    show = () => {

    }
}