// import { Matrix4 } from "./Matrix/Matrix4";

import { Matrix3 } from "./2D/Matrix3";

console.log("test")

const matrix = new Matrix3()


export class Statistics {
    /**
     * Returns the average of two numbers.
     *
     * @remarks
     * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param x - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
     * @param y - The second input number
     * @returns The arithmetic mean of `x` and `y`
     *
     * @beta
     */
    public static getAverage(x: number, y: number): number {
        return (x + y) / 2.0;
    }
}
