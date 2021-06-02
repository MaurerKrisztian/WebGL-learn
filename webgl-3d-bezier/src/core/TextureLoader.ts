import { Buffers } from "../glsl/data/Buffers";
import { Values } from "../glsl/data/Values";
import { Attributes } from "../glsl/data/Attributes";

export class TextureLoader {

    static loadTexture(gl, src: string) {

        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 255, 255]));

        var image = new Image();
        image.crossOrigin = "Anonymous"
        image.src = src;
        // image.height = 16;
        // image.width = 16
        // console.log(image)
        image.addEventListener('load', function () {
            console.log(image)
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_2D);
        });

        return texture
    }


    static setTexcoords(gl, coord) {
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.texcoordBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(coord),
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

    static loadImageAndCreateTextureInfo(gl, url, callback) {
        var tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 255, 255]));

        var textureInfo = {
            width: 1,   // we don't know the size until it loads
            height: 1,
            texture: tex,
        };
        var img = new Image();
        img.addEventListener('load', function() {
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
