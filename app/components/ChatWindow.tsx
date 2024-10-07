// app/components/ChatWindow.tsx

"use client";

import React, { useState } from "react";
import Message from "./Messages";
import styles from "./ChatWindow.module.css";

interface Message {
    content: string;
    role: "user" | "assistant";
  }

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hi, how can I help you today?", role: "assistant" },
  ]);

  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;

    // Add the user's message to the conversation
    const newMessages: Message[] = [...messages, { content: input, role: "user" }];
    setMessages(newMessages);

    // Call your API to get the assistant's response (mocking this for now)
    const assistantResponse = await fetchAssistantResponse(newMessages);
    setMessages([
      ...newMessages,
      { content: assistantResponse, role: "assistant" } as Message,
    ]);

    setInput(""); // Clear input
  };

  const fetchAssistantResponse = async (
    chatMessages: Message[]
  ): Promise<string> => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatMessages }),
    });
    const data = await response.json();
    return data.chunks.join(" "); // Join the messages for simplicity here
  };

  return (
    <div className="">
        <div className={styles.chatWindow}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <Message
                key={index}
                content={msg.content}
                isUser={msg.role === "user"}
              />
            ))}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
    </div>
  );
};

export default ChatWindow;
