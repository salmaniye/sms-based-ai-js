// app/page.tsx

import ChatWindow from './components/ChatWindow';

export default function HomePage() {
  return (
    <div className="flex justify-center items-center ">
      {/* The chat window will take center stage */}
      <ChatWindow />
    </div>
  );
}
