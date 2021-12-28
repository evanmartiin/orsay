precision highp float;

uniform float time;
uniform vec2 mouse;
uniform vec2 rez;

uniform sampler2D texture;

varying vec2 vUv;

void main() {

    float pct = 0.0;
    vec2 uv = vUv - .5;
    uv.x *= (rez.x/rez.y);
    vec2 cursor = vec2(mouse.x * (rez.x/rez.y), -mouse.y) / 2.;

    // The DISTANCE from the pixel to the mouse
    pct = distance( uv, cursor);
    // Convert to linear
    float dist = dot(pct,pct);
    float disc = smoothstep( 0.05, 0.0, dist);
    
    // vec3 color = vec3(disc);

    vec3 color = texture2D(texture, vUv + vec2(disc * .1)).xyz;
    gl_FragColor = vec4( color, 1.0 );

}