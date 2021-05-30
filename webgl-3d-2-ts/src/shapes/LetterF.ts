import { IPoint3D } from "../math/Interfaces";
import { IColor } from "../Render";
import { Matrix4Multiply } from "../math/Matrix4Multiply";
import { Matrix4 } from "../math/Matrix4";
import { IRectangle } from "./Rectangle";
import { Uniforms } from "../glsl/data/Uniforms";
import { Utils } from "../math/Utils";

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
        // var angleInRadians = degrees * Math.PI / 180;
        // var x = Math.sin(angleInRadians);
        // var y = Math.cos(angleInRadians);
        // this.setRotation({x: x, y: y, z: 0})
        return this
    }

    getTranslationArray() {
        return [this.translation.x, this.translation.y]
    }

    getRotationArray() {
        return [this.rotation.x, this.rotation.y]
    }

    private static setF(gl) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( [
            // left column front
            0,   0,  0,
            30,   0,  0,
            0, 150,  0,
            0, 150,  0,
            30,   0,  0,
            30, 150,  0,

            // top rung front
            30,   0,  0,
            100,   0,  0,
            30,  30,  0,
            30,  30,  0,
            100,   0,  0,
            100,  30,  0,

            // middle rung front
            30,  60,  0,
            67,  60,  0,
            30,  90,  0,
            30,  90,  0,
            67,  60,  0,
            67,  90,  0,

            // left column back
            0,   0,  30,
            30,   0,  30,
            0, 150,  30,
            0, 150,  30,
            30,   0,  30,
            30, 150,  30,

            // top rung back
            30,   0,  30,
            100,   0,  30,
            30,  30,  30,
            30,  30,  30,
            100,   0,  30,
            100,  30,  30,

            // middle rung back
            30,  60,  30,
            67,  60,  30,
            30,  90,  30,
            30,  90,  30,
            67,  60,  30,
            67,  90,  30,

            // top
            0,   0,   0,
            100,   0,   0,
            100,   0,  30,
            0,   0,   0,
            100,   0,  30,
            0,   0,  30,

            // top rung right
            100,   0,   0,
            100,  30,   0,
            100,  30,  30,
            100,   0,   0,
            100,  30,  30,
            100,   0,  30,

            // under top rung
            30,   30,   0,
            30,   30,  30,
            100,  30,  30,
            30,   30,   0,
            100,  30,  30,
            100,  30,   0,

            // between top rung and middle
            30,   30,   0,
            30,   30,  30,
            30,   60,  30,
            30,   30,   0,
            30,   60,  30,
            30,   60,   0,

            // top of middle rung
            30,   60,   0,
            30,   60,  30,
            67,   60,  30,
            30,   60,   0,
            67,   60,  30,
            67,   60,   0,

            // right of middle rung
            67,   60,   0,
            67,   60,  30,
            67,   90,  30,
            67,   60,   0,
            67,   90,  30,
            67,   90,   0,

            // bottom of middle rung.
            30,   90,   0,
            30,   90,  30,
            67,   90,  30,
            30,   90,   0,
            67,   90,  30,
            67,   90,   0,

            // right of bottom
            30,   90,   0,
            30,   90,  30,
            30,  150,  30,
            30,   90,   0,
            30,  150,  30,
            30,  150,   0,

            // bottom
            0,   150,   0,
            0,   150,  30,
            30,  150,  30,
            0,   150,   0,
            30,  150,  30,
            30,  150,   0,

            // left side
            0,   0,   0,
            0,   0,  30,
            0, 150,  30,
            0,   0,   0,
            0, 150,  30,
            0, 150,   0]), gl.STATIC_DRAW);
    }

    getMatrix(gl) {

        // Compute the matrices
        var matrix = Matrix4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 1500);
        matrix = Matrix4Multiply.translate(matrix, this.translation.x, this.translation.y, this.translation.z);
        matrix = Matrix4Multiply.xRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.x));
        matrix = Matrix4Multiply.yRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.y));
        matrix = Matrix4Multiply.zRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.z));
        matrix = Matrix4Multiply.scale(matrix, this.scale.x, this.scale.y, this.scale.z);
        return matrix;
    }
    draw(gl: any) {
        LetterF.setF(gl);
        const matrix = this.getMatrix(gl);

        // Set a random color.
        var color = [Math.random(), Math.random(), Math.random(), 1];
        gl.uniform4fv(Uniforms.u_color_location, [this.color.r, this.color.g, this.color.b, this.color.alpha]);
        // gl.uniform1i(Uniforms.u_enable_path_color_location, this.enablePathColor ? 1 : 0);

        // console.log(matrix)
        gl.uniformMatrix4fv(Uniforms.u_matrix_location, false, matrix);


        // Draw the rectangle.
        const primitiveType = gl.TRIANGLES;
        const offset = 0;
        const count = 16*6;
        gl.drawArrays(primitiveType, offset, count);
    }


}
