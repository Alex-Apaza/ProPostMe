import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Deberías poner tu propia secret key real aquí
const JWT_SECRET = process.env.JWT_SECRET || 'mipostmesecretkey';

export async function POST(req: NextRequest) {
  try {
    const { correo_institucional, contraseña } = await req.json();

    // Buscar el usuario
    const [rows]: any = await db.execute(
      'SELECT * FROM usuarios WHERE correo_institucional = ?',
      [correo_institucional]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const user = rows[0];

    // Comparar contraseña
    const validPassword = await bcrypt.compare(contraseña, user.contraseña);

    if (!validPassword) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id_usuario: user.id_usuario, correo: user.correo_institucional },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      message: 'Login exitoso',
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo_institucional: user.correo_institucional,
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
