
// Using Next.js App Router Route Handler instead of Pages Router API route.
import { NextRequest, NextResponse } from "next/server";
import { AI_MODELS } from "@/lib/aiModels";
import { callModel } from "@/lib/apiClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input, model } = body;

    const modelInfo = AI_MODELS.find(m => m.id === model);

    if (!modelInfo) {
      return NextResponse.json({ error: "Invalid model" }, { status: 400 });
    }

    const output = await callModel(modelInfo, input);
    
    return NextResponse.json({ output });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message || 'An unknown error occurred' }, { status: 500 });
  }
}
