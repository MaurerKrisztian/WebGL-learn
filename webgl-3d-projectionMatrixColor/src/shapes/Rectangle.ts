import { IColor } from "../Render";
import { Uniforms } from "../glsl/data/Uniforms";
import { IPoint3D } from "../math/Interfaces";
import { Utils } from "../math/Utils";
import { Matrix4Multiply } from "../math/Matrix4Multiply";
import { Matrix4 } from "../math/Matrix4";

export interface IDrawable {
    draw(gl: any): any;
}

export class Rectangle implements IDrawable {
    rotationDegrees: IPoint3D = {x: 1, y: 1, z: 1}

    enablePathColor = false;

    constructor(private readonly rect: IRectangle,
                private readonly color: IColor = {
                    r: 0,
                    g: 0,
                    b: 0,
                    alpha: 1
                }, public translation: IPoint3D = {x: 0, y: 0, z: 0},
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

    private static setRectangle(gl, x, y, width, height) {
        const x1 = x;
        const x2 = x + width;
        const y1 = y;
        const y2 = y + height;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1, 0,
            x2, y1, 0,
            x1, y2, 0,
            x1, y2, 0,
            x2, y1, 0,
            x2, y2, 0,
        ]), gl.STATIC_DRAW);
    }

    getMatrix(gl) {

        var rotation = [Utils.angleToRadiant(40), Utils.angleToRadiant(25), Utils.angleToRadiant(325)];
        var scale = [1, 1, 1];

        // Compute the matrices
        var matrix = Matrix4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
        matrix = Matrix4Multiply.translate(matrix, this.translation.x, this.translation.y, this.translation.z);
        matrix = Matrix4Multiply.xRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.x));
        matrix = Matrix4Multiply.yRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.y));
        matrix = Matrix4Multiply.zRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.z));
        matrix = Matrix4Multiply.scale(matrix, this.scale.x, this.scale.y, this.scale.z);
        return matrix;
    }

    draw(gl: any) {
        Rectangle.setRectangle(gl, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
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
        const count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }

    static draw(gl: any, rect: IRectangle, color: IColor) {
        this.setRectangle(gl, rect.x, rect.y, rect.width, rect.height);

        // Set a random color.
        gl.uniform4fv(Uniforms.u_color_location, color.r, color.g, color.b, color.alpha);

        // Draw the rectangle.
        const primitiveType = gl.TRIANGLES;
        const offset = 0;
        const count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }
}

export interface IRectangle {
    x: number,
    y: number,
    width: number,
    height: number
}
