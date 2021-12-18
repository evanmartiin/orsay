import * as dat from 'lil-gui'
import StatsGUI from './Stats';

export default class Debug
{
    public active: boolean = window.location.hash === '#debug';
    public ui: dat.GUI | null = null;
    protected stats: StatsGUI | null = null;

    constructor()
    {
        if(this.active)
        {
            this.ui = new dat.GUI()
            this.stats = new StatsGUI()
        }
    }

    update() {
        if (this.active) {
            this.stats?.update()
        }
    }
}