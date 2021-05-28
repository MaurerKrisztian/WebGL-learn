import { WebGL } from "./WebGL";
import { Render } from "./Render";
import { Attributes } from "./glsl/data/Attributes";
import { Rectangle } from "./shapes/Rectangle";
import { Colors } from "./Colors";

import vertexShaderStr from './glsl/vertex-shader-2d.glsl';
import fragmentShaderStr from './glsl/fragment-shader-2d.glsl';
import { Uniforms } from "./glsl/data/Uniforms";
import { Debugger } from "./debug/Debugger";

WebGL.init(vertexShaderStr, fragmentShaderStr);
const gl = WebGL.getWebglContext()
const program = WebGL.getProgram();
gl.useProgram(program);

Attributes.a_position_location = gl.getAttribLocation(program, "a_position");
Uniforms.u_matrix_location = gl.getUniformLocation(program, "u_matrix")
Uniforms.u_color_location = gl.getUniformLocation(program, "u_color")

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


const renderer = new Render(gl);


gl.enableVertexAttribArray(Attributes.a_position_location); // turn the attribute on
gl.enableVertexAttribArray(Uniforms.u_resolution_location); // turn the attribute on
// Then we need to specify how to pull the data out

// Bind the position buffer.
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 3;          // 3 components per iteration
var type = gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer


//  attribute is bound to positionBuffer
gl.vertexAttribPointer(Attributes.a_position_location, size, type, normalize, stride, offset) // That means we're free to bind something else to the ARRAY_BUFFER bind point. The attribute will continue to use positionBuffer.

const debugger1 = new Debugger(gl);


let rectPosX = 10;
let rectPosY = 10
let rectPosZ = 10
let degree = 0
let scale = 1


function update() {

    WebGL.initUpdate(gl);

    // console.log("degreeeeeeeeeeeeeeeeee: ", degree)
    const rect = new Rectangle({x: 0, y: 0, width: 150, height: 150}, Colors.BLACK).setTranslation({
        x: debugger1.debugValues.translationX,
        y: debugger1.debugValues.translationY,
        z: debugger1.debugValues.translationZ
    }).setRotationDegrees({
        x: debugger1.debugValues.rotationX,
        y: debugger1.debugValues.rotationY,
        z: debugger1.debugValues.rotationZ
    }).setScale({
        x: debugger1.debugValues.scaleX,
        y: debugger1.debugValues.scaleY,
        z: debugger1.debugValues.scaleZ
    })

    //
    renderer.draw(new Rectangle({x: 0, y: 0, width: 600, height: 260}, Colors.BLUE).setTranslation({x: 100, y: 700, z: 0}))
    // // renderer.draw(new Triangle({x: 1000, y: 0}, {x: 200, y: 0}, {x: 500, y: 300}, Colors.RED))
    renderer.draw(rect)
    // renderer.draw(new Rectangle({x: 0, y: 0, width: 100, height: 300}, Colors.GREEN).setTranslation({
    //     x: 300,
    //     y: 100
    // }).setRotationDegrees(degree))

    requestAnimationFrame(update);
}

update()
