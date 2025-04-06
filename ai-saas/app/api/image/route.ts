import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
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
      console.error("[IMAGE_GENERATION_ERROR]", error);
      return new NextResponse("Failed to generate image", { status: 500 });
    }

    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const imageUrl = `data:image/png;base64,${base64Image}`;

    return NextResponse.json([{ url: imageUrl }]);
  } catch (error) {
    console.error("[IMAGE_GENERATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
