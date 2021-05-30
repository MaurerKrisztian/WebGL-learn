import { IAction } from "../IAction";
import { Observables } from "../../observables/Observables";
import { IObservable } from "../../observer/IObservable";
import { IObserver } from "../../observer/IObserver";
import { IMousePositionData } from "./MousePositionAction";
import { Helper } from "./Helper";

export class DragAction implements IAction, IObserver<any> {
    data: IDragActionData
    static channel = "DragAction"

    setup(): any {
        Observables.MousePressObservable.add(this)
    }

    update(data: MouseEvent, channel?: string): void {
        switch (channel) {
            case "MousePressAction":
                this.data = {
                    first: Helper.getPos(data),
                    current: Helper.getPos(data),
                    previous: Helper.getPos(data),
                    dragDiff: {x: 0, y: 0}
                }

                Observables.MousePositionObservable.add(this);
                Observables.MouseUpObservable.add(this);
                break;
            case "mouseup":
                Observables.MousePositionObservable.remove(this);
                Observables.MouseUpObservable.remove(this)
                break
            case "MousePosition":
                this.data.previous = this.data.current;
                this.data.current = Helper.getPos(data)
                this.data.dragDiff = {
                    x: (this.data.current.x - this.data.previous.x),
                    y: (this.data.current.y - this.data.previous.y),
                }

                if (this.isChangedPos()) {
                    Observables.MouseDragObservable.notify(this.data, DragAction.channel);
                }
                break;
            default:
                console.error("cant hadle channel " + channel)
                break
        }
    }

    isChangedPos() {
        if (this.data.dragDiff.x === 0 && this.data.dragDiff.y === 0) {
            return false
        }
        return true
    }


}

export interface IDragActionData {
    first: IMousePositionData,
    previous: IMousePositionData,
    current: IMousePositionData,
    dragDiff: IMousePositionData
}
