import { Observable } from "../observer/Observable";
import { IKeyDownData } from "../Actions/BrowserActions/KeyDownAction";
import { IDragActionData } from "../Actions/BrowserActions/DragAction";

export class Observables {
    static MousePressObservable: Observable<MouseEvent> = new Observable<MouseEvent>();
    static MouseUpObservable: Observable<MouseEvent> = new Observable<MouseEvent>();
    static KeyDownObservable: Observable<IKeyDownData> = new Observable<IKeyDownData>();
    static MousePositionObservable: Observable<MouseEvent> = new Observable<MouseEvent>();

    static MouseDragObservable: Observable<IDragActionData> = new Observable<IDragActionData>();
}
