export class Buffers {
    static positionBuffer: any
    static colorBuffer: any

    static init(gl) {
        Buffers.positionBuffer = gl.createBuffer()
        Buffers.colorBuffer = gl.createBuffer()
    }
}
