
attribute vec2 a_position; // A vec2 is similar to a vec4 but only has x and y.

uniform vec2 u_resolution;
uniform mat3 u_matrix; // translation, rotation, scale

// pass to fragment shader
varying vec4 v_color;

//  pixels coordinates and convert them to clip space.
void main() {


    // Multiply the position by the matrix.
    gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);


    // pass to fragment shader
    v_color = gl_Position * 0.5 + 0.5;
}
