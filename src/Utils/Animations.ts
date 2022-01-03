import gsap from "gsap";
import {getProject} from "@theatre/core"
import studio from "@theatre/studio"


export default class Animations {
    tl: any
    studio: any

    constructor() {

        this.tl = gsap.timeline()

        this.studio = studio.initialize()
        const proj = getProject(
            // the ID of the project is "My first project"
            "First project"
         )

        const sheet = proj.sheet(
            // Our sheet is identified as "Scene"
            "Scene"
        )

        // create an object
        const obj = sheet.object(
            // The object's key is "Fist object"
         "First object",
            // These are the object's default values (and as we'll later learn, its props types)
            {
                // we pick our first props's name to be "foo". It's default value is 0.
                // Theatre will determine that the type of this prop is a number
                foo: 0,
                 // Second prop is a boolean called "bar", and it defaults to true.
                bar: true,
                // Last prop is a string
                baz: "A string",
            }
        )
    }   

    hide = () => {

    }

    show = () => {

    }
}