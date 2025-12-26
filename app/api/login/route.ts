import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, senha } = body;

        if (!email || !senha) {
            return NextResponse.json(
                { error: 'Email e senha são obrigatórios' },
                { status: 400 }
            );
        }

        const backendRes = await fetch(`${process.env.BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, senha })
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
