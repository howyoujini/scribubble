export class Point {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  add(point: Point): Point {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  subtract(point: Point): Point {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  reduce(value: number): Point {
    this.x *= value;
    this.y *= value;
    return this;
  }

  collide(point: Point, width: number, height: number): boolean {
    return this.x >= point.x && this.x <= point.x + width && this.y >= point.y && this.y <= point.y + height;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }
}
