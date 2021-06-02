const webglUtils = require("../WebGLUtils")

export class Utils {
    randomInt(range) {
        return Math.floor(Math.random() * range);
    }

    getProgramInfo(gl, program) {
        const uniformSetters = webglUtils.WebglcreateUniformSetters(gl, program);
        const attribSetters = webglUtils.createAttributeSetters(gl, program);
        return {
            program: program,
            uniformSetters: uniformSetters,
            attribSetters: attribSetters,
        };
    }



}


