import { Attributes } from "../Attributes";
import { IColor } from "../Render";

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
                }) {
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

        // Set a random color.
        gl.uniform4f(Attributes.u_color_location, this.color.r, this.color.g, this.color.b, this.color.alpha);

        // Draw the rectangle.
        const primitiveType = gl.TRIANGLES;
        const offset = 0;
        const count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }

    static draw(gl: any, rect: IRectangle, color: IColor) {
        this.setRectangle(gl, rect.x, rect.y, rect.width, rect.height);

        // Set a random color.
        gl.uniform4f(Attributes.u_color_location, color.r, color.g, color.b, color.alpha);

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
