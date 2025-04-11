// src/app/api/usuarios/route.ts
import { NextResponse } from 'next/server';
//import { getConnection } from '@/lib/db';

export async function GET() {
  try {

    //Por el momento no se usa la base de datos

    //const pool = await getConnection();
    //const result = await pool.request().query('SELECT * FROM Usuarios');
   // return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('Error en API /api/usuarios:', error);
    return new NextResponse('Error al consultar la base de datos', { status: 500 });
  }
}

