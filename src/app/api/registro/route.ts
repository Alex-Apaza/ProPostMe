import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { nombre, apellido, correo_institucional, contraseña, fecha_nacimiento, id_universidad } = await req.json();
    
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar en base de datos
    const [result] = await db.execute(
      `INSERT INTO usuarios (nombre, apellido, correo_institucional, contraseña, fecha_nacimiento, id_universidad) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, correo_institucional, hashedPassword, fecha_nacimiento, id_universidad]
    );

    return NextResponse.json({ message: 'Usuario creado', userId: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
