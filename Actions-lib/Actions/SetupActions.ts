import { MousePressAction } from "./BrowserActions/MousePressAction";
import { IAction } from "./IAction";
import { MouseUpAction } from "./BrowserActions/MouseUpAction";
import { MousePositionAction } from "./BrowserActions/MousePositionAction";
import { KeyDownAction } from "./BrowserActions/KeyDownAction";
import { DragAction } from "./BrowserActions/DragAction";

export class SetupActions {

    static actions: IAction[] = [
        new MousePressAction(),
        new MouseUpAction(),
        new MousePositionAction(),
        new KeyDownAction(),
        new DragAction()
    ]

    static async setup() {
        for (const action of this.actions) {
            await action.setup();
        }
    }
}
