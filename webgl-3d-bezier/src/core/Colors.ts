import { IColor } from "./Render";

export class Colors {
    static RED: IColor = {r: 255, g: 0, b: 0, alpha: 255}
    static GREEN: IColor = {r: 0, g: 255, b: 0, alpha: 255}
    static BLUE: IColor = {r: 0, g: 0, b: 255, alpha: 255}
    static BLACK: IColor = {r: 0, g: 0, b: 0, alpha: 255}

    static random(): IColor {
        return {r: Math.random(), g: Math.random(), b: Math.random(), alpha: 1}
    }
}
