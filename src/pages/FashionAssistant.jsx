import React, { useState, useRef, useEffect } from "react";
import "./FashionAssistant.css";

const STARTERS = [
  "Suggest an outfit for a college fest",
  "What should I wear for a job interview?",
  "What colors go well with blue jeans?",
  "Recommend an outfit for a wedding",
];

export default function FashionAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = (text ?? message).trim();
    if (!userText || loading) return;

    const history = [...messages, { sender: "user", text: userText }];
    setMessages(history);
    setMessage("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Request failed (${response.status})`);
      }

      setMessages((prev) => [...prev, { sender: "bot", text: data.reply || "Hmm, I didn't quite catch that — try again?" }]);
    } catch (err) {
      setError("StyleBot is having trouble connecting. Please try again.");
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong on my end. Could you try that again?" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="stylebot">
      {/* Header */}
      <div className="stylebot-header">
        <div className="stylebot-title-row">
          <h1 className="stylebot-title">Forever</h1>
          <span className="stylebot-badge">Personal Stylist</span>
        </div>
        <p className="stylebot-subtitle">Ask anything — outfits, wardrobes, fit, occasions.</p>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="stylebot-chat">
        {messages.length === 0 && (
          <div className="stylebot-starters-wrap">
            <p className="stylebot-starters-label">Try asking</p>
            <div className="stylebot-starters">
              {STARTERS.map((s) => (
                <button key={s} onClick={() => sendMessage(s)} className="stylebot-starter-btn">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`stylebot-msg-row ${msg.sender}`}>
            {msg.sender === "bot" && <div className="stylebot-msg-label">StyleBot</div>}
            <div className={`stylebot-bubble ${msg.sender}`}>{msg.text}</div>
          </div>
        ))}

        {loading && (
          <div className="stylebot-msg-row bot">
            <div className="stylebot-msg-label">StyleBot</div>
            <div className="stylebot-typing">
              <span className="stylebot-typing-dot" />
              <span className="stylebot-typing-dot" />
              <span className="stylebot-typing-dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="stylebot-input-area">
        {error && <p className="stylebot-error">{error}</p>}
        <div className="stylebot-input-row">
          <textarea
            rows={1}
            value={message}
            placeholder="Ask a fashion question..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="stylebot-textarea"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !message.trim()}
            className="stylebot-send-btn"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
