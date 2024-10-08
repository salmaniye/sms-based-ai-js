// app/api/chat/route.ts

import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { BESCI_SYSTEM_PROMPT } from '@/app/utils/prompts';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = 'gpt-4o-2024-08-06';

export async function POST(req: NextRequest) {
    const { messages } = await req.json();

    try {
        // Insert system prompt at the beginning of the conversation
        const systemMessage = {
            role: 'system',
            content: BESCI_SYSTEM_PROMPT 
        };

        // Add the system message to the conversation
        const response = await client.chat.completions.create({
            model: MODEL,
            messages: [systemMessage, ...messages],
            temperature: 0.05,
            max_tokens: 500,
        });

        const fullResponse = response.choices[0].message.content;
        const smsChunks = fullResponse ? splitSms(fullResponse) : [];

        return NextResponse.json({ chunks: smsChunks });
    } catch (error) {
        console.error("Error fetching response from GPT-4", error);
        return NextResponse.json({ error: 'Failed to get response from GPT-4' }, { status: 500 });
    }
}

function splitSms(response: string) {
    return response
        .split(/Message \d+:/)
        .map((msg) => msg.trim())
        .filter((msg) => msg);
}
