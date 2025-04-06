import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    // Use Hugging Face's text generation model for story generation
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[STORY_GENERATION_ERROR]", error);
      return new NextResponse("Failed to generate story", { status: 500 });
    }

    const data = await response.json();
    const generatedStory = data[0]?.generated_text;

    if (!generatedStory) {
      return new NextResponse("Story generation failed", { status: 500 });
    }

    return NextResponse.json([{ story: generatedStory }]);
  } catch (error) {
    console.error("[STORY_GENERATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
