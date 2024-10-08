// app/api/chat/route.ts

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { BESCI_SYSTEM_PROMPT } from "@/app/utils/prompts";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = "gpt-4o-2024-08-06";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    // Insert system prompt at the beginning of the conversation
    const systemMessage = {
      role: "system",
      content: BESCI_SYSTEM_PROMPT,
    };

    // Add the system message to the conversation
    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [systemMessage, ...messages],
      temperature: 0.05,
      max_tokens: 500,
    });

    const fullResponse = response.choices[0].message.content;
    console.log(fullResponse);
    const smsChunks = fullResponse ? splitSms(fullResponse) : [];

    return NextResponse.json({ chunks: smsChunks });
  } catch {
    return NextResponse.json(
      { error: "Failed to get response from GPT-4" },
      { status: 500 }
    );
  }
}

function splitSms(response: string) {
  // Split the response based on the pattern `(x/x)` where x is any number
  const regex = /\(\d+\/\d+\)/g; // This regex matches the "(x/x)" pattern

  const cleanedResponse = response.replace(/Message \d+:/g, "").trim();

  // Split response at every "(x/x)" but keep the delimiter "(x/x)" with the message
  let result = cleanedResponse.split(regex).map((msg, index) => {
    // Add back the corresponding delimiter (e.g., "(1/6)") to the end of each chunk
    const match = response.match(regex);
    return match && match[index] ? `${msg} ${match[index]}` : msg;
  });

  // Filter out any empty messages after splitting
  return result.filter((msg) => msg.trim());
}
