import { WebGL } from "./WebGL";
import { IDrawable } from "./shapes/Rectangle";

export class Render {

    constructor(private readonly gl: any, clearColor?: IColor) {
        this.init(clearColor);
    }

    init(color: IColor = {r: 0, g: 0, b: 0, alpha: 0}) {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clearColor(color.r, color.g, color.b, color.alpha);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(WebGL.getProgram());
    }

    drawTriangle() {
        const primitiveType = this.gl.TRIANGLES;
        const offset = 0;
        const count = 6;
        this.gl.drawArrays(primitiveType, offset, count);
    }

    draw(shape: IDrawable) {
        shape.draw(this.gl);
    }


}


export interface IColor {
    r: number,
    g: number,
    b: number,
    alpha: number
}
