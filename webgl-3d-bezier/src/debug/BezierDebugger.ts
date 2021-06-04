import { Debugger } from "./Debugger";
import { BezierOptions } from "../core/BezierGenerator";
import { Slider } from "./Slider";
import { CheckBox } from "./CheckBox";

export class BezierDebugger extends Debugger {
    bezierOptions: BezierOptions =  {
        tolerance: 0.15,
        distance: .4,
        divisions: 16,
        startAngle: 0,
        endAngle: Math.PI * 2,
        capStart: true,
        capEnd: true,
        triangles: false
    }


    setup(gl) {
        super.setup(gl);

        const slider_endAngle = new Slider("endAngle", 0, 2);
        slider_endAngle.setCallback(() => {
            this.bezierOptions.endAngle = Math.PI * Number.parseFloat(slider_endAngle.getValue())
        })

        const divisions = new Slider("divisions", 1, 200, 1);
        divisions.setCallback(() => {
            this.bezierOptions.divisions =  Number.parseFloat(divisions.getValue())
        })

        const checkBox = new CheckBox("triangles");
        checkBox.setCallback(() => {
            this.bezierOptions.triangles =  checkBox.getValue()
        })
    }
}
