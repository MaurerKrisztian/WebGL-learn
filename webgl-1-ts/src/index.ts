import { WebGL } from "./WebGL";
import { Render } from "./Render";
import { Attributes } from "./Attributes";
import { Rectangle } from "./shapes/Rectangle";
import { Colors } from "./Colors";
import { Triangle } from "./shapes/Triangle";
import { Slider } from "./Helpers/Slider";

import  vertexShaderStr from '../glsl/vertex-shader-2d.glsl';
import  fragmentShaderStr from '../glsl/fragment-shader-2d.glsl';

WebGL.init(vertexShaderStr, fragmentShaderStr);
const gl = WebGL.getWebglContext()
const program = WebGL.getProgram();
gl.useProgram(program);

Attributes.a_position_location = gl.getAttribLocation(program, "a_position");
Attributes.u_resolution_location = gl.getUniformLocation(program, "u_resolution");
Attributes.u_color_location = gl.getUniformLocation(program, "u_color")

console.log(Attributes.u_resolution_location)
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
gl.uniform2f(Attributes.u_resolution_location, gl.canvas.width, gl.canvas.height);

/*
*
* Rendering
*
* * */

const renderer = new Render(gl);


gl.enableVertexAttribArray(Attributes.a_position_location); // turn the attribute on
gl.enableVertexAttribArray(Attributes.u_resolution_location); // turn the attribute on
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




const slider = new Slider("slider1", 1,gl.canvas.width - 20);
slider.setCallback(()=>{
    // console.log(slider.getValue())
    rectPosX = Number.parseInt(slider.getValue())
    update();
})

let rectPosX = 10;

function update() {
    renderer.draw(new Rectangle( {x: 300, y: 200, width: 500, height: 300}, Colors.GREEN))
    renderer.draw(new Rectangle( {x: 50, y: 100, width: 600, height: 260}, Colors.BLUE))
    renderer.draw(new Triangle( {x: 1000, y: 0}, {x: 200, y: 0}, {x: 500, y: 300}, Colors.RED))
    renderer.draw(new Rectangle({x:  rectPosX, y: 300, width: 300, height: 300}, Colors.BLACK))
}

update()
