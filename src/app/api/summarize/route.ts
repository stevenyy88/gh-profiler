import { NextResponse } from 'next/server';
import { z } from 'zod';
import { normalizeGitHubUrl } from '../../../lib/validation/url';
import { fetchProfile, fetchOverview, fetchRepositories } from '../../../lib/github/fetcher';
import { computeSummary } from '../../../lib/summary/engine';
import { SummarizeResponse, SummarizeResponseError } from '../../../types/api';

const requestSchema = z.object({
  url: z.string().url()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = requestSchema.safeParse(body);
    
    if (!parseResult.success) {
      return NextResponse.json<SummarizeResponseError>(
        { success: false, error: 'Invalid request body', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    let username: string;
    try {
      const normalizedUrl = normalizeGitHubUrl(parseResult.data.url);
      username = new URL(normalizedUrl).pathname.substring(1);
    } catch (e: any) {
      return NextResponse.json<SummarizeResponseError>(
        { success: false, error: e.message, code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    const profileFetch = await fetchProfile(username);
    if (!profileFetch.data) {
      return NextResponse.json<SummarizeResponseError>(
        { success: false, error: 'GitHub profile not found or unavailable', code: 'FETCH_ERROR' },
        { status: 404 }
      );
    }

    const [overviewFetch, reposFetch] = await Promise.all([
      fetchOverview(username),
      fetchRepositories(username)
    ]);

    const warnings = [
      ...profileFetch.warnings,
      ...overviewFetch.warnings,
      ...reposFetch.warnings
    ];

    const summary = computeSummary(reposFetch.data);

    return NextResponse.json({
      success: true,
      data: {
        username,
        profile: profileFetch.data,
        overview: overviewFetch.data,
        repositories: reposFetch.data,
        summary,
        warnings,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (err: any) {
    return NextResponse.json<SummarizeResponseError>(
      { success: false, error: 'Internal Server Error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
