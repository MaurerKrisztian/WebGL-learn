import { BezierCurve } from "../../../Math-lib/src/Vector/BezierCurve";
import { Helpers } from "../../../Math-lib/src/Vector/Helpers";
import { Matrix4 } from "../../../Math-lib/src/Matrix/Matrix4";
import { Utils } from "../../../Math-lib/src/Matrix/Utils";
import { IColor } from "../Render";
import { IPoint3D } from "../math/Interfaces";
import { Uniforms } from "../glsl/data/Uniforms";
import { IDrawable } from "./Rectangle";
import { TextureLoader } from "../TextureLoader";
import { Vector2 } from "../../../Math-lib/src/Vector/Vector2";
import { WebGL } from "../WebGL";
import { Matrix4Multiply } from "../math/Matrix4Multiply";
import { Values } from "../glsl/data/Values";
import { Attributes } from "../glsl/data/Attributes";
import { Buffers } from "../glsl/data/Buffers";


const webglUtils = require("../WebGLUtils")

export class BezierLathe implements IDrawable {
    curvePoints
    data = {
        tolerance: 0.15,
        distance: .4,
        divisions: 16,
        startAngle: 0,
        endAngle: Math.PI * 2,
        capStart: true,
        capEnd: true,
        triangles: false
    };

    worldMatrix = Matrix4.identity();
    projectionMatrix;
    extents;
    bufferInfo = undefined;

    private readonly color: IColor = {
        r: 0,
        g: 0,
        b: 0,
        alpha: 1
    }
    private translation: IPoint3D = {x: 0, y: 0, z: 0}
    private rotation: IPoint3D = {x: 0, y: 1, z: 0}
    private scale: IPoint3D = {x: 1, y: 1, z: 1}
    rotationDegrees: IPoint3D = {x: 1, y: 1, z: 1}
    texInfo

    constructor(private readonly gl) {
        const testSvg = "m44,434c18,-33 19,-66 15,-111c-4,-45 -37,-104 -39,-132c-2,-28 11,-51 16,-81c5,-30 3,-63 -36,-100"
        let svg = "M 332, 714 C 73, 773, 500, 100, 171, 429";
        this.curvePoints = Utils.parseSVGPath(svg);
        console.log(this.curvePoints)
        // this.curvePoints[0] = [10, 500]
        console.log("pointssssss ", this.curvePoints)
        this.texInfo = TextureLoader.loadImageAndCreateTextureInfo(gl, "/src/resources/uv-grid.png", () => {
        });
        console.log("texture inf", this.texInfo)
    }


    setTranslation(translation: IPoint3D): this {
        this.translation = translation
        return this
    }

    setRotation(rotation: IPoint3D) {
        this.rotation = rotation;
        return this;
    }

    setScale(scale: IPoint3D) {
        this.scale = scale;
        return this;
    }

    getScaleArray() {
        return [this.scale.x, this.scale.y]
    }

    setRotationDegrees(degrees: IPoint3D) {
        this.rotationDegrees = degrees
        return this
    }

    generateMesh(gl) {
        // console.log(bufferInfo)
        const data = this.data

        const tempPoints = BezierCurve.getPointsOnBezierCurves(this.curvePoints, data.tolerance);
        const points = BezierCurve.simplifyPoints(tempPoints, 0, tempPoints.length, data.distance);
        const arrays = BezierCurve.lathePoints(points, data.startAngle, data.endAngle, data.divisions, data.capStart, data.capEnd);
        const extents = Helpers.getExtents(arrays.position);

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
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
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

        // console.log(arrays)
        return arrays
    }

    getMatrix(gl) {
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 20000;
        var fieldOfViewRadians = Utils.angleToRadiant(60);

        // Compute the matrices
        var matrix = Matrix4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        matrix = Matrix4Multiply.translate(matrix, this.translation.x, this.translation.y, this.translation.z);
        matrix = Matrix4Multiply.xRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.x));
        matrix = Matrix4Multiply.yRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.y));
        matrix = Matrix4Multiply.zRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.z));
        matrix = Matrix4Multiply.scale(matrix, this.scale.x, this.scale.y, this.scale.z);
        return matrix;
    }


    render(gl) {
        // gl.uniform1i(Uniforms.u_texture_location, 0);
        const meshinfos = this.generateMesh(gl)

        var matrix = this.getMatrix(gl)
        gl.uniformMatrix4fv(Uniforms.u_matrix_location, false, matrix);



        // Draw the geometry.
        var primitiveType = gl.LINES;
        var offset = 0;
        var count =  meshinfos.indices.length;
        var indexType = gl.UNSIGNED_SHORT;
        gl.drawElements(primitiveType, count, indexType, offset);


    }

    drawTriangles(gl, bufferInfo) {

        const indices = bufferInfo.indices;
        let primitiveType = gl.TRIANGLES;
        const numElements = bufferInfo.numElements
        let offset = 0

        if (indices) {
            // console.log("draw ", primitiveType)
            // gl.drawArrays(primitiveType, offset, 2);
            gl.drawElements(primitiveType, numElements, gl.UNSIGNED_SHORT, offset);
        } else {
            gl.drawArrays(primitiveType, offset, numElements);
        }
    }

    draw(gl: any): any {
       this.render(gl)
    }


    getProgramInfo(gl, program) {
        const uniformSetters = webglUtils.createUniformSetters(gl, program);
        const attribSetters = webglUtils.createAttributeSetters(gl, program);
        return {
            program: program,
            uniformSetters: uniformSetters,
            attribSetters: attribSetters,
        };
    }
}

