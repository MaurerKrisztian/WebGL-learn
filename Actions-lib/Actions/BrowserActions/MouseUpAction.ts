import { Observables } from "../../observables/Observables";
import { IAction } from "../IAction";

export class MouseUpAction implements IAction {

    setup(): any {
        document.addEventListener('mouseup', (event: MouseEvent) => {
            // console.log('mouse up', event)
            Observables.MouseUpObservable.notify(event, "mouseup")
        });
    }

}
