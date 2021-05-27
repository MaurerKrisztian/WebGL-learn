import { Slider } from "../Helpers/Slider";

export class Debugger {
    constructor() {
    }


    setup(gl) {

        const slider_rotation = new Slider("rotation", -180, 180);
        const slider_translation_x = new Slider("translation x", 1, gl.canvas.width);
        const slider_translation_y = new Slider("translation y", 1, gl.canvas.height);
        const slider_translation_z = new Slider("translation z", 1, gl.canvas.height);
        const slider_scale = new Slider("scale", 1, 5);

        slider_rotation.setCallback(() => {
            degree = Number.parseFloat(slider_rotation.getValue())
            console.log("rotatoion... ", degree)
        })

        slider_translation_x.setCallback(() => {
            rectPosX = Number.parseFloat(slider_translation_x.getValue())
        })
        slider_translation_y.setCallback(() => {
            rectPosY = Number.parseFloat(slider_translation_y.getValue())
        })
        slider_scale.setCallback(() => {
            scale = Number.parseFloat(slider_scale.getValue())
        })
        slider_translation_z.setCallback(() => {
            rectPosZ = Number.parseFloat(slider_scale.getValue())
        })

        let rectPosX = 10;
        let rectPosY = 10
        let rectPosZ = 10
        let degree = 0
        let scale = 1
    }

    getValues() {

    }
}
