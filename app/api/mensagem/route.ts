import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idconversa = searchParams.get("idconversa");

    if (!idconversa) {
      return NextResponse.json(
        { erro: "idconversa é obrigatório" },
        { status: 400 }
      );
    }

    // ✅ cookies DENTRO do handler
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.BASE_URL}/mensagem/${idconversa}`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { erro: "Erro na API externa" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { erro: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
