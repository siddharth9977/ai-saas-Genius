import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const response = await fetch("https://api-inference.huggingface.co/models/facebook/musicgen-small", {
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
      const error = await response.json();
      console.error("[MUSICGEN_ERROR]", error);
      return new NextResponse("Failed to generate music", { status: 500 });
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return NextResponse.json({ audio: `data:audio/wav;base64,${base64}` });
  } catch (error) {
    console.error("[MUSICGEN_INTERNAL_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
