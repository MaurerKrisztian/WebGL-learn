import {IObserver} from "./IObserver";
import {IObservable} from "./IObservable";

export class Observable<T> implements IObservable<T> {
    observers: IObserver<T>[] = [];

    add(observer: IObserver<T>) {
        this.observers.push(observer);
    }

    remove(observer: IObserver<T>) {
        this.observers = this.observers.filter((o: IObserver<T>) => o !== observer);
    }

    notify(data: T, channel: string = 'default') {
        this.observers.forEach((observer: IObserver<T>) => {
            observer.update(data, channel)
        })
    }
}
