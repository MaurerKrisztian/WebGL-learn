attribute vec4 a_position;

uniform mat4 u_matrix;

uniform float u_fudgeFactor;

void main() {
    // Multiply the position by the matrix.
//    gl_Position = u_matrix * a_position;


    // Multiply the position by the matrix.
    vec4 position = u_matrix * a_position;

    // Adjust the z to divide by
    float zToDivideBy = 1.0 + position.z * u_fudgeFactor;

    // Divide x and y by z.
    gl_Position = vec4(position.xy / zToDivideBy, position.zw);
}
