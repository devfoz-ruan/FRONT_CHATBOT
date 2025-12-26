import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies(); // ✅ await

    const { searchParams } = new URL(req.url);
    const grupoid = searchParams.get("grupoid");

    if (!grupoid) {
      return NextResponse.json(
        { erro: "grupoid é obrigatório" },
        { status: 400 }
      );
    }

    console.log("grupoid recebido:", grupoid);

    // ✅ montar header Cookie corretamente
    const cookieHeader = cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");

    const response = await fetch(
      `${process.env.BASE_URL}/cliente/${grupoid}`,
      {
        method: "GET",
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: err },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (e) {
    console.error("Erro /api/cliente:", e);
    return NextResponse.json(
      { erro: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
