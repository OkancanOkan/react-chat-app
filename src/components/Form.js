import React, { useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { sendMessage } from "../socketApi";
import Picker from "emoji-picker-react";

function Form() {
  const { setChat } = useChat();
  const [text, setText] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setText(chosenEmoji.emoji);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      return;
    }

    setChat((prev) => [...prev, { text, isFromMe: true }]);
    sendMessage(text);
    setText("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Mesajınızı Giriniz;"
        />
      </form>
      {<Picker onEmojiClick={onEmojiClick} />}
    </div>
  );
}

export default Form;
