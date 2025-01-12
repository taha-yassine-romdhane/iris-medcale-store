import { NextResponse } from 'next/server';
import * as FilterService from '@/lib/services/filters';

export async function GET() {
  try {
    const filters = await FilterService.getFilters();
    return NextResponse.json(filters);
  } catch (error) {
    console.error('Error fetching filters:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        categories: [],
        brands: [],
        types: [],
      },
      { status: 500 }
    );
  }
}
