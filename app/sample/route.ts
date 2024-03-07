import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  sendCharacters(text);

  return new NextResponse(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });

  async function sendCharacters(remainingText: string) {
    if (remainingText.length === 0) {
      writer.close();
      return;
    }

    const c = remainingText.at(0);
    const rest = remainingText.slice(1);

    const message = encoder.encode(`data: ${c}\n\n`);
    await writer.write(message);
    await sleep(100);
    await sendCharacters(rest);
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const text =
  '私はその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。これは世間を憚る遠慮というよりも、その方が私にとって自然だからである。私はその人の記憶を呼び起こすごとに、すぐ「先生」といいたくなる。';
