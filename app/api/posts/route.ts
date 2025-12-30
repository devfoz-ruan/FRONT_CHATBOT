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
        const body = await req.json();
        const { idpost, idgrupo, idvendedor, texto, timestamp, iscomentario} = body;

        if (!idgrupo || !idvendedor|| !texto || !timestamp || !iscomentario || !idpost) {
            return NextResponse.json(
                { error: 'Todos os campos sao obrigatórios' },
                { status: 400 }
            );
        }

        const backendRes = await fetch(`${process.env.BASE_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({idpost, idgrupo, idvendedor, texto, timestamp, iscomentario})
        });

        // Repassa erro do backend
        if (!backendRes.ok) {
            const err = await backendRes.text();
            return NextResponse.json(
                { error: err },
                { status: backendRes.status }
            );
        }

        // ⚠️ MUITO IMPORTANTE
        // Repassa headers (Set-Cookie) para o browser
        return new NextResponse(backendRes.body, {
            status: backendRes.status,
            headers: backendRes.headers
        });

    } catch (err) {
        console.error('Erro proxy login:', err);
        return NextResponse.json(
            { error: 'Payload inválido' },
            { status: 400 }
        );
    }
}
