import { NextResponse } from 'next/server';

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
            content: `Generate 3 Chinese names based on the English name "${englishName}". 
            Return the result in the following JSON format:
            [
              {
                "name": "中文名",
                "pinyin": "Zhong Wen Ming",
                "meanings": {
                  "individual": ["第一个字的含义", "第二个字的含义", "第三个字的含义"],
                  "combined": "整体含义"
                },
                "cultural": "文化内涵",
                "personality": "性格特征",
                "english": "English explanation"
              }
            ]
            Make sure each name is meaningful, elegant, and phonetically similar to "${englishName}".
            Ensure each explanation is concise but informative.`
          }
        ],
        stream: false,
        max_tokens: 1024,
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
