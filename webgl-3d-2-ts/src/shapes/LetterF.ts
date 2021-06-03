import { IPoint3D } from "../math/Interfaces";
import { IColor } from "../Render";
import { Matrix4Multiply } from "../math/Matrix4Multiply";
import { Uniforms } from "../glsl/data/Uniforms";
import { Utils } from "../math/Utils";
import { Matrix4 } from "../../../Math-lib/src/3D/Matrix4";
import { Attributes } from "../glsl/data/Attributes";
import { Buffers } from "../glsl/data/Buffers";

export class LetterF {

    rotationDegrees: IPoint3D = {x: 1, y: 1, z: 1}

    enablePathColor = false;

    constructor(
        private readonly color: IColor = {
            r: 0,
            g: 0,
            b: 0,
            alpha: 1
        }, private translation: IPoint3D = {x: 0, y: 0, z: 0},
        private rotation: IPoint3D = {x: 0, y: 1, z: 0},
        private scale: IPoint3D = {x: 1, y: 1, z: 1},) {
    }

    setEnablePathColor(enable: boolean) {
        this.enablePathColor = enable;
        return this
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

    getTranslationArray() {
        return [this.translation.x, this.translation.y]
    }

    getRotationArray() {
        return [this.rotation.x, this.rotation.y]
    }


    getMatrix(gl) {
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
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

    draw(gl: any) {
        LetterF.setGeometry(gl);
        LetterF.setColors(gl);

        // Compute the matrices
        var matrix = this.getMatrix(gl)

        // Set the matrix.
        gl.uniformMatrix4fv(Uniforms.u_matrix_location, false, matrix);

        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }


    static drawGeometryBuffer(gl, positionBuffer) {
        LetterF.setGeometry(gl);
        // Turn on the position attribute
        gl.enableVertexAttribArray(Attributes.a_position_location);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            Attributes.a_position_location, size, type, normalize, stride, offset);
    }

    static drawColorBuffer(gl, colorBuffer) {
        LetterF.setColors(gl);

        // Turn on the color attribute
        gl.enableVertexAttribArray(Attributes.a_color_location);

        // Bind the color buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        var size = 3;                 // 3 components per iteration
        var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
        var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
        var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;               // start at the beginning of the buffer
        gl.vertexAttribPointer(
            Attributes.a_color_location, size, type, normalize, stride, offset);
    }

    // Fill the buffer with the values that define a letter 'F'.
    static setGeometry(gl) {

        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.positionBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                // left column front
                0, 0, 0,
                0, 150, 0,
                30, 0, 0,
                0, 150, 0,
                30, 150, 0,
                30, 0, 0,

                // top rung front
                30, 0, 0,
                30, 30, 0,
                100, 0, 0,
                30, 30, 0,
                100, 30, 0,
                100, 0, 0,

                // middle rung front
                30, 60, 0,
                30, 90, 0,
                67, 60, 0,
                30, 90, 0,
                67, 90, 0,
                67, 60, 0,

                // left column back
                0, 0, 30,
                30, 0, 30,
                0, 150, 30,
                0, 150, 30,
                30, 0, 30,
                30, 150, 30,

                // top rung back
                30, 0, 30,
                100, 0, 30,
                30, 30, 30,
                30, 30, 30,
                100, 0, 30,
                100, 30, 30,

                // middle rung back
                30, 60, 30,
                67, 60, 30,
                30, 90, 30,
                30, 90, 30,
                67, 60, 30,
                67, 90, 30,

                // top
                0, 0, 0,
                100, 0, 0,
                100, 0, 30,
                0, 0, 0,
                100, 0, 30,
                0, 0, 30,

                // top rung right
                100, 0, 0,
                100, 30, 0,
                100, 30, 30,
                100, 0, 0,
                100, 30, 30,
                100, 0, 30,

                // under top rung
                30, 30, 0,
                30, 30, 30,
                100, 30, 30,
                30, 30, 0,
                100, 30, 30,
                100, 30, 0,

                // between top rung and middle
                30, 30, 0,
                30, 60, 30,
                30, 30, 30,
                30, 30, 0,
                30, 60, 0,
                30, 60, 30,

                // top of middle rung
                30, 60, 0,
                67, 60, 30,
                30, 60, 30,
                30, 60, 0,
                67, 60, 0,
                67, 60, 30,

                // right of middle rung
                67, 60, 0,
                67, 90, 30,
                67, 60, 30,
                67, 60, 0,
                67, 90, 0,
                67, 90, 30,

                // bottom of middle rung.
                30, 90, 0,
                30, 90, 30,
                67, 90, 30,
                30, 90, 0,
                67, 90, 30,
                67, 90, 0,

                // right of bottom
                30, 90, 0,
                30, 150, 30,
                30, 90, 30,
                30, 90, 0,
                30, 150, 0,
                30, 150, 30,

                // bottom
                0, 150, 0,
                0, 150, 30,
                30, 150, 30,
                0, 150, 0,
                30, 150, 30,
                30, 150, 0,

                // left side
                0, 0, 0,
                0, 0, 30,
                0, 150, 30,
                0, 0, 0,
                0, 150, 30,
                0, 150, 0]),
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

    }


// Fill the buffer with colors for the 'F'.
    static setColors(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.colorBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Uint8Array([
                // left column front
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,

                // top rung front
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,

                // middle rung front
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,

                // left column back
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,

                // top rung back
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,

                // middle rung back
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,

                // top
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,

                // top rung right
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,

                // under top rung
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,

                // between top rung and middle
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,

                // top of middle rung
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,

                // right of middle rung
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,

                // bottom of middle rung.
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,

                // right of bottom
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,

                // bottom
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,

                // left side
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220]),
            gl.STATIC_DRAW);

        // Turn on the color attribute
        gl.enableVertexAttribArray(Attributes.a_color_location);

        // Bind the color buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.colorBuffer);

        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        var size = 3;                 // 3 components per iteration
        var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
        var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
        var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;               // start at the beginning of the buffer
        gl.vertexAttribPointer(
            Attributes.a_color_location, size, type, normalize, stride, offset);
    }

}
