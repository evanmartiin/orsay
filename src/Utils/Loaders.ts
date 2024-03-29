import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ISource } from '../webgl/Experience';
import EventEmitter from './EventEmitter'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js';

export default class Loaders extends EventEmitter
{
    private sources: ISource[];
    public items: any;
    private toLoad: number | null = null;
    private loaded: number = 0;
    private loaders: any;
    public renderer: any;

    constructor(sources: ISource[], renderer: any)
    {
        super()

        this.sources = sources
        this.items = {}
        this.toLoad = this.sources.length

        this.renderer = renderer

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')
        this.loaders.gltfLoader.setDRACOLoader(dracoLoader)
        this.loaders.textureLoader = new TextureLoader()

        this.loaders.basis = new BasisTextureLoader()
        this.loaders.basis.setTranscoderPath('/basis/')
        this.loaders.basis.detectSupport( this.renderer );
    }

    startLoading()
    {
        if (this.sources) {
            // Load each source
            for(const source of this.sources as any)
            {
                if(source.type === 'gltfModel')
                {
                    this.loaders.gltfLoader.load(
                        source.path,
                        (file: any) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                }
                else if(source.type === 'texture')
                {
                    this.loaders.textureLoader.load(
                        source.path,
                        (file: any) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                }

                else if(source.type === 'basis')
                {
                    this.loaders.basis.load(
                        source.path,
                        (file: any) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                }
            }
        }
    }

    sourceLoaded(source: any, file: any)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}