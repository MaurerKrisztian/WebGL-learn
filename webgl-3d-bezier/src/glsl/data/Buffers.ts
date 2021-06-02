export class Buffers {
    static positionBuffer: any
    static colorBuffer: any
    static texcoordBuffer: any

    static init(gl) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        Buffers.positionBuffer = gl.createBuffer()
        Buffers.colorBuffer = gl.createBuffer()
        Buffers.texcoordBuffer = gl.createBuffer()
    }
}
