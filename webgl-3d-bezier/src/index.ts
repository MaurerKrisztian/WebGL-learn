import { WebGL } from "./WebGL";
import { Render } from "./core/Render";
import { Attributes } from "./glsl/data/Attributes";

import vertexShaderStr from './glsl/vertex-shader-3d.glsl';
import fragmentShaderStr from './glsl/fragment-shader-3d.glsl';
import { Uniforms } from "./glsl/data/Uniforms";
import { Debugger } from "./debug/Debugger";
import { LetterF } from "./shapes/LetterF";
import { Buffers } from "./glsl/data/Buffers";
import { TextureLoader } from "./core/TextureLoader";
import { BezierLathe } from "./shapes/BezierLathe";
import { BezierDebugger } from "./debug/BezierDebugger";

WebGL.init(vertexShaderStr, fragmentShaderStr);
const gl = WebGL.getWebglContext()
const program = WebGL.getProgram();


const webglUtils = require("./WebGLUtils")

Attributes.a_position_location = gl.getAttribLocation(program, "a_position");
Attributes.a_texcoord_location = gl.getAttribLocation(program, "a_texcoord");

Uniforms.u_matrix_location = gl.getUniformLocation(program, "u_matrix")
Uniforms.u_texture_location = gl.getUniformLocation(program, "u_texture");

Buffers.init(gl)
const svg = "m44,434c18,-33 19,-66 15,-111c-4,-45 -37,-104 -39,-132c-2,-28 11,-51 16,-81c5,-30 3,-63 -36,-63";

// let texture = TextureLoader.loadTexture(gl, "/src/resources/uv-grid.png")
let textureInfo = TextureLoader.loadImageTexture(gl, "/src/resources/uv-grid.png", ()=>{})
// gl.uniform1i(Uniforms.u_texture_location, textureInfo.texture);
webglUtils.setUniforms(program, {
    u_texture: textureInfo.texture,
});


const renderer = new Render(gl);
const debugger1 = new BezierDebugger(gl);
const letterF = new LetterF()

letterF.transformation.setTranslation({
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

// const bezier = new BezierLathe("m44,434c18,-33 19,-66 15,-111c-4,-45 -37,-104 -39,-132c-2,-28 11,-51 16,-81c5,-30 3,-63 -36,-100");
const bezier = new BezierLathe("M 482, 590 C 73, 773, 500, 100, 483, 586");
// const bezier = new BezierLathe(svg);
drawScene()


function drawScene() {
    WebGL.initUpdate(gl);

    // renderer.draw(letterF)

    bezier.transformation.setTranslation({
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

    bezier.bezierGenerator.bezierOptions.endAngle = debugger1.bezierOptions.endAngle
    bezier.bezierGenerator.bezierOptions.divisions = debugger1.bezierOptions.divisions
renderer.draw(bezier)


    requestAnimationFrame(drawScene)
}

