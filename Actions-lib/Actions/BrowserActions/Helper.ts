import { IMousePositionData } from "./MousePositionAction";

export class Helper {

    static getPos(event: MouseEvent): IMousePositionData {
        return {
            x: event.pageX,
            y: event.pageY,
        }
    }
}
