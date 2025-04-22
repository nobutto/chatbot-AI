import React, { useState, useEffect, useCallback, use } from "react";
import "./assets/styles/style.css";
import TextField from "@mui/material/TextField";
import { Chats } from "./components/index";

const App = () => {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const inputText = (e) => {
    if(e.target.value.length < 50) {
    setInput(e.target.value);
    }
  };

  const sendChat = (text, type) => {
    setChats((prev) => {
      return [...prev, { text: text, type: type }];
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput("");
    if (input === "") {
      return;
    }
    sendChat(input, "USER");
    try {
      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await apiResponse.json();
      sendChat(data.reply, "AI")
      console.log("AIの返信:", data.reply);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  const addChats = (chats) => {
    setChats((prev) => {
      return [...prev, chats];
    });
  }

  useEffect(() => {
    addChats({ text: "何かお話しよう！", type: "AI" });
  },[]);

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  })

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth={true}
            margin={"dense"}
            multiline={false}
            rows={2}
            value={input}
            type={"text"}
            onChange={inputText}
            label={"５０文字まで入力可能"}
          />
          <button type="submit">送信</button>
        </form>
      </div>
    </section>
  );
};

export default App;
