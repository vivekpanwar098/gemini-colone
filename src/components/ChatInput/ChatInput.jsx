import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import './ChatInput.css';

// Neeche wala input box + send button
export default function ChatInput({ value, onChange, onSend, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) onSend();
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={loading ? "Generating response..." : "Enter a prompt here..."}
          className="chat-input__field"
          disabled={loading}
        />
        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="chat-input__send-btn"
        >
          {loading ? (
            <Loader2 size={15} className="chat-input__spinner" />
          ) : (
            <Send size={15} />
          )}
        </button>
      </div>
    </div>
  );
}
