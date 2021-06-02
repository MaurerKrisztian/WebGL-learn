import { IColor } from "./Render";
import { IPoint3D } from "../math/Interfaces";
import { Utils } from "../../../Math-lib/src/Matrix/Utils";
import { Matrix4 } from "../../../Math-lib/src/Matrix/Matrix4";
import { Matrix4Multiply } from "../math/Matrix4Multiply";

export class Transformation {

    public rotationInRadiant: IPoint3D;

    constructor(public color: IColor = {
                    r: 0,
                    g: 0,
                    b: 0,
                    alpha: 1
                }, public translation: IPoint3D = {x: 0, y: 0, z: 0},
                public rotationDegrees: IPoint3D = {x: 1, y: 1, z: 1},
                public scale: IPoint3D = {x: 1, y: 1, z: 1},) {
        this.setRotationInRadiantWithDegrees(this.rotationDegrees)
    }

    setRotationInRadiantWithDegrees(rotationDegrees: IPoint3D) {
        this.rotationInRadiant = {
            x: Utils.angleToRadiant(rotationDegrees.x),
            y: Utils.angleToRadiant(rotationDegrees.y),
            z: Utils.angleToRadiant(rotationDegrees.y)
        }
    }

    setTranslation(translation: IPoint3D): this {
        this.translation = translation
        return this
    }

    setScale(scale: IPoint3D): this {
        this.scale = scale;
        return this;
    }

    setRotationDegrees(degrees: IPoint3D) {
        this.rotationDegrees = degrees
        this.setRotationInRadiantWithDegrees(this.rotationDegrees)
        return this
    }

    getMatrix(gl, zNear = 1, zFar = 2000, fieldOfViewDegree = 60, aspect: number = gl.canvas.clientWidth / gl.canvas.clientHeight) {
        const fieldOfViewRadians = Utils.angleToRadiant(fieldOfViewDegree);

        let matrix = Matrix4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        matrix = Matrix4Multiply.translate(matrix, this.translation.x, this.translation.y, this.translation.z);
        matrix = Matrix4Multiply.xRotate(matrix, this.rotationInRadiant.x);
        matrix = Matrix4Multiply.yRotate(matrix, this.rotationInRadiant.y);
        matrix = Matrix4Multiply.zRotate(matrix, this.rotationInRadiant.z);
        matrix = Matrix4Multiply.scale(matrix, this.scale.x, this.scale.y, this.scale.z);
        return matrix;
    }

}
