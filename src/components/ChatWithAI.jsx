import { useState } from "react";
import axios from "axios";

const ChatWithAIWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! How can I help you today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ask", {
        prompt: input,
      });

      const aiMessage = { from: "ai", text: res.data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Sorry, something went wrong." },
      ]);
    }

    setInput("");
    setIsTyping(false); 
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 9999,
      fontFamily: "Segoe UI, sans-serif"
    }}>
      {isOpen ? (
        <div style={{
          width: "340px",
          height: "480px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}>
          <div
            onClick={toggleChat}
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              padding: "12px 16px",
              fontWeight: 600,
              fontSize: "16px",
              textAlign: "center",
              cursor: "pointer",
              borderBottom: "1px solid #ddd"
            }}
          >
            AI Assistant
          </div>

          <div style={{
            flex: 1,
            padding: "12px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "#f9fafb"
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.from === "user" ? "#dbeafe" : "#e5e7eb",
                  color: "#111827",
                  padding: "10px 14px",
                  borderRadius: "20px",
                  maxWidth: "80%",
                  fontSize: "14px",
                  lineHeight: "1.4"
                }}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#e5e7eb",
                  color: "#6b7280",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontStyle: "italic",
                  maxWidth: "70%"
                }}
              >
                AI is typing...
              </div>
            )}
          </div>

          <div style={{
            display: "flex",
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "#f3f4f6"
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              style={{
                flex: 1,
                border: "none",
                padding: "12px",
                outline: "none",
                fontSize: "14px",
                background: "transparent"
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                padding: "0 16px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "14px 18px",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            transition: "0.2s ease-in-out"
          }}
        >
          Chat with AI
        </button>
      )}
    </div>
  );
};

export default ChatWithAIWidget;
