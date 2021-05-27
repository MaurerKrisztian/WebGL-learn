
attribute vec2 a_position; // A vec2 is similar to a vec4 but only has x and y.

uniform vec2 u_resolution;
uniform vec2 u_translation; // move
uniform vec2 u_rotation; // rotation
uniform vec2 u_scale;

// pass to fragment shader
varying vec4 v_color;

//  pixels coordinates and convert them to clip space.
void main() {

    // Scale the position
    vec2 scaledPosition = a_position * u_scale;

    // Rotate the position
    vec2 rotatedPosition = vec2(
    scaledPosition.x * u_rotation.y + scaledPosition.y * u_rotation.x,
    scaledPosition.y * u_rotation.y - scaledPosition.x * u_rotation.x);

    // Add in the translation.
    vec2 position = rotatedPosition + u_translation;


    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / u_resolution;

    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace, 0, 1);

    // pass to fragment shader
    v_color = gl_Position * 0.5 + 0.5;
}
