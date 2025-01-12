import { NextResponse } from 'next/server';
import { getCategoryTypeRelations } from '@/lib/services/filters';

export async function GET() {
  try {
    const relations = await getCategoryTypeRelations();
    return NextResponse.json(relations);
  } catch (error) {
    console.error('Error in category-types API:', { error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json(
      { error: 'Failed to fetch category types' },
      { status: 500 }
    );
  }
}
