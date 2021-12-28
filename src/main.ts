import './main.scss'
import Experience from './webgl/Experience'

const startBtn = document.querySelector('.start-btn') 

startBtn?.addEventListener("click", ()=> {
    new Experience(document.getElementsByClassName('webgl')[0] as HTMLCanvasElement)
})
