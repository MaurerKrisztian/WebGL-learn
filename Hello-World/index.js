/*
*
* INITIALISATION
*
* * */

const canvas = document.querySelector("#c");
var gl = canvas.getContext("webgl");
if (!gl) {
    throw new Error("WebGL is undefined")
}
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

const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

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

// a_position is a GLSL input
// get the location
var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

// a GLSL inputok bufferböl nyerik ki az adatokat ezért csináli kell nekik..
var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // You can think of bind points as internal global variables inside WebGL

//Now we can put data in that buffer by referencing it through the bind point
// three 2d points
var positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
];

// GLSL-nek szüksége van strigly typed adatokra ezért kll létrehozni a 32 bites arrayt.
// átmásolja a tömböt a GPU ARRAY_BUFFER-ébe ami most a a_position
// gl.STATIC_DRAW egy hint hogy hogy akarjuk ahsználni, optimalizcio szempontbol fonts
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


/*
*
* Rendering
*
* * */

// canvas és webgl méret szinkronizálás
// webglUtils.resizeCanvasToDisplaySize(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


// Clear the canvas
gl.clearColor(0, 0, 0, 0); // We clear the canvas. 0, 0, 0, 0 are red, green, blue, alpha respectively so in this case we're making the canvas transparent.
gl.clear(gl.COLOR_BUFFER_BIT);

// Tell it to use our program (pair of shaders)
gl.useProgram(program);


gl.enableVertexAttribArray(positionAttributeLocation); // turn the attribute on
// Then we need to specify how to pull the data out

// Bind the position buffer.
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 2;          // 2 components per iteration
var type = gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer


//  attribute is bound to positionBuffer
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset) // That means we're free to bind something else to the ARRAY_BUFFER bind point. The attribute will continue to use positionBuffer.

// execute our GLSL program.
var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType, offset, count);
/*
* Because the count is 3 this will execute our vertex shader 3 times.
*  The first time a_position.x and a_position.y in our vertex shader attribute will be set to the first 2 values from the positionBuffer.
* The second time a_position.x and a_position.y will be set to the second 2 values. The last time they will be set to the last 2 values.
* */

//  gl.TRIANGLES  mikor a vertex shader 3x lefut rajzol belöllük egy háromszövet
