import { Uniforms } from "../glsl/data/Uniforms";
import { Attributes } from "../glsl/data/Attributes";
import { Buffers } from "../glsl/data/Buffers";
import { Values } from "../glsl/data/Values";
import { Transformation } from "../core/Transformation";

export class LetterF {


    constructor(
        public transformation: Transformation = new Transformation()) {
    }


    draw(gl: any) {
        LetterF.setGeometry(gl);
        LetterF.setTexcoords(gl)
        // LetterF.setColors(gl);

        gl.uniform1i(Uniforms.u_texture_location, 0);

        // Compute the matrices
        const matrix = this.transformation.getMatrix(gl)

        // Set the matrix.
        gl.uniformMatrix4fv(Uniforms.u_matrix_location, false, matrix);


        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);

    }

    static setTexcoords(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.texcoordBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(Values.texturesArr),
            gl.STATIC_DRAW);

        gl.enableVertexAttribArray(Attributes.a_texcoord_location);
        // bind the texcoord buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.texcoordBuffer);

        // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            Attributes.a_texcoord_location, size, type, normalize, stride, offset);
    }


    // Fill the buffer with the values that define a letter 'F'.
    static setGeometry(gl) {

        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.positionBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(Values.vertexArr),
            gl.STATIC_DRAW);


        // Turn on the position attribute
        gl.enableVertexAttribArray(Attributes.a_position_location);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.positionBuffer);

        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            Attributes.a_position_location, size, type, normalize, stride, offset);

    }


// Fill the buffer with colors for the 'F'.
    static setColors(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.colorBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Uint8Array([
                // left column front
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,

                // top rung front
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,

                // middle rung front
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,

                // left column back
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,

                // top rung back
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,

                // middle rung back
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,

                // top
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,

                // top rung right
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,

                // under top rung
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,

                // between top rung and middle
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,

                // top of middle rung
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,

                // right of middle rung
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,

                // bottom of middle rung.
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,

                // right of bottom
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,

                // bottom
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,

                // left side
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220]),
            gl.STATIC_DRAW);

        // Turn on the color attribute
        gl.enableVertexAttribArray(Attributes.a_color_location);

        // Bind the color buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.colorBuffer);

        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        var size = 3;                 // 3 components per iteration
        var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
        var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
        var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;               // start at the beginning of the buffer
        gl.vertexAttribPointer(
            Attributes.a_color_location, size, type, normalize, stride, offset);
    }

}
