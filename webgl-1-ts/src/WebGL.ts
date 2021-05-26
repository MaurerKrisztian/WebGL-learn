export class WebGL {
    private static program;
    static gl;
    static attributes = {}

    static init(vertexShaderSource: string, fragmentShaderSource: string) {
        const gl = this.getWebglContext();
        WebGL.gl = gl;

        console.log("WebGL loaded")

        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (success) {
                return shader;
            }

            console.log(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
        }

        // const vertexShaderSource = (document as any).querySelector("#vertex-shader-2d").text;
        // const fragmentShaderSource = (document as any).querySelector("#fragment-shader-2d").text;

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        function createProgram(gl, vertexShader, fragmentShader) {
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            const success = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (success) {
                return program;
            }

            console.log(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
        }

        const program = createProgram(gl, vertexShader, fragmentShader);
        this.program = program;

        return program;
    }

    static getProgram() {
        if (!WebGL.program) {
            throw new Error("Program is undefined")
        }
        return WebGL.program
    }

    static getWebglContext() {
        const canvas: any = document.querySelector("#c");

        var gl = canvas.getContext("webgl");
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerHeight;
        if (!gl) {
            throw new Error("WebGL is undefined")
        }
        return gl;
    }

    static getCanvas() {
        return document.querySelector("#c");
    }
}
