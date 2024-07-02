import { useRef, useEffect } from "preact/hooks";
import { RoundTrimming, ColorPicker } from "./style";
import { TOOL_MODE } from "../../utils/types/tool_mode";
import * as THREE from "three";
import { Point } from "./point";

interface ToolBarProps {
  mode?: TOOL_MODE | TOOL_MODE.EXPLORING;
  color: string;
  setColor?: (color: string) => void;
}

export const ToolBar = ({ color }: ToolBarProps) => {
  return (
    <>
      <RoundTrimming>
        <ColorPicker value={color} />
      </RoundTrimming>
      <ContainerVisualization value={color} />
    </>
  );
};

const ContainerVisualization = ({ value }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const container = useRef(new Container());

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(80, 80);
    mountRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(WIDTH, HEIGHT, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x555555 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    container.current.resize(window.innerWidth, window.innerHeight);

    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.position.set(container.current.pos.x, container.current.pos.y, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      console.log(value);
      scene.background = new THREE.Color("#354644");
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

const FOLLOW_SPEED = 0.08;

const ROTATE_SPEED = 0.12;

const SPEED_REDUCE = 0.8;

const MAX_ANGLE = 30;

const FPS = 1000 / 60;

const WIDTH = 260;

const HEIGHT = 260;

export class Container {
  pos: Point;
  target: Point;
  prevPos: Point;
  downPos: Point;
  speedPos: Point;
  startPos: Point;
  mousePos: Point;
  centerPos: Point;
  origin: Point;
  rotation: number;
  sideValue: number;
  isDown: boolean;

  constructor() {
    this.pos = new Point();
    this.target = new Point();
    this.prevPos = new Point();
    this.downPos = new Point();
    this.speedPos = new Point();
    this.startPos = new Point();
    this.mousePos = new Point();
    this.centerPos = new Point();
    this.origin = new Point();
    this.rotation = 0;
    this.sideValue = 0;
    this.isDown = false;
  }

  resize(stageWidth: number, stageHeight: number) {
    this.pos.x = Math.random() * (stageWidth - WIDTH);
    this.pos.y = Math.random() * (stageHeight - HEIGHT);
    this.target = this.pos.clone();
    this.prevPos = this.pos.clone();
  }

  animate(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "#f4e55a";
    ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);
  }

  down(point: Point): Container | null {
    if (point.collide(this.pos, WIDTH, HEIGHT)) {
      this.isDown = true;
      this.startPos = this.pos.clone();
      this.downPos = point.clone();
      this.mousePos = point.clone().subtract(this.pos);
      return this;
    } else {
      return null;
    }
  }

  move(point: Point) {
    if (this.isDown) {
      this.target = this.startPos.clone().add(point).subtract(this.downPos);
    }
  }

  up() {
    this.isDown = false;
  }
}
