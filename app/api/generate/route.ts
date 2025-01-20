import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { englishName } = body;

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2.5-7B-Instruct",
        messages: [
          {
            role: "user",
            content: `Please generate 3 Chinese names based on the English name "${englishName}". 
            Follow these rules:
            1. Names should sound similar to the English pronunciation
            2. Each character should have positive meanings
            3. Follow traditional Chinese naming conventions
            4. For each name provide:
               - Pinyin
               - Character meanings
               - Cultural significance
               - Personality traits
               - English explanation
            Format the response in JSON.`
          }
        ],
        stream: false,
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        frequency_penalty: 0.5,
        n: 1,
        response_format: { type: "text" }
      })
    };

    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', options);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate names' },
      { status: 500 }
    );
  }
}
