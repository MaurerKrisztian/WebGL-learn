import { WebGL } from "./WebGL";
import { Render } from "./Render";
import { Attributes } from "./glsl/data/Attributes";

import vertexShaderStr from './glsl/vertex-shader-2d.glsl';
import fragmentShaderStr from './glsl/fragment-shader-2d.glsl';
import { Uniforms } from "./glsl/data/Uniforms";
import { Debugger } from "./debug/Debugger";
import { LetterF } from "./shapes/LetterF";
import { Buffers } from "./glsl/data/Buffers";
import { TextureLoader } from "./TextureLoader";
import { BezierLathe } from "./shapes/BezierLathe";

WebGL.init(vertexShaderStr, fragmentShaderStr);
const gl = WebGL.getWebglContext()
const program = WebGL.getProgram();


Attributes.a_position_location = gl.getAttribLocation(program, "a_position");
Attributes.a_texcoord_location = gl.getAttribLocation(program, "a_texcoord");

Uniforms.u_matrix_location = gl.getUniformLocation(program, "u_matrix")
Uniforms.u_texture_location = gl.getUniformLocation(program, "u_texture");

Buffers.init(gl)

TextureLoader.loadTexture(gl, "/src/resources/minecraft.jpg")

const renderer = new Render(gl);
const debugger1 = new Debugger(gl);
const letterF = new LetterF().setTranslation({
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

const bezier = new BezierLathe(gl);
drawScene()


function drawScene() {
    WebGL.initUpdate(gl);

    // letterF.setTranslation({
    //     x: debugger1.debugValues.translationX,
    //     y: debugger1.debugValues.translationY,
    //     z: debugger1.debugValues.translationZ
    // }).setRotationDegrees({
    //     x: debugger1.debugValues.rotationX,
    //     y: debugger1.debugValues.rotationY,
    //     z: debugger1.debugValues.rotationZ
    // }).setScale({
    //     x: debugger1.debugValues.scaleX,
    //     y: debugger1.debugValues.scaleY,
    //     z: debugger1.debugValues.scaleZ
    // })
    // //
    // // LetterF.setTexcoords(gl)
    renderer.draw(bezier.setTranslation({
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
    }))


    requestAnimationFrame(drawScene)
}

