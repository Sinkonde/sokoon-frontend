import serverApi from '@/lib/api/severApi';
import { NextResponse } from 'next/server';

export async function POST(request) {

  try {
    const body = await request.json();

    // Validate request structure
    if (
      !body ||
      typeof body.type !== 'string' ||
      !body.type.trim() ||
      typeof body.payload !== 'object' ||
      body.payload === null ||
      Array.isArray(body.payload)
    ) {
      return NextResponse.json(
        { message: 'Invalid request payload.' },
        { status: 400 }
      );
    }

    // Forward request to Laravel
    const response = await serverApi.post(
      '/api/v1',
      body,
      {
        validateStatus: () => true,
      }
    );

    console.log(response)

    return NextResponse.json(
      response.data,
      { status: response.status }
    );

  } catch (error) {

    console.error('API Proxy Error:', error.message);

    return NextResponse.json(
      {
        message: 'Unable to communicate with backend.',
      },
      { status: 502 }
    );
  }
}