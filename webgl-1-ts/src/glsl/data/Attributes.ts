export class Attributes {
    static a_position_location: number;


    static getAttribute(name: string) {
        if (!Attributes[name]) {
            throw new Error(`Attribute ${name} is undefined.`)
        }
        return Attributes[name]
    }
}
