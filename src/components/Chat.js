import { useState, useEffect } from "react";
import "./Chat.css";   
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Chat({ token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user msg locally
    const newMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Send to backend
    const res = await fetch("https://ai-task-backend-69hj.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "model", text: data.reply }]);

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>Chat with AI</h2>

      <div className="chat-box">
        {messages.map((msg, idx) => (
  <div key={idx} className={`chat-bubble ${msg.role}`}>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {msg.text}
    </ReactMarkdown>
  </div>
))}
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          placeholder="Say something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="chat-send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
