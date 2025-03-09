import { NextResponse } from 'next/server';
import { modelSchema } from '@/lib/schema';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = modelSchema.parse(body);
    
    // Create OpenAI client
    const openai = new OpenAI({
      apiKey: validatedData.apiKey,
      baseURL: validatedData.baseUrl,
    });

    // Get available models to verify if the selected model is available
    const modelsResponse = await openai.models.list();

    return NextResponse.json(
      { models: modelsResponse.data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Speed test error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}
