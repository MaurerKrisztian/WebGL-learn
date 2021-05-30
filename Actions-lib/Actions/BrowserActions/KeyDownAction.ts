import { IAction } from "../IAction";
import { Observables } from "../../observables/Observables";


export class KeyDownAction implements IAction{

    static channel = "KeyDownAction";

    constructor() {
    }

    setup() {
        document.addEventListener('keydown',
            function (event: any) {

                const notifyData: IKeyDownData = {
                    key: event.key
                }

                Observables.KeyDownObservable.notify(notifyData, KeyDownAction.channel)

                console.log(notifyData)
            }, false);

    }
}

export interface IKeyDownData {
    key: any
}
