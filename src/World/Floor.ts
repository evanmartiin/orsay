import { CircleGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, Scene, sRGBEncoding } from 'three';
import Loaders from '../Utils/Loaders';
import Experience from '../webgl/Experience'

export default class Floor
{
    private experience: Experience = new Experience();
    private scene: Scene = this.experience.scene as Scene;
    private loaders: Loaders = this.experience.loaders as Loaders;
    private geometry: CircleGeometry | null = null;
    private textures: any;
    private material: MeshStandardMaterial | null = null;
    private mesh: Mesh | null = null;

    constructor()
    {
        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new CircleGeometry(5, 64)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.loaders.items.grassColorTexture
        this.textures.color.encoding = sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = RepeatWrapping
        this.textures.color.wrapT = RepeatWrapping

        this.textures.normal = this.loaders.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = RepeatWrapping
        this.textures.normal.wrapT = RepeatWrapping
    }

    setMaterial()
    {
        this.material = new MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    setMesh()
    {
        if (this.geometry && this.material) {
            this.mesh = new Mesh(this.geometry, this.material)
            this.mesh.rotation.x = - Math.PI * 0.5
            this.mesh.receiveShadow = true
            this.scene.add(this.mesh)
        }
    }
}