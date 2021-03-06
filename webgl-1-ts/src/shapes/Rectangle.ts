import { IColor } from "../Render";
import { Uniforms } from "../glsl/data/Uniforms";
import { IPoint } from "../math/Interfaces";

export interface IDrawable {
    draw(gl: any): any;
}

export class Rectangle implements IDrawable {


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


    draw(gl: any) {
        Rectangle.setRectangle(gl, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        const translation = this.getTranslationArray()
        const rotation = this.getRotationArray();
        const scale = this.getScaleArray();

        // Set a random color.
        gl.uniform4f(Uniforms.u_color_location, this.color.r, this.color.g, this.color.b, this.color.alpha);
        gl.uniform2fv(Uniforms.u_translation_location, translation);
        gl.uniform2fv(Uniforms.u_rotation_location, rotation);
        gl.uniform2fv(Uniforms.u_scale_location, scale);

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
