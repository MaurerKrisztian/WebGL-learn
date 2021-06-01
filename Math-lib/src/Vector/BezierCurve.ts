import { Vector2 } from "./Vector2";
import { Matrix4 } from "../Matrix/Matrix4";
import { Matrix4Multiply } from "../Matrix/Matrix4Multiply";

export class BezierCurve {

    /**
     invT = (1 - t)
     P = P1 * invT^3 +
     P2 * 3 * t * invT^2 +
     P3 * 3 * invT * t^2 +
     P4 * t^3
     * */
    static getPointOnBezierCurve(points: number[], offset: number, t: number) {
        const invT = (1 - t);
        return Vector2.add(Vector2.mult(points[offset + 0], invT * invT * invT),
            Vector2.mult(points[offset + 1], 3 * t * invT * invT),
            Vector2.mult(points[offset + 2], 3 * invT * t * t),
            Vector2.mult(points[offset + 3], t * t * t));
    }

    static flatness(points, offset) {
        const p1 = points[offset + 0];
        const p2 = points[offset + 1];
        const p3 = points[offset + 2];
        const p4 = points[offset + 3];

        let ux = 3 * p2[0] - 2 * p1[0] - p4[0]; ux *= ux;
        let uy = 3 * p2[1] - 2 * p1[1] - p4[1]; uy *= uy;
        let vx = 3 * p3[0] - 2 * p4[0] - p1[0]; vx *= vx;
        let vy = 3 * p3[1] - 2 * p4[1] - p1[1]; vy *= vy;

        if(ux < vx) {
            ux = vx;
        }

        if(uy < vy) {
            uy = vy;
        }

        return ux + uy;
    }

    /**
     * tolerance: minimum distance between points?
     * */
    static getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints) {
        const outPoints = newPoints || [];
        if (BezierCurve.flatness(points, offset) < tolerance) {

            // just add the end points of this curve
            outPoints.push(points[offset + 0]);
            outPoints.push(points[offset + 3]);

        } else {

            // subdivide
            const t = .5;
            const p1 = points[offset + 0];
            const p2 = points[offset + 1];
            const p3 = points[offset + 2];
            const p4 = points[offset + 3];

            const q1 = Vector2.lerp(p1, p2, t);
            const q2 = Vector2.lerp(p2, p3, t);
            const q3 = Vector2.lerp(p3, p4, t);

            const r1 = Vector2.lerp(q1, q2, t);
            const r2 = Vector2.lerp(q2, q3, t);

            const red = Vector2.lerp(r1, r2, t);

            // do 1st half
            BezierCurve.getPointsOnBezierCurveWithSplitting([p1, q1, r1, red], 0, tolerance, outPoints);
            // do 2nd half
            BezierCurve.getPointsOnBezierCurveWithSplitting([red, r2, q3, p4], 0, tolerance, outPoints);

        }
        return outPoints;
    }

    /**
     * RDP -  Ramer Douglas Peucker algorithm
     * similar curve with fewer points (lower the "resolution")
     * In that algorithm we take a list of points. We find the furthest point from the line formed by the 2 end points.
     * Then we check if that point is further away from the line than some distance.
     * If it's less than than that distance we just keep the 2 end points and discard the rest
     * Otherwise we run the algorithm again, once with the points from the start to the furthest point and again from the furthest point to the end point.
     * */
    static simplifyPoints(points, start, end, epsilon, newPoints: number[] = []) {
        const outPoints = newPoints || [];

        // find the most distance point from the endpoints
        const s = points[start];
        const e = points[end - 1];
        let maxDistSq = 0;
        let maxNdx = 1;
        for (let i = start + 1; i < end - 1; ++i) {
            const distSq = Vector2.distanceToSegmentSq(points[i], s, e);
            if (distSq > maxDistSq) {
                maxDistSq = distSq;
                maxNdx = i;
            }
        }

        // if that point is too far
        if (Math.sqrt(maxDistSq) > epsilon) {

            // split
            this.simplifyPoints(points, start, maxNdx + 1, epsilon, outPoints);
            this.simplifyPoints(points, maxNdx, end, epsilon, outPoints);

        } else {

            // add the 2 end points
            outPoints.push(s, e);
        }

        return outPoints;
    }

    // gets points across all segments
    static getPointsOnBezierCurves(points, tolerance) {
        const newPoints = [];
        const numSegments = (points.length - 1) / 3;
        for (let i = 0; i < numSegments; ++i) {
            const offset = i * 3;
            BezierCurve.getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints);
        }
        return newPoints;
    }

    // rotates around Y axis.
    static lathePoints(points,
                         startAngle,   // angle to start at (ie 0)
                         endAngle,     // angle to end at (ie Math.PI * 2)
                         numDivisions, // how many quads to make around
                         capStart,     // true to cap the start
                         capEnd) {     // true to cap the end
        const positions = [];
        const texcoords = [];
        const indices = [];

        const vOffset = capStart ? 1 : 0;
        const pointsPerColumn = points.length + vOffset + (capEnd ? 1 : 0);
        const quadsDown = pointsPerColumn - 1;

        // generate points
        for (let division = 0; division <= numDivisions; ++division) {
            const u = division / numDivisions;
            const angle = BezierCurve.lerp(startAngle, endAngle, u) % (Math.PI * 2);
            const mat = Matrix4.yRotation(angle);
            if (capStart) {
                // add point on Y axis at start
                positions.push(0, points[0][1], 0);
                texcoords.push(u, 0);
            }
            points.forEach((p, ndx) => {
                const tp = Matrix4.transformPoint(mat, [...p, 0]);
                positions.push(tp[0], tp[1], tp[2]);
                const v = (ndx + vOffset) / quadsDown;
                texcoords.push(u, v);
            });
            if (capEnd) {
                // add point on Y axis at end
                positions.push(0, points[points.length - 1][1], 0);
                texcoords.push(u, 1);
            }
        }

        // generate indices
        for (let division = 0; division < numDivisions; ++division) {
            const column1Offset = division * pointsPerColumn;
            const column2Offset = column1Offset + pointsPerColumn;
            for (let quad = 0; quad < quadsDown; ++quad) {
                indices.push(column1Offset + quad, column2Offset + quad, column1Offset + quad + 1);
                indices.push(column1Offset + quad + 1, column2Offset + quad, column2Offset + quad + 1);
            }
        }

        return {
            position: positions,
            texcoord: texcoords,
            indices: indices,
        };
    }


    static lerp(a, b, t) {
        return a + (b - a) * t;
    }
}
