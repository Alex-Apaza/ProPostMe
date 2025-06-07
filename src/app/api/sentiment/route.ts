import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'tweets_analizados.csv');

    // Leer contenido del CSV
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parsear CSV a JSON
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    // ⚠️ Devuelve solo los primeros 1000 registros por rendimiento
    return NextResponse.json(records.slice(0, 1000));
  } catch (error) {
    return NextResponse.json({ error: 'Error leyendo el archivo CSV' }, { status: 500 });
  }
}
