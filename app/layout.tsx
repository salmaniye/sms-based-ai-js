// app/layout.tsx

import "../styles/globals.css";

import { ReactNode } from 'react';

export const metadata = {
  title: 'Health Advisor Chatbot',
  description: 'A chatbot providing health advice and guidance.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex flex-col h-3/4">
          {/* Main content area */}
          <main className="flex-grow overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
