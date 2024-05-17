import { fetchQ1 } from '@/service/fetch';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const res = await fetch('http://10.150.1.148:8000');
        if (res.ok) {
            return await res.json();
        }
    } catch (error: any) {
        console.error(error);
        return new Response(
            JSON.stringify({
                error: error?.message,
            }),
            { status: 500 }
        );
    }
}
