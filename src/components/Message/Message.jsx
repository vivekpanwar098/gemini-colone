import React from 'react';
import './Message.css';

// Ek single chat bubble (user ka message ho ya AI ka reply)
export default function Message({ role, text }) {
  const isUser = role === 'user';

  return (
    <div className="message">
      <p className={`message-text ${isUser ? 'message-text--user' : 'message-text--ai'}`}>
        {text}
      </p>
    </div>
  );
}
