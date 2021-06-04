export class Buffers {
    static positionBuffer: WebGLBuffer
    static colorBuffer: WebGLBuffer
    static texcoordBuffer: WebGLBuffer

    static init(gl) {
        Buffers.positionBuffer = gl.createBuffer()
        Buffers.colorBuffer = gl.createBuffer()
        Buffers.texcoordBuffer = gl.createBuffer()
    }
}
