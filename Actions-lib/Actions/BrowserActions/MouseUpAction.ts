import { Observables } from "../../observables/Observables";
import { IAction } from "../IAction";

export class MouseUpAction implements IAction {

    setup(): any {
        document.addEventListener('mouseup', (event: MouseEvent) => {
            Observables.MouseUpObservable.notify(event, "mouseup")
        });
    }

}
