// import { BezierCurve } from "../../../Math-lib/src/Vector/BezierCurve";
// import { Helpers } from "../../../Math-lib/src/Vector/Helpers";
// import { Matrix4 } from "../../../Math-lib/src/Matrix/Matrix4";
// import { Utils } from "../../../Math-lib/src/Matrix/Utils";
// import { IColor } from "../Render";
// import { IPoint3D } from "../math/Interfaces";
// import { Uniforms } from "../glsl/data/Uniforms";
// import { IDrawable } from "./Rectangle";
// import { TextureLoader } from "../TextureLoader";
// import { Vector2 } from "../../../Math-lib/src/Vector/Vector2";
// import { WebGL } from "../WebGL";
//
//
// const webglUtils = require("../WebGLUtils")
//
// export class BezierLathe implements IDrawable {
//     curvePoints
//     data = {
//         tolerance: 0.15,
//         distance: .4,
//         divisions: 16,
//         startAngle: 0,
//         endAngle: Math.PI * 2,
//         capStart: true,
//         capEnd: true,
//         triangles: false
//     };
//
//     worldMatrix = Matrix4.identity();
//     projectionMatrix;
//     extents;
//     bufferInfo = undefined;
//
//     private readonly color: IColor = {
//         r: 0,
//         g: 0,
//         b: 0,
//         alpha: 1
//     }
//     private translation: IPoint3D = {x: 0, y: 0, z: 0}
//     private rotation: IPoint3D = {x: 0, y: 1, z: 0}
//     private scale: IPoint3D = {x: 1, y: 1, z: 1}
//     rotationDegrees: IPoint3D = {x: 1, y: 1, z: 1}
//     texInfo
//
//     constructor(private readonly gl) {
//         let svg = "m44,434c18,-33 19,-66 15,-111c-4,-45 -37,-104 -39,-132c-2,-28 11,-51 16,-81c5,-30 3,-63 -36,-63";
//         this.curvePoints = Utils.parseSVGPath(svg);
//         console.log("pointssssss ", this.curvePoints)
//         this.texInfo = TextureLoader.loadImageAndCreateTextureInfo(gl, "/src/resources/uv-grid.png", () => {
//         });
//         console.log("texture inf", this.texInfo)
//     }
//
//
//     setTranslation(translation: IPoint3D): this {
//         this.translation = translation
//         return this
//     }
//
//     setRotation(rotation: IPoint3D) {
//         this.rotation = rotation;
//         return this;
//     }
//
//     setScale(scale: IPoint3D) {
//         this.scale = scale;
//         return this;
//     }
//
//     getScaleArray() {
//         return [this.scale.x, this.scale.y]
//     }
//
//     setRotationDegrees(degrees: IPoint3D) {
//         this.rotationDegrees = degrees
//         return this
//     }
//
//     generateMesh(bufferInfo) {
//         // console.log(bufferInfo)
//         const gl = this.gl;
//         const data = this.data
//
//         const tempPoints = BezierCurve.getPointsOnBezierCurves(this.curvePoints, data.tolerance);
//         const points = BezierCurve.simplifyPoints(tempPoints, 0, tempPoints.length, data.distance);
//         const arrays = BezierCurve.lathePoints(points, data.startAngle, data.endAngle, data.divisions, data.capStart, data.capEnd);
//         const extents = Helpers.getExtents(arrays.position);
//         if (!bufferInfo) {
//             // calls gl.createBuffer, gl.bindBuffer, and gl.bufferData for each array
//             bufferInfo = webglUtils.createBufferInfoFromArrays(gl, arrays);
//         } else {
//             gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_position.buffer);
//             gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrays.position), gl.STATIC_DRAW);
//             gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_texcoord.buffer);
//             gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrays.texcoord), gl.STATIC_DRAW);
//             gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
//             gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(arrays.indices), gl.STATIC_DRAW);
//             bufferInfo.numElements = arrays.indices.length;
//         }
//         console.log("bufferinfooooooooooooo", bufferInfo)
//         return {
//             bufferInfo: bufferInfo,
//             extents: extents,
//         };
//     }
//
//
//     update() {
//         const info = this.generateMesh(this.bufferInfo);
//         this.extents = info.extents;
//         this.bufferInfo = info.bufferInfo;
//         this.render();
//     }
//
//     getMatrix(gl) {
//         // var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
//         // var zNear = 1;
//         // var zFar = 2000;
//         // var fieldOfViewRadians = Utils.angleToRadiant(60);
//         //
//         // // Compute the matrices
//         // var matrix = Matrix4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
//         // matrix = Matrix4Multiply.translate(matrix, this.translation.x, this.translation.y, this.translation.z);
//         // matrix = Matrix4Multiply.xRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.x));
//         // matrix = Matrix4Multiply.yRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.y));
//         // matrix = Matrix4Multiply.zRotate(matrix, Utils.angleToRadiant(this.rotationDegrees.z));
//         // matrix = Matrix4Multiply.scale(matrix, this.scale.x, this.scale.y, this.scale.z);
//         //
//         // // console.log(this)
//         // return matrix;
//
//         // Compute the projection matrix
//
//
//
//
//     }
//
//
//     render() {
//         // console.log(this.gl)
//         const gl = this.gl
//
//         const fieldOfViewRadians = Math.PI * .25;
//         const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
//         this.projectionMatrix = Matrix4.perspective(fieldOfViewRadians, aspect, 1, 2000);
//
//         // Compute the camera's matrix using look at.
//         const midY = Vector2.lerp(this.extents.min[1], this.extents.max[1], .5);
//         const sizeToFitOnScreen = (this.extents.max[1] - this.extents.min[1]) * .6;
//         const distance = sizeToFitOnScreen / Math.tan(fieldOfViewRadians * .5);
//         const cameraPosition = [0, midY, distance];
//         const target = [0, midY, 0];
//         const up = [0, -1, 0];  // we used 2d points as input which means orientation is flipped
//         const cameraMatrix = Matrix4.lookAt(cameraPosition, target, up);
//
//         // Make a view matrix from the camera matrix.
//         const viewMatrix = Matrix4.inverse(cameraMatrix);
//
//         const viewProjectionMatrix = Matrix4.multiply(this.projectionMatrix, viewMatrix);
//
//         // gl.useProgram(programInfo.program);
//
//         const programInfo = this.getProgramInfo(gl, WebGL.getProgram())
//         gl.useProgram(programInfo.program);
//
//
//         // Setup all the needed attributes.
//         // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer for each attribute
//         console.log("Proginf",programInfo)
//         webglUtils.setBuffersAndAttributes(gl, programInfo, this.bufferInfo);
//
//         // Set the uniforms
//         // calls gl.uniformXXX, gl.activeTexture, gl.bindTexture
//         webglUtils.setUniforms(programInfo, {
//             u_matrix: Matrix4.multiply(viewProjectionMatrix, this.worldMatrix),
//             u_texture: this.texInfo.texture,
//         });
//
//         // calls gl.drawArrays or gl.drawElements.
//         console.log(this.bufferInfo)
//         webglUtils.drawBufferInfo(gl, this.bufferInfo, this.data.triangles ? gl.TRIANGLE : gl.LINES);
//
//     }
//
//     drawTriangles(gl, bufferInfo) {
//
//         const indices = bufferInfo.indices;
//         let primitiveType = gl.TRIANGLES;
//         const numElements = bufferInfo.numElements
//         let offset = 0
//
//         if (indices) {
//             // console.log("draw ", primitiveType)
//             // gl.drawArrays(primitiveType, offset, 2);
//             gl.drawElements(primitiveType, numElements, gl.UNSIGNED_SHORT, offset);
//         } else {
//             gl.drawArrays(primitiveType, offset, numElements);
//         }
//     }
//
//     draw(gl: any): any {
//         this.update()
//         this.render()
//     }
//
//
//     getProgramInfo(gl, program) {
//         const uniformSetters = webglUtils.createUniformSetters(gl, program);
//         const attribSetters = webglUtils.createAttributeSetters(gl, program);
//         return {
//             program: program,
//             uniformSetters: uniformSetters,
//             attribSetters: attribSetters,
//         };
//     }
// }
//
