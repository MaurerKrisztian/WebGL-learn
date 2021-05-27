import { IDrawable } from "./Rectangle";
import { IPoint } from "../math/Interfaces";
import { Attributes } from "../glsl/data/Attributes";
import { IColor } from "../Render";
import { Colors } from "../Colors";
import { Uniforms } from "../glsl/data/Uniforms";

export class Triangle implements IDrawable {
    constructor(                private readonly a: IPoint,
                private readonly b: IPoint,
                private readonly c: IPoint,
                private readonly color: IColor = Colors.GREEN) {
    }

    private static setTriangle(gl, a: IPoint, b: IPoint, c: IPoint) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            a.x, a.y,
            b.x, b.y,
            c.x, c.y,
        ]), gl.STATIC_DRAW);
    }

    draw(gl: any) {
        Triangle.setTriangle(gl, this.a, this.b, this.c);
        gl.uniform4f(Uniforms.u_color_location, this.color.r, this.color.g, this.color.b, this.color.alpha);

        const primitiveType = gl.TRIANGLES;
        const offset = 0;
        const count = 3;
        gl.drawArrays(primitiveType, offset, count);
    }
}
