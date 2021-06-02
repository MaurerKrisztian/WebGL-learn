import { Utils } from "../../../Math-lib/src/Matrix/Utils";
import { BezierCurve } from "../../../Math-lib/src/Vector/BezierCurve";
import { Helpers } from "../../../Math-lib/src/Vector/Helpers";
import { Buffers } from "../glsl/data/Buffers";
import { Attributes } from "../glsl/data/Attributes";
import { IColor } from "./Render";
import { Colors } from "./Colors";

export class BezierGenerator {
    constructor(public bezierOptions: BezierOptions = {
        tolerance: 0.15,
        distance: .4,
        divisions: 16,
        startAngle: 0,
        endAngle: Math.PI * 2,
        capStart: false,
        capEnd: false,
        triangles: false
    }, public curvePoints: number[] = []) {
    }

    setCurvePointsWithSVG(svg: string) {
        this.curvePoints = Utils.parseSVGPath(svg);
    }

    setTextureColor(gl, color: IColor = Colors.BLUE) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([color.r, color.g, color.b, color.alpha]));
    }

    generateMesh(gl) {
        const tempPoints = BezierCurve.getPointsOnBezierCurves(this.curvePoints, this.bezierOptions.tolerance);
        const points = BezierCurve.simplifyPoints(tempPoints, 0, tempPoints.length, this.bezierOptions.distance);
        const arrays = BezierCurve.lathePoints(points, this.bezierOptions.startAngle, this.bezierOptions.endAngle, this.bezierOptions.divisions, this.bezierOptions.capStart, this.bezierOptions.capEnd);
        const extents = Helpers.getExtents(arrays.position);
        return arrays
    }

    setMesh(gl) {
        const arrays = this.generateMesh(gl);
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.positionBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(arrays.position),
            gl.STATIC_DRAW);


        // Turn on the position attribute
        gl.enableVertexAttribArray(Attributes.a_position_location);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.positionBuffer);

        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        const size = 3;          // 3 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            Attributes.a_position_location, size, type, normalize, stride, offset);

        // create the buffer
        const indexBuffer = gl.createBuffer();

        // make this buffer the current 'ELEMENT_ARRAY_BUFFER'
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(arrays.indices),
            gl.STATIC_DRAW
        );

        return arrays
    }


}

export interface BezierOptions {
    tolerance: number,
    distance: number,
    divisions: number,
    startAngle: number,
    endAngle: number,
    capStart: boolean,
    capEnd: boolean,
    triangles: boolean
};
