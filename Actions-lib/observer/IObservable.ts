import {IObserver} from "./IObserver";

export interface IObservable<T> {
    add(observer: IObserver<T>): void

    remove(observer: IObserver<T>): void

    notify(data: T, channel?: string): void
}
