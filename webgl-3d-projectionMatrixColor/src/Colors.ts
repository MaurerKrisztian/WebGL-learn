import { IColor } from "./Render";

export class Colors {
    static RED: IColor = {r: 1, g: 0, b: 0, alpha: 1}
    static GREEN: IColor = {r: 0, g: 1, b: 0, alpha: 1}
    static BLUE: IColor = {r: 0, g: 0, b: 1, alpha: 1}
    static BLACK: IColor = {r: 0, g: 0, b: 0, alpha: 1}

    static random(): IColor {
        return {r: Math.random(), g: Math.random(), b: Math.random(), alpha: 1}
    }
}
