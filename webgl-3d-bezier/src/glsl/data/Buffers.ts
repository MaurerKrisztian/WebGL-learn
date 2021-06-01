export class Buffers {
    static positionBuffer: any
    static colorBuffer: any
    static texcoordBuffer: any

    static init(gl) {
        Buffers.positionBuffer = gl.createBuffer()
        Buffers.colorBuffer = gl.createBuffer()
        Buffers.texcoordBuffer = gl.createBuffer()
    }
}
