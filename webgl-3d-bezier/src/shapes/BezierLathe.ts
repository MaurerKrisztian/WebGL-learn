import { IDrawable } from "./Rectangle";
import { Transformation } from "../core/Transformation";
import { BezierGenerator } from "../core/BezierGenerator";
import { Uniforms } from "../glsl/data/Uniforms";
import { Colors } from "../core/Colors";


const webglUtils = require("../WebGLUtils")

export class BezierLathe implements IDrawable {
    bezierGenerator = new BezierGenerator();

    constructor(public svg: string, public transformation: Transformation = new Transformation()) {
    }

    show(gl) {
        const meshInfos = this.bezierGenerator.setMesh(gl);
        const matrix = this.transformation.getMatrix(gl)
        gl.uniformMatrix4fv(Uniforms.u_matrix_location, false, matrix);


        // Draw the geometry.
        const primitiveType = gl.LINES;
        const offset = 0;
        const count = meshInfos.indices.length;
        const indexType = gl.UNSIGNED_SHORT;
        gl.drawElements(primitiveType, count, indexType, offset);
    }

    draw(gl: any): any {
        this.bezierGenerator.setTextureColor(gl, Colors.BLUE)
        this.bezierGenerator.setCurvePointsWithSVG(this.svg)
        this.show(gl)
    }
}

