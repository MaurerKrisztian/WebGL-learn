import { Vector2 } from "../Vector/Vector2";

export class Utils {
    static angleToRadiant(angleInDegrees: number) {
        return angleInDegrees * Math.PI / 180;
    }

    randomInt(range) {
        return Math.floor(Math.random() * range);
    }

    static drawBufferInfo(gl, bufferInfo, primitiveType, count?: any, offset?: any) {
        const indices = bufferInfo.indices;
        primitiveType = primitiveType === undefined ? gl.TRIANGLES : primitiveType;
        const numElements = count === undefined ? bufferInfo.numElements : count;
        offset = offset === undefined ? 0 : offset;
        if (indices) {
            console.log("draw ", primitiveType)
            gl.drawElements(primitiveType, numElements, gl.UNSIGNED_SHORT, offset);
        } else {
            gl.drawArrays(primitiveType, offset, numElements);
        }
    }

    static parseSVGPath(svg) {
        const points = [];
        let delta = false;
        let keepNext = false;
        let need = 0;
        let value = '';
        let values = [];
        let lastValues = [0, 0];
        let nextLastValues = [0, 0];

        function addValue() {
            if (value.length > 0) {
                values.push(parseFloat(value));
                if (values.length === 2) {
                    if (delta) {
                        values[0] += lastValues[0];
                        values[1] += lastValues[1];
                    }
                    points.push(values);
                    if (keepNext) {
                        nextLastValues = values.slice();
                    }
                    --need;
                    if (!need) {
                        lastValues = nextLastValues;
                    }
                    values = [];
                }
                value = '';
            }
        }

        svg.split('').forEach(c => {
            // @ts-ignore
            if ((c >= '0' && c <= '9') || 'c' === '.') {
                value += c;
            } else if (c === '-') {
                addValue();
                value = '-';
            } else if (c === 'm') {
                addValue();
                keepNext = true;
                need = 1;
                delta = true;
            } else if (c === 'c') {
                addValue();
                keepNext = true;
                need = 3;
                delta = true;
            } else if (c === 'M') {
                addValue();
                keepNext = true;
                need = 1;
                delta = false;
            } else if (c === 'C') {
                addValue();
                keepNext = true;
                need = 3;
                delta = false;
            } else if (c === ',') {
                addValue();
            } else if (c === ' ') {
                addValue();
            }
        });
        addValue();
        let min = points[0].slice();
        let max = points[0].slice();
        for (let i = 1; i < points.length; ++i) {
            min = Vector2.min(min, points[i]);
            max = Vector2.max(max, points[i]);
        }
        let range = Vector2.sub(max, min);
        let halfRange = Vector2.mult(range, .5);
        for (let i = 0; i < points.length; ++i) {
            const p = points[i];
            p[0] = p[0] - min[0];
            p[1] = (p[1] - min[0]) - halfRange[1];
        }
        return points;
    }

}
