// app/components/Message.tsx

import React from 'react';
import styles from './Message.module.css'; // Using CSS Modules for scoped styles

interface MessageProps {
    content: string;
    isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ content, isUser }) => {
  return (
    <div className={`${styles.message} ${isUser ? styles.user : styles.assistant}`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;
