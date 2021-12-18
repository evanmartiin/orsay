import Loaders from '../Utils/Loaders';
import Experience from '../webgl/Experience'
import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'

export default class World
{
    private experience: Experience = new Experience();
    private loaders: Loaders = this.experience.loaders as Loaders;
    protected floor: Floor | null = null;
    protected fox: Fox | null = null;
    protected environment: Environment | null = null;

    constructor()
    {
        // Wait for resources
        this.loaders.on('ready', () =>
        {
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}