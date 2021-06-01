export class Point {
    constructor(private readonly x: number, private readonly y: number) {
    }

    pushPoint(array: number[]) {
        array.push(this.x)
        array.push(this.y)
    }
}
