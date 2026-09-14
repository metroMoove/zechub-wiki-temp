import { NextRequest, NextResponse } from "next/server";

const FAUZEC_API = "https://fauzec.com/api/v1";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body?.network !== "testnet" || typeof body?.address !== "string") {
      return NextResponse.json(
        { error: "A testnet network and address are required" },
        { status: 400 },
      );
    }

    const upstream = await fetch(`${FAUZEC_API}/claim`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ network: "testnet", address: body.address }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    const payload = await upstream.json().catch(() => ({
      error: "Fauzec returned an invalid response",
    }));
    return NextResponse.json(payload, { status: upstream.status });
  } catch (error) {
    console.error("[faucet] claim proxy failed", error);
    return NextResponse.json(
      { error: "The faucet is temporarily unavailable" },
      { status: 502 },
    );
  }
}
