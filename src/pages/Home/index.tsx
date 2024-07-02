import * as THREE from "three";
import "./style.css";
import { ToolBar } from "../../components/ToolBar";

export function Home() {
  return (
    <div class="home">
      <ToolBar />
    </div>
  );
}

const TOOL_STATE = {
  EXPLORING: "EXPLORING",
  SELECTING: "SELECTING",
  DRAWING: "DRAWING",
  ERASING: "ERASING",
  SHAPE: "SHAPE",
} as const;

type TOOL_STATE = (typeof TOOL_STATE)[keyof typeof TOOL_STATE];
