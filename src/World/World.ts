import SequenceManager2 from '../Scenes/SequenceManager2';
import Loaders from '../Utils/Loaders';
import Experience from '../webgl/Experience'
import Atelier from './Atelier';
import Environment from './Environment'

export default class World
{
    private experience: Experience = new Experience();
    private loaders: Loaders = this.experience.loaders as Loaders;
    protected atelier: Atelier | null = null;
    protected environment: Environment | null = null;

    // VIDEO
    protected sequenceManager: SequenceManager2 | null = null;

    constructor()
    {
        // Wait for resources
        this.loaders.on('ready', () =>
        {
           
            this.atelier = new Atelier()
            this.environment = new Environment()
            setTimeout(() => {
                this.sequenceManager = new SequenceManager2()
            }, 1000);
        })
    }

    update()
    {
       
    }


}