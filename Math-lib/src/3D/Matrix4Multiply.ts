import { Matrix4 } from "./Matrix4";

export class Matrix4Multiply {
    constructor() {
    }

    static translate(m:any, tx:number, ty:number, tz:number) {
        return Matrix4.multiply(m, Matrix4.translation(tx, ty, tz));
    }

    static xRotate(m: any, angleInRadians:number) {
        return Matrix4.multiply(m, Matrix4.xRotation(angleInRadians));
    }

    static yRotate(m: any, angleInRadians:number) {
        return Matrix4.multiply(m, Matrix4.yRotation(angleInRadians));
    }

    static zRotate(m:any, angleInRadians:number) {
        return Matrix4.multiply(m, Matrix4.zRotation(angleInRadians));
    }

    static scale(m:any, sx:number, sy:number, sz:number) {
        return Matrix4.multiply(m, Matrix4.scaling(sx, sy, sz));
    }

}
