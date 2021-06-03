export class Vector2 {
    // adds 1 or more v2s
    static add(a:any, ...args:any) {
        const n = a.slice();
        [...args].forEach(p => {
            n[0] += p[0];
            n[1] += p[1];
        });
        return n;
    }

    static sub(a:any, ...args:any) {
        const n = a.slice();
        [...args].forEach(p => {
            n[0] -= p[0];
            n[1] -= p[1];
        });
        return n;
    }

    static mult(a:any, s:any) {
        if (Array.isArray(s)) {
            let t = s;
            s = a;
            a = t;
        }
        if (Array.isArray(s)) {
            return [
                a[0] * s[0],
                a[1] * s[1],
            ];
        } else {
            return [a[0] * s, a[1] * s];
        }
    }

    static lerp(a:any, b:any, t:any) {
        return [
            a[0] + (b[0] - a[0]) * t,
            a[1] + (b[1] - a[1]) * t,
        ];
    }

    static min(a:any, b:any) {
        return [
            Math.min(a[0], b[0]),
            Math.min(a[1], b[1]),
        ];
    }

    static max(a:any, b:any) {
        return [
            Math.max(a[0], b[0]),
            Math.max(a[1], b[1]),
        ];
    }

    // compute the distance squared between a and b
    static distanceSq(a:any, b:any) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return dx * dx + dy * dy;
    }

    // compute the distance between a and b
    static distance(a:any, b:any) {
        return Math.sqrt(Vector2.distanceSq(a, b));
    }

    // compute the distance squared from p to the line segment
    // formed by v and w
    // We use the distance squared because it's faster to compute than the actual distance
    static distanceToSegmentSq(p:any, v:any, w:any) {
        const l2 = Vector2.distanceSq(v, w);
        if (l2 === 0) {
            return Vector2.distanceSq(p, v);
        }
        let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
        t = Math.max(0, Math.min(1, t));
        return Vector2.distanceSq(p, Vector2.lerp(v, w, t));
    }

    // compute the distance from p to the line segment
    // formed by v and w
    static distanceToSegment(p:any, v:any, w:any) {
        return Math.sqrt(Vector2.distanceToSegmentSq(p, v, w));
    }


}
