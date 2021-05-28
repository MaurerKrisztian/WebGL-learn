import { IColor } from "../Render";
import { Uniforms } from "../glsl/data/Uniforms";
import { IPoint } from "../math/Interfaces";
import { Matrix3 } from "../math/Matrix3";
import { Utils } from "../math/Utils";

export interface IDrawable {
    draw(gl: any): any;
}

export class Rectangle implements IDrawable {
    rotationDegree: number = 0

    enablePathColor = false;

    constructor(private readonly rect: IRectangle,
                private readonly color: IColor = {
                    r: 0,
                    g: 0,
                    b: 0,
                    alpha: 1
                }, private translation: IPoint = {x: 0, y: 0},
                private rotation: IPoint = {x: 0, y: 1},
                private scale: IPoint = {x: 1, y: 1},) {
    }

    setEnablePathColor(enable: boolean) {
        this.enablePathColor = enable;
        return this
    }

    setTranslation(translation: IPoint): this {
        this.translation = translation
        return this
    }

    setRotation(rotation: IPoint) {
        this.rotation = rotation;
        return this;
    }

    setScale(scale: IPoint) {
        console.log(scale)
        this.scale = scale;
        return this;
    }

    getScaleArray() {
        return [this.scale.x, this.scale.y]
    }

    setRotationDegrees(degree: number) {
        this.rotationDegree = degree
        var angleInRadians = degree * Math.PI / 180;
        var x = Math.sin(angleInRadians);
        var y = Math.cos(angleInRadians);
        this.setRotation({x: x, y: y})
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
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2,
        ]), gl.STATIC_DRAW);
    }

    getMatrix(gl) {
        // Compute the matrices
        let projectionMatrix = Matrix3.projection(gl.canvas.width, gl.canvas.height)
        const translationMatrix = Matrix3.translation(this.translation.x, this.translation.y);
        const rotationMatrix = Matrix3.rotation(Utils.angleToRadiant(this.rotationDegree));
        const scaleMatrix = Matrix3.scaling(this.scale.x, this.scale.y);


        // Multiply the matrices.
        var matrix = Matrix3.multiply(projectionMatrix, translationMatrix);
        matrix = Matrix3.multiply(matrix, rotationMatrix);
        matrix = Matrix3.multiply(matrix, scaleMatrix);

        return matrix;
    }

    draw(gl: any) {
        Rectangle.setRectangle(gl, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        const matrix = this.getMatrix(gl);

        // Set a random color.
        gl.uniform4f(Uniforms.u_color_location, this.color.r, this.color.g, this.color.b, this.color.alpha);
        gl.uniform1i(Uniforms.u_enable_path_color_location, this.enablePathColor ? 1 : 0);

        console.log(matrix)
        gl.uniformMatrix3fv(Uniforms.u_matrix_location, false, matrix);


        // Draw the rectangle.
        const primitiveType = gl.TRIANGLES;
        const offset = 0;
        const count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }

    static draw(gl: any, rect: IRectangle, color: IColor) {
        this.setRectangle(gl, rect.x, rect.y, rect.width, rect.height);

        // Set a random color.
        gl.uniform4f(Uniforms.u_color_location, color.r, color.g, color.b, color.alpha);

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
