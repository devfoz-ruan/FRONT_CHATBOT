import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id')
    console.log("id recebido:", id);

        const cookieStore = await cookies(); // ✅ await
    if (!id) {
      return NextResponse.json(
        { erro: "sem id no local storege" },
        { status: 400 }
      );
    }

    // ✅ montar header Cookie corretamente
    const cookieHeader = cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");

    const response = await fetch(
      `${process.env.BASE_URL}/grupo/${id}`,
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
    console.error("Erro /api/grupo:", e);
    return NextResponse.json(
      { erro: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
