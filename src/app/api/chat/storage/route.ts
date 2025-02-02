import { NextResponse } from 'next/server';
import {
  migrate,
  resetDb,
} from '../../../../../db/migrations/create-messages-table';

export async function GET() {
  await migrate();
  return NextResponse.json({ message: 'Migration completed successfully' });
}

export async function DELETE() {
  await resetDb();
  return NextResponse.json({ message: 'Database reset successfully' });
}
