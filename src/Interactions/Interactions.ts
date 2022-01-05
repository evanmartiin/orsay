import { Camera, Color, Mesh, MeshStandardMaterial, Scene, Vector2, WebGLRenderer } from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import Experience from "../webgl/Experience.js";

export default class Interactions {
    private experience: Experience = new Experience();
    public composer: EffectComposer;
    private renderPass: RenderPass;
    public outlinePass: OutlinePass;
    private effectFXAA: ShaderPass;

    constructor() {
        this.composer = new EffectComposer(this.experience.renderer?.instance as WebGLRenderer)

        this.renderPass = new RenderPass(this.experience.scene as Scene, this.experience.camera?.instance as Camera)
        this.composer.addPass(this.renderPass);
        
        this.outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), this.experience.scene as Scene, this.experience.camera?.instance as Camera)
        this.outlinePass.edgeStrength = 3.0
        this.outlinePass.edgeGlow = 0.0
        this.outlinePass.edgeThickness = 1.0
        this.outlinePass.pulsePeriod = 0
        this.outlinePass.usePatternTexture = false
        this.outlinePass.visibleEdgeColor.set('#ffffff')
        this.outlinePass.hiddenEdgeColor.set('#190a05')
        this.composer.addPass(this.outlinePass);

        this.effectFXAA = new ShaderPass(FXAAShader);
        this.effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
		this.composer.addPass(this.effectFXAA);
    }

    animate(model: Mesh) {
        const modelMaterial = model.material as MeshStandardMaterial;
        let color = modelMaterial.color;
        modelMaterial.color = new Color(color.r - .1, color.g - .1, color.b - .1);
        model.position.x += .1;
    }
}