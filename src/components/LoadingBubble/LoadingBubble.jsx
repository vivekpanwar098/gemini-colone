import React from 'react';
import './LoadingBubble.css';

// AI reply aane se pehle dikhne wala shimmer/loading effect
export default function LoadingBubble() {
  return (
    <div className="loading-bubble">
      <div className="loading-bubble__lines">
        <div className="shimmer shimmer--long" />
        <div className="shimmer shimmer--short" />
      </div>
    </div>
  );
}
