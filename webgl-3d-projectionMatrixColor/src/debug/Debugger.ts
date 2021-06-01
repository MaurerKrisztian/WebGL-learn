import { Slider } from "./Slider";
import { SetupActions } from "../../../Actions-lib/Actions/SetupActions";
import { ActionHandler } from "./ActionHandler";
import { Utils } from "../math/Utils";

export class Debugger {
    debugValues: IDebugValues = {
        translationX: -150,
        translationY: 0,
        translationZ: -360,
        rotationX: 190,
        rotationY: 40,
        rotationZ: 320,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
    }

    ActionHandler: ActionHandler = new ActionHandler(this)

    constructor(gl) {
        this.setup(gl)
        SetupActions.setup()
    }


    setup(gl) {

        const slider_rotation_x = new Slider("rotationX", 0, 360);
        const slider_rotation_y = new Slider("rotationY", 0, 360);
        const slider_rotation_z = new Slider("rotationZ", 0, 360);
        const slider_translation_x = new Slider("translation x", -500, gl.canvas.width);
        const slider_translation_y = new Slider("translation y", -500, gl.canvas.height);
        const slider_translation_z = new Slider("translation z", -500, gl.canvas.height);
        const slider_scale_x = new Slider("scale x", 1, 5);
        const slider_scale_y = new Slider("scale y", 1, 5);
        const slider_scale_z = new Slider("scale z", 1, 5);


        slider_rotation_x.setCallback(() => {
            this.debugValues.rotationX = Number.parseFloat(slider_rotation_x.getValue())
        })
        slider_rotation_y.setCallback(() => {
            this.debugValues.rotationY = Number.parseFloat(slider_rotation_y.getValue())
        })
        slider_rotation_z.setCallback(() => {
            this.debugValues.rotationZ = Number.parseFloat(slider_rotation_z.getValue())
        })

        slider_translation_x.setCallback(() => {
            this.debugValues.translationX = Number.parseFloat(slider_translation_x.getValue())
        })
        slider_translation_y.setCallback(() => {
            this.debugValues.translationY = Number.parseFloat(slider_translation_y.getValue())
        })

        slider_translation_z.setCallback(() => {
            this.debugValues.translationZ = Number.parseFloat(slider_translation_z.getValue())
        })

        slider_scale_x.setCallback(() => {
            this.debugValues.scaleX = Number.parseFloat(slider_scale_x.getValue())
        })
        slider_scale_y.setCallback(() => {
            this.debugValues.scaleY = Number.parseFloat(slider_scale_y.getValue())
        })

        slider_scale_z.setCallback(() => {
            this.debugValues.scaleZ = Number.parseFloat(slider_scale_z.getValue())
        })
    }

}

export interface IDebugValues {
    translationX: number;
    translationY: number
    translationZ: number
    rotationX: number,
    rotationY: number,
    rotationZ: number,
    scaleX: number,
    scaleY: number,
    scaleZ: number,
}
