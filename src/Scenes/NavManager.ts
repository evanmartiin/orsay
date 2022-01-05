import { gsap } from "gsap";

let instance: NavManager;

export default class NavManager {
    private stepper: HTMLElement = document.querySelector(".stepper") as HTMLElement
    private progressBar: HTMLElement = document.querySelector(".bar") as HTMLElement
    private bullets: HTMLElement[] = Array.from(document.querySelector(".progress")?.getElementsByClassName("bullet") as HTMLCollection) as HTMLElement[]

    private sequenceNumber: number = 0;
    private percent: number = 0;

    constructor() {
        if (instance) {
            return instance
        }
        instance = this
    }

    init() {
        this.stepper.style.opacity = "1";
    }

    update(sequenceNumber: number) {
        this.sequenceNumber = sequenceNumber;

        this.bullets.forEach((bullet, index) => {
            bullet.style.backgroundColor = index >= sequenceNumber ? "#d4c5b2" : "#3D2328";
        })

        this.percent = 100 / (this.bullets.length - 1) * (sequenceNumber - 1);
        this.progressBar.style.background = `linear-gradient(to right, #3D2328 ${this.percent}%, #d4c5b2 ${this.percent}%)`;
        console.log(this.percent);
        
    }

    animateBar(duration: number) {
        let destination = 100 / (this.bullets.length - 1) * this.sequenceNumber;

        gsap.to(this, {percent: destination, duration: duration, onUpdate: () => {
            this.progressBar.style.background = `linear-gradient(to right, #3D2328 ${this.percent}%, #d4c5b2 ${this.percent}%)`;
        }});
    }

    globalView = (totalTimeSequence: Number, ) => {

    }

}