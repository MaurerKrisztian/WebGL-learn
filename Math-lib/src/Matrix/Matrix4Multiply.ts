import { Matrix4 } from "./Matrix4";

export class Matrix4Multiply {
    constructor() {
    }

    static translate(m, tx, ty, tz) {
        return Matrix4.multiply(m, Matrix4.translation(tx, ty, tz));
    }

    static xRotate(m, angleInRadians) {
        return Matrix4.multiply(m, Matrix4.xRotation(angleInRadians));
    }

    static yRotate(m, angleInRadians) {
        return Matrix4.multiply(m, Matrix4.yRotation(angleInRadians));
    }

    static zRotate(m, angleInRadians) {
        return Matrix4.multiply(m, Matrix4.zRotation(angleInRadians));
    }

    static scale(m, sx, sy, sz) {
        return Matrix4.multiply(m, Matrix4.scaling(sx, sy, sz));
    }

}
