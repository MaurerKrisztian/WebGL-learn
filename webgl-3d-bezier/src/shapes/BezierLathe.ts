import { IDrawable } from "./Rectangle";
import { Transformation } from "../core/Transformation";
import { BezierGenerator } from "../core/BezierGenerator";
import { Uniforms } from "../glsl/data/Uniforms";
import { Buffers } from "../glsl/data/Buffers";
import { Attributes } from "../glsl/data/Attributes";
import { TextureLoader } from "../core/TextureLoader";


const webglUtils = require("../WebGLUtils")

export class BezierLathe implements IDrawable {
    bezierGenerator = new BezierGenerator();

    constructor(public svg: string, public transformation: Transformation = new Transformation()) {
    }

    show(gl) {
        // gl.uniform1i(Uniforms.u_texture_location, 0);
        const meshInfos = this.bezierGenerator.setMesh(gl);
        let matrix = this.transformation.getMatrix(gl)
        gl.uniformMatrix4fv(Uniforms.u_matrix_location, false, matrix);

        let bufferInfo = webglUtils.createBufferInfoFromArrays(gl, meshInfos);
        console.log(bufferInfo)

        TextureLoader.setTexture(gl, meshInfos.texcoord, Attributes.a_texcoord_location, Buffers.texcoordBuffer);
        this.drawBufferInfo(gl, bufferInfo, this.bezierGenerator.bezierOptions.triangles ? gl.TRIANGLES : gl.LINES);
    }

    /**
     * set te texture with coordinates
     *
    * */
//     setTexcoords(gl, texcoord) {
//         var buffer = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//         gl.enableVertexAttribArray(Attributes.a_texcoord_location);
//
// // We'll supply texcoords as floats.
//         gl.vertexAttribPointer(Attributes.a_texcoord_location, 2, gl.FLOAT, false, 0, 0);
//
//
//         gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.texcoordBuffer);
//
//         gl.bufferData(
//             gl.ARRAY_BUFFER,
//             new Float32Array(texcoord),
//             gl.STATIC_DRAW);
//
//         gl.enableVertexAttribArray(Attributes.a_texcoord_location);
//         // bind the texcoord buffer.
//         gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.texcoordBuffer);
//
//         // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
//         var size = 2;          // 2 components per iteration
//         var type = gl.FLOAT;   // the data is 32bit floats
//         var normalize = false; // don't normalize the data
//         var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
//         var offset = 0;        // start at the beginning of the buffer
//         gl.vertexAttribPointer(
//             Attributes.a_texcoord_location, size, type, normalize, stride, offset);
//     }


    drawBufferInfo(gl, bufferInfo, primitiveType, count?: any, offset?: any) {
        const indices = bufferInfo.indices;
        primitiveType = primitiveType === undefined ? gl.TRIANGLES : primitiveType;
        const numElements = count === undefined ? bufferInfo.numElements : count;
        offset = offset === undefined ? 0 : offset;
        if (indices) {
            gl.drawElements(primitiveType, numElements, gl.UNSIGNED_SHORT, offset);
        } else {
            gl.drawArrays(primitiveType, offset, numElements);
        }
    }

    draw(gl: any): any {
        // this.bezierGenerator.setTextureColor(gl, Colors.BLUE)

        this.bezierGenerator.setCurvePointsWithSVG(this.svg)
        this.show(gl)
    }
}

