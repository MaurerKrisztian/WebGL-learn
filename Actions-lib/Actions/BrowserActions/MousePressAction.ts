
import { Observables } from "../../observables/Observables";
import { IAction } from "../IAction";

export class MousePressAction implements IAction {

    setup(): any {
        document.addEventListener('mousedown', function (event: MouseEvent) {
            // console.log('mousedown', event)
            Observables.MousePressObservable.notify(event, "MousePressAction")
        }, false);
    }

}

export interface IMousePressAction extends MouseEvent {}
