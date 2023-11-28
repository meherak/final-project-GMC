import React, { useState } from 'react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    setMessages([...messages, { message: inputValue, sender: 'Me' }]);
    setInputValue('');
  };

  const adjustInputHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'Me' ? 'my-message' : ''}`}>
            {message.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <textarea
          className="chat-input"
          placeholder="Enter your message"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            adjustInputHeight(event);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
