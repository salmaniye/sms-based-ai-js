// app/page.tsx

import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex justify-center items-center ">
        {/* The chat window will take center stage */}
        <ChatWindow />
      </div>
    </div>
  );
}
