import { ToolBar } from "../../components/ToolBar/tool_bar";
import ChatScroll from "../Chat";

import io from "socket.io-client";
const socket = io("http://localhost:3000");

export const Home = () => {
  return (
    <>
      <ChatScroll socket={socket} />
      <ToolBar color="#141414" />
    </>
  );
};
