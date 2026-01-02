import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("grupoid");

    if (!id) {
      return NextResponse.json(
        { erro: "sem id vindo na requisição" },
        { status: 400 }
      );
    }

    const cookieHeader = cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");

    const response = await fetch(
      `${process.env.BASE_URL}/posts/${id}`,
      {
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
    console.error("Erro /api/posts:", e);
    return NextResponse.json(
      { erro: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}



export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();

    const { idgrupo, idvendedor, texto, timestamp, iscomentario } = body;

    // ✅ validação correta
    if (
      !idgrupo ||
      !idvendedor ||
      !texto ||
      !timestamp ||
      iscomentario === undefined
    ) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // ✅ repassa cookies para o backend (auth)
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const backendRes = await fetch(`${process.env.BASE_URL}/posts`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        idvendedor:idvendedor,
        idgrupo:idgrupo,
        texto : texto,
        timestamp: timestamp,
        iscomentario: iscomentario
      })
    });

    // ❌ erro vindo do backend
    if (!backendRes.ok) {
      const errText = await backendRes.text();
      return NextResponse.json(
        { error: errText || "Erro no backend" },
        { status: backendRes.status }
      );
    }

    // ✅ backend DEVE retornar o post criado
    const data = await backendRes.json();

    // ✅ frontend usa response.json()
    return NextResponse.json(data, { status: backendRes.status });

  } catch (err) {
    console.error("Erro /api/posts:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

