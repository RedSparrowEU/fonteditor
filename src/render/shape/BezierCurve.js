/**
 * @file bezier曲线绘制
 * @author mengke01(kekee000@gmail.com)
 */

import shape from './Shape';

import isInsidePath from 'graphics/isInsidePath';
import pathAdjust from 'graphics/pathAdjust';
import computeBoundingBox from 'graphics/computeBoundingBox';

export default shape.derive({

    type: 'beziercurve',

    adjust(shape, camera) {
        let ratio = camera.ratio;
        let x = camera.center.x;
        let y = camera.center.y;
        pathAdjust(shape.points, ratio, ratio, -x, -y);
        pathAdjust(shape.points, 1, 1, x, y);
    },

    move(shape, mx, my) {
        pathAdjust(shape.points, 1, 1, mx, my);
        return shape;
    },

    getRect(shape) {
        return computeBoundingBox.computePath(shape.points);
    },

    isIn(shape, x, y) {
        let bound = computeBoundingBox.computePath(shape.points);
        if (
            x <= bound.x + bound.width
            && x >= bound.x
            && y <= bound.y + bound.height
            && y >= bound.y
        ) {

            return isInsidePath(shape.points, {
                x,
                y
            });
        }
        return false;
    },

    draw(ctx, shape) {
        let points = shape.points;
        // 二次bezier曲线
        if (points.length === 3) {
            ctx.moveTo(points[0].x, points[0].y);
            ctx.quadraticCurveTo(points[1].x, points[1].y, points[2].x, points[2].y);
        }
        // 三次bezier曲线
        else if (points.length === 4) {
            ctx.moveTo(points[0].x, points[0].y);
            ctx.bezierCurveTo(
                points[1].x, points[1].y,
                points[2].x, points[2].y,
                points[3].x, points[3].y
            );
        }
    }
});
