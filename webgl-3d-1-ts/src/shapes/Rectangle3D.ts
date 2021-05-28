import { IDrawable, IRectangle, Rectangle } from "./Rectangle";
import { Colors } from "../Colors";
import { IPoint3D } from "../math/Interfaces";
import { IColor } from "../Render";
import { Matrix4 } from "../math/Matrix4";
import { Matrix4Multiply } from "../math/Matrix4Multiply";
import { Utils } from "../math/Utils";
import { Uniforms } from "../glsl/data/Uniforms";


export class Rectangle3D implements IDrawable {
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

        // Compute the matrices
        var matrix = Matrix4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 1500);
        matrix = Matrix4Multiply.translate(matrix, this.translation.x, this.translation.y, this.translation.z);
        matrix = Matrix4Multiply.xRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.x));
        matrix = Matrix4Multiply.yRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.y));
        matrix = Matrix4Multiply.zRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.z));
        matrix = Matrix4Multiply.scale(matrix, this.scale.x, this.scale.y, this.scale.z);
        return matrix;
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

    draw(gl: any) {
        const rectFront = new Rectangle({x: 0, y: 0, width: 200, height: 200}, Colors.RED).setRotationDegrees({
            x: 0 + this.rotationDegrees.x,
            y: 0  + this.rotationDegrees.y,
            z: 0   + this.rotationDegrees.z
        }).setTranslation({
            x: 0 + this.translation.x,
            y: 0  + this.translation.y,
            z: 0   + this.translation.z
        })
        const rectLeft = new Rectangle({x: 0, y: 0, width: 200, height: 200}, Colors.BLUE).setRotationDegrees({
            x: 0 + this.rotationDegrees.x,
            y: 90  + this.rotationDegrees.y,
            z: 0   + this.rotationDegrees.z
        }).setTranslation({
            x: 0 + this.translation.x,
            y: 0  + this.translation.y,
            z: 0   + this.translation.z
        })

        const rectRight = new Rectangle({x: 0, y: 0, width: 200, height: 200}, Colors.BLUE).setRotationDegrees({
            x: 0 + this.rotationDegrees.x,
            y: 90  + this.rotationDegrees.y,
            z: 0   + this.rotationDegrees.z
        }).setTranslation({
            x: rectFront.translation.x + 200 + this.translation.x,
            y: rectFront.translation.y,
            z: this.translation.z
        })

        rectFront.draw(gl)
        rectLeft.draw(gl)
        rectRight.draw(gl)
    }
}
