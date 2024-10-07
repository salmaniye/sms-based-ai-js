// app/api/chat/route.ts

import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = 'gpt-4o-2024-08-06';

export async function POST(req: NextRequest) {
    const { messages } = await req.json();

    try {
        const response = await client.chat.completions.create({
            model: MODEL,
            messages,
            temperature: 0.05,
            max_tokens: 500,
        });

        const fullResponse = response.choices[0].message.content;
        const smsChunks = fullResponse ? splitSms(fullResponse) : [];

        return NextResponse.json({ chunks: smsChunks });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get response from GPT-4' }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

function splitSms(response: string) {
    return response
        .split(/Message \d+:/)
        .map((msg) => msg.trim())
        .filter((msg) => msg);
}
