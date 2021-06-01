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

        const gl = canvas.getContext("webgl");
        this.setGlCanvasSize(gl)
        if (!gl) {
            throw new Error("WebGL is undefined")
        }
        return gl;
    }

    static setGlCanvasSize(gl) {
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerHeight;
    }

    static getCanvas() {
        return document.querySelector("#c");
    }

    static initUpdate(gl) {
        WebGL.setGlCanvasSize(gl)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Clear the canvas AND the depth buffer.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Turn on culling. By default backfacing triangles
        // will be culled.
        gl.enable(gl.CULL_FACE);

        // Enable the depth buffer
        gl.enable(gl.DEPTH_TEST);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(this.program);
    }
}
