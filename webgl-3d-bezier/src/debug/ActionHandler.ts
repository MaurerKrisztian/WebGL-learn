import { Debugger } from "./Debugger";
import { DragAction, IDragActionData } from "../../../Actions-lib/Actions/BrowserActions/DragAction";
import { IKeyDownData, KeyDownAction } from "../../../Actions-lib/Actions/BrowserActions/KeyDownAction";
import { Observables } from "../../../Actions-lib/observables/Observables";
import { IObserver } from "../../../Actions-lib/observer/IObserver";

export class ActionHandler implements IObserver<any> {
    mouseMode: "rotate" | "translate" | "scale" | "none" = "none"


    constructor(private readonly debuggerObj: Debugger) {
        Observables.MouseDragObservable.add(this)
        Observables.KeyDownObservable.add(this)
    }

    update(data: any, channel?: string): void {

        switch (channel) {
            case DragAction.channel:
                this.handleDragAction(data);
                break;
            case KeyDownAction.channel:
                this.handleKeyDownAction(data)
                break
        }
    }

    handleDragAction(data: IDragActionData) {
        switch (this.mouseMode) {
            case "translate":
                this.debuggerObj.debugValues.translationX += data.dragDiff.x
                this.debuggerObj.debugValues.translationY -= data.dragDiff.y
                break;
            case "rotate":
                this.debuggerObj.debugValues.rotationY -= data.dragDiff.x
                this.debuggerObj.debugValues.rotationZ -= data.dragDiff.y
                break
            case "scale":
                this.debuggerObj.debugValues.scaleX += data.dragDiff.x * 0.01
                this.debuggerObj.debugValues.scaleY += data.dragDiff.y * 0.01
                break
        }
    }

    handleKeyDownAction(data: IKeyDownData) {
        switch (data.key) {
            case "s":
                this.mouseMode = "scale"
                break;
            case "t":
                this.mouseMode = "translate"
                break;
            case "r":
                this.mouseMode = "rotate"
                break
            case "q":
                this.mouseMode = "none"
                break;
        }
    }

}
