import { NextResponse } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});
const instructionMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
  role: "assistant",
  content: "You are a code generator. You must answer only in markdown code snippets. USe code commants for explanation"
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
      messages:[instructionMessage,...messages],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
