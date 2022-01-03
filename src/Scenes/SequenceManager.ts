import Sequence from './Sequence'
import AudioManager from './AudioManager'


export default class SequenceManager {   
    
    sequence: Sequence
    currentScene: number
    am: AudioManager

    constructor() {
        this.currentScene = 1
        this.am = new AudioManager()
    }

    initManager = () => {

    }

    step = (choiceStatus, currentScene) => {
        
    }
}