export class Helpers {

    static getExtents(positions: any) {
        const min = positions.slice(0, 3);
        const max = positions.slice(0, 3);
        for (let i = 3; i < positions.length; i += 3) {
            min[0] = Math.min(positions[i + 0], min[0]);
            min[1] = Math.min(positions[i + 1], min[1]);
            min[2] = Math.min(positions[i + 2], min[2]);
            max[0] = Math.max(positions[i + 0], max[0]);
            max[1] = Math.max(positions[i + 1], max[1]);
            max[2] = Math.max(positions[i + 2], max[2]);
        }
        return {
            min: min,
            max: max,
        };
    }

}
