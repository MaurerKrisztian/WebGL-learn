import { WebGL } from "./WebGL";
import { Render } from "./Render";
import { Attributes } from "./glsl/data/Attributes";
import { Rectangle } from "./shapes/Rectangle";
import { Colors } from "./Colors";
import { Triangle } from "./shapes/Triangle";
import { Slider } from "./Helpers/Slider";

import vertexShaderStr from './glsl/vertex-shader-2d.glsl';
import fragmentShaderStr from './glsl/fragment-shader-2d.glsl';
import { Uniforms } from "./glsl/data/Uniforms";

WebGL.init(vertexShaderStr, fragmentShaderStr);
const gl = WebGL.getWebglContext()
const program = WebGL.getProgram();
gl.useProgram(program);

Attributes.a_position_location = gl.getAttribLocation(program, "a_position");
Uniforms.u_resolution_location = gl.getUniformLocation(program, "u_resolution");
Uniforms.u_color_location = gl.getUniformLocation(program, "u_color")
Uniforms.u_translation_location = gl.getUniformLocation(program, "u_translation");
Uniforms.u_rotation_location = gl.getUniformLocation(program, "u_rotation");
Uniforms.u_scale_location = gl.getUniformLocation(program, "u_scale")

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

var positions = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
];

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


// set the resolution
gl.uniform2f(Uniforms.u_resolution_location, gl.canvas.width, gl.canvas.height);

/*
*
* Rendering
*
* * */

const renderer = new Render(gl);


gl.enableVertexAttribArray(Attributes.a_position_location); // turn the attribute on
gl.enableVertexAttribArray(Uniforms.u_resolution_location); // turn the attribute on
// Then we need to specify how to pull the data out

// Bind the position buffer.
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 2;          // 2 components per iteration
var type = gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer


//  attribute is bound to positionBuffer
gl.vertexAttribPointer(Attributes.a_position_location, size, type, normalize, stride, offset) // That means we're free to bind something else to the ARRAY_BUFFER bind point. The attribute will continue to use positionBuffer.


const slider_rotation = new Slider("rotation", -180, 180);
const slider_translation_x = new Slider("translation x", 1, gl.canvas.width);
const slider_translation_y = new Slider("translation y", 1, gl.canvas.height);
const slider_scale = new Slider("scale", 1, 5);

slider_rotation.setCallback(() => {
    degree = Number.parseFloat(slider_rotation.getValue())
    update();
})

slider_translation_x.setCallback(() => {
    rectPosX = Number.parseFloat(slider_translation_x.getValue())
    update();
})
slider_translation_y.setCallback(() => {
    rectPosY = Number.parseFloat(slider_translation_y.getValue())
    update();
})
slider_scale.setCallback(() => {
    scale = Number.parseFloat(slider_scale.getValue())
    update();
})

let rectPosX = 10;
let rectPosY = 10
let degree = 0
let scale = 1

function update() {
    // WebGL.initUpdate(gl);
    renderer.draw(new Rectangle({x: 50, y: 100, width: 600, height: 260}, Colors.BLUE))
    renderer.draw(new Triangle({x: 1000, y: 0}, {x: 200, y: 0}, {x: 500, y: 300}, Colors.RED))
    renderer.draw(new Rectangle({x: 0, y: 0, width: 300, height: 300}, Colors.BLACK).setTranslation({
        x: rectPosX,
        y: rectPosY
    }).setRotationDegrees(degree).setScale({x: scale, y: scale}))
    renderer.draw(new Rectangle({x: 0, y: 0, width: 100, height: 300}, Colors.GREEN).setTranslation({
        x: 300,
        y: 100
    }).setRotationDegrees(degree))
}

update()
