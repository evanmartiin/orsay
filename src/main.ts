import './main.scss'
import Experience from './webgl/Experience'

const startBtn = document.querySelector('.start-btn')
const home: HTMLElement = document.querySelector('.home') as HTMLElement

startBtn?.addEventListener("click", ()=> {
    new Experience(document.getElementsByClassName('webgl')[0] as HTMLCanvasElement)
    home.style.opacity = "0";
    home.style.pointerEvents = "none";
})
