import { Observables } from "../../observables/Observables";
import { IAction } from "../IAction";

export class MousePositionAction implements IAction {
    static mouseMoveData: IMousePositionData = {x: 0, y: 0};
    static lastEvent: MouseEvent;
    private UPDATE_DELAY_MS = 50;

    static channel = "MousePosition"

    setup(): any {
        document.onmousemove = function (event: MouseEvent) {
            MousePositionAction.lastEvent = event;

            const mouseMoveData: IMousePositionData = {
                x: event.pageX,
                y: event.pageY,
            }
            MousePositionAction.mouseMoveData = mouseMoveData;
        }
        setInterval(check_cursor, this.UPDATE_DELAY_MS);

        function check_cursor() {
            Observables.MousePositionObservable.notify( MousePositionAction.lastEvent, MousePositionAction.channel)
        }

    }

}

export interface IMousePositionData {
    x: number,
    y: number
}
