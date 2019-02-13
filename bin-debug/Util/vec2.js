var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vec2 = (function () {
    function Vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.values = new Float32Array(2);
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vec2.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (value) {
            this.values[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (value) {
            this.values[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2.prototype, "xy", {
        get: function () {
            return [this.values[0], this.values[1]];
        },
        set: function (values) {
            this.values[0] = values[0];
            this.values[1] = values[1];
        },
        enumerable: true,
        configurable: true
    });
    Vec2.prototype.at = function (index) {
        return this.values[index];
    };
    Vec2.prototype.reset = function () {
        this.x = 0;
        this.y = 0;
    };
    Vec2.prototype.copy = function (dest) {
        if (!dest) {
            dest = new Vec2();
        }
        dest.x = this.x;
        dest.y = this.y;
        return dest;
    };
    Vec2.prototype.magnitude = function () {
        return Math.sqrt(this.sqrMagnitude());
    };
    Vec2.prototype.sqrMagnitude = function () {
        var x = this.x;
        var y = this.y;
        return (x * x + y * y);
    };
    Vec2.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };
    Vec2.prototype.sub = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    };
    Vec2.prototype.scale = function (value) {
        this.x *= value;
        this.y *= value;
        return this;
    };
    Vec2.prototype.normalize = function () {
        var length = this.magnitude();
        if (length === 0)
            return this;
        length = 1.0 / length;
        this.x *= length;
        this.y *= length;
        return this;
    };
    Vec2.dot = function (vector, vector2) {
        return (vector.x * vector2.x + vector.y * vector2.y);
    };
    Vec2.cross = function (vector, vector2) {
        var x = vector.x;
        var y = vector.y;
        var x2 = vector2.x;
        var y2 = vector2.y;
        var z = x * y2 - y * x2;
        return z; // vec3( 0, 0, z )
    };
    Vec2.distance = function (vector, vector2) {
        return Math.sqrt(this.sqrDistance(vector, vector2));
    };
    Vec2.sqrDistance = function (vector, vector2) {
        var x = vector2.x - vector.x;
        var y = vector2.y - vector.y;
        return (x * x + y * y);
    };
    Vec2.zero = new Vec2();
    return Vec2;
}());
__reflect(Vec2.prototype, "Vec2");
//# sourceMappingURL=vec2.js.map