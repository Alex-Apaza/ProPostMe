import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const [universidades]: any = await db.execute('SELECT id_universidad, nombre FROM universidades');

    if (!Array.isArray(universidades)) {
      console.error('No recibimos un array de universidades', universidades);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(universidades, { status: 200 });
  } catch (error) {
    console.error('Error al cargar universidades:', error);
    return NextResponse.json([], { status: 500 });
  }
}
