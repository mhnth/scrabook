import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('pong');

  return NextResponse.json('pong server');
}
