import { ProfileOutput } from './summary';

export interface SummarizeRequest {
  url: string;
}

export interface SummarizeResponseSuccess {
  success: true;
  data: ProfileOutput;
}

export interface SummarizeResponseError {
  success: false;
  error: string;
  code: 'VALIDATION_ERROR' | 'FETCH_ERROR' | 'PARSE_ERROR' | 'INTERNAL_ERROR';
}

export type SummarizeResponse = SummarizeResponseSuccess | SummarizeResponseError;
