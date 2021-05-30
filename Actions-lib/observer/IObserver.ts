export interface IObserver<DataTypes> {
    update(data: DataTypes, channel?: string): void
}
