precision mediump float;

uniform vec4 u_color;
varying vec4 v_color; // get from vertex shader
uniform int u_enable_path_color;

void main() {
    if (u_enable_path_color > 0){
        gl_FragColor = v_color;
    } else {
        gl_FragColor = u_color;
    }
}
