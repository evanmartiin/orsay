precision highp float;

uniform float time;
uniform vec2 mouse;
uniform vec2 rez;

uniform sampler2D texture;

varying vec2 vUv;

void main() {

      
    vec3 color = texture2D(texture, vUv).xyz;
    gl_FragColor = vec4( color, 1.0 );

}