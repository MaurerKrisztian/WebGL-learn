export class TextureLoader {


    /**
     * create a texture buffer with the coordinates and set it to the textureLocation location
     * @param gl - WebGL context
     * @param texcoord - texture coordinates
     * @param textureLocation - texture attribute location
     * @param textureBuffer - a WebGLBuffer where to set the data
     * */
    static setTexture(gl: any, texcoord: number[], textureLocation: number, textureBuffer: WebGLBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(texcoord),
            gl.STATIC_DRAW);

        gl.enableVertexAttribArray(textureLocation);
        // bind the texcoord buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);

        // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
        const size = 2;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(textureLocation, size, type, normalize, stride, offset);
    }


    /**
     * load texture by url
     * */
    static loadImageTexture(gl: any, url: string, callback?: Function): ITextureInfo {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 255, 255]));

        let textureInfo = {
            width: 1,   // we don't know the size until it loads
            height: 1,
            texture: tex,
        };
        const img = new Image();
        img.addEventListener('load', function () {
            textureInfo.width = img.width;
            textureInfo.height = img.height;

            gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

            // Check if the image is a power of 2 in both dimensions.
            if (TextureLoader.isPowerOf2(img.width) && TextureLoader.isPowerOf2(img.height)) {
                // Yes, it's a power of 2. Generate mips.
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                // No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }

            if (callback) {
                callback();
            }
        });
        img.src = url;

        return textureInfo;
    }

    static isPowerOf2(value) {
        return (value & (value - 1)) === 0;
    }
}


export interface ITextureInfo {
    width: number,
    height: number,
    texture: any
}
