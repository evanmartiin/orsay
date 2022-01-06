import gsap from "gsap";
gsap.defaults({ ease: "none" });

let instance: NavManager;

export default class NavManager {
    private stepper: HTMLElement = document.querySelector(".stepper") as HTMLElement
    private stepperTitle: HTMLElement = document.querySelector(".step-title") as HTMLElement
    private progressBar: HTMLElement = document.querySelector(".bar") as HTMLElement
    private bullets: HTMLElement[] = Array.from(document.querySelector(".progress")?.getElementsByClassName("bullet") as HTMLCollection) as HTMLElement[]

    private prevBtn: HTMLElement = document.querySelector(".prev") as HTMLElement

    private navigation: HTMLElement = document.querySelector(".navigation") as HTMLElement

    private sequenceNumber: number = 0;
    private percent: number = 0;
    private barAnimation: any = null;
    private titles: string[] = ["Esquisses", "Aquarelle", "Atelier"];

    constructor() {
        if (instance) {
            return instance
        }
        instance = this
    }

    init() {
        this.stepper.style.opacity = "1";
        this.navigation.style.opacity = "1";
        this.navigation.style.pointerEvents = "all";
    }

    update(sequenceNumber: number) {
        this.sequenceNumber = sequenceNumber;

        this.bullets.forEach((bullet, index) => {
            bullet.style.backgroundColor = index >= sequenceNumber ? "#d4c5b2" : "#3D2328";
        })
        this.stepperTitle.innerHTML = this.titles[sequenceNumber - 1];

        this.percent = 100 / (this.bullets.length - 1) * (sequenceNumber - 1);
        console.log(this.percent);
        
        this.barAnimation?.kill();
        
        this.progressBar.style.background = `linear-gradient(to right, #3D2328 ${this.percent}%, #d4c5b2 ${this.percent}%)`;

        if (sequenceNumber === 1) {
            this.prevBtn.style.opacity = "0";
            this.prevBtn.style.pointerEvents = "none";
        } else {
            this.prevBtn.style.opacity = ".3";
            this.prevBtn.style.pointerEvents = "all";
        }
    }

    animateBar(duration: number) {
        this.percent = 100 / (this.bullets.length - 1) * (this.sequenceNumber - 1);
        let destination = 100 / (this.bullets.length - 1) * this.sequenceNumber;

        this.barAnimation?.kill();
        
        this.barAnimation = gsap.fromTo(this, {percent: this.percent}, {percent: destination, duration: duration, onUpdate: _ => {
            this.progressBar.style.background = `linear-gradient(to right, #3D2328 ${this.percent}%, #d4c5b2 ${this.percent}%)`;
        }, onComplete: _ => {
            this.bullets[this.sequenceNumber].style.backgroundColor = "#3D2328";
        }});
        
    }

    globalView = (totalTimeSequence: Number, ) => {

    }

}