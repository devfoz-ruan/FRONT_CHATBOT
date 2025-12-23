import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const grupoid = searchParams.get("grupoid");

    if (!grupoid) {
        return NextResponse.json(
            { erro: "grupoid é obrigatório" },
            { status: 400 }
        );
    }
    console.log('grupoid recebido:', grupoid);

    const response = await fetch(
        `http://localhost:3001/cliente/${grupoid}`
    );

    if (!response.ok) {
        return NextResponse.json(
            { erro: "Erro na API externa" },
            { status: 500 }
        );
    }

    const data = await response.json();
    return NextResponse.json(data);
}
