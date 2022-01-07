import './main.scss'
import Experience from './webgl/Experience'
import gsap from 'gsap'

const startBtn = document.querySelector('.start-btn')
const home: HTMLElement = document.querySelector('.home') as HTMLElement

startBtn?.addEventListener("click", ()=> {
    new Experience(document.getElementsByClassName('webgl')[0] as HTMLCanvasElement)
    home.style.pointerEvents = "none";
    console.log();
    
    gsap.to(home.children, { opacity: 0, marginTop: 30, duration: .5, stagger: .3 })
    gsap.to(home, { opacity: 0, duration: 1, delay: 1.5 })
})
