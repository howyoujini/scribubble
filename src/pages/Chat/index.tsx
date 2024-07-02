import { useEffect, useState } from "preact/hooks";
import { h } from "preact";
import "./style.css";

const ChatScroll = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  let isEnd = false;

  useEffect(() => {
    socket.on("chat message", (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    try {
      socket.emit("chat message", message);
      isEnd = true;
      console.log("의견을 보냈어요 `${message}` %d", [message]);
      setMessage("");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChange = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setMessage(e.currentTarget.value);
  };

  const handleKeyDown = (e: h.JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <div style="overflow:scroll; height:100%;">
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <input class="c-checkbox" type="checkbox" id="checkbox" />
      <div class="c-formContainer">
        <form class="c-form" action="">
          <input
            class="c-form__input"
            placeholder="의견을 편하게"
            required
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <label class="c-form__buttonLabel" for="checkbox">
            <button class="c-form__button" type="button" onClick={sendMessage}>
              말해봐
            </button>
          </label>
          <label class="c-form__toggle" for="checkbox" data-title="잡담이 필요해?"></label>
        </form>
      </div>
    </>
  );
};

export default ChatScroll;
