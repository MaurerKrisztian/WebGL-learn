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
        // console.log(bufferInfo)

        TextureLoader.setTexture(gl, meshInfos.texcoord, Attributes.a_texcoord_location, Buffers.texcoordBuffer);
        this.drawBufferInfo(gl, bufferInfo, this.bezierGenerator.bezierOptions.triangles ? gl.TRIANGLES : gl.LINES);
    }

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

