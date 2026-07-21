import React, { forwardRef } from 'react';
import Message from '../Message/Message';
import LoadingBubble from '../LoadingBubble/LoadingBubble';
import './ChatBody.css';

// Chat ka scrollable area — welcome screen (jab chat khali ho) ya messages list
const ChatBody = forwardRef(function ChatBody({ chat, loading, userName = 'Vivek' }, ref) {
  return (
    <div ref={ref} className="chat-body">
      {chat.length === 0 ? (
        <div className="chat-body__welcome">
          <h2 className="chat-body__title">Hello, {userName}</h2>
          <p className="chat-body__subtitle">I'm your own Assistant</p>
          <p className="chat-body__subtow">What can I help you..?</p>
        </div>
      ) : (
        chat.map((m, i) => <Message key={i} role={m.role} text={m.text} />)
      )}
      {loading && <LoadingBubble />}
    </div>
  );
});

export default ChatBody;
