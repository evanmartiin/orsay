import { ISource } from "./Experience";

const Sources: ISource[] = [

    {
        name: 'atelierModel',
        type: 'gltfModel',
        path: '/models/bureau-AN-baked.glb'
    },
    {
        name: 'baked',
        type: 'texture',
        path: '/textures/baked4-s.jpg'
    },
    {
        name: 'bakedBasis',
        type: 'basis',
        path: '/textures/baked4-s.basis'
    },
    

]

export default Sources;