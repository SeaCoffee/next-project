import 'server-only';

type NextFetchOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

type ApiErrorResponse = {
  status_message?: string;
  message?: string;
  success?: boolean;
  status_code?: number;
};

export class ApiRequestError extends Error {
  status: number;
  statusText: string;
  details: ApiErrorResponse | null;

  constructor({
    message,
    status,
    statusText,
    details,
  }: {
    message: string;
    status: number;
    statusText: string;
    details: ApiErrorResponse | null;
  }) {
    super(message);

    this.name = 'ApiRequestError';
    this.status = status;
    this.statusText = statusText;
    this.details = details;
  }
}

const getTmdbToken = (): string => {
  const token = process.env.TMDB_API_TOKEN;

  if (!token) {
    throw new Error(
      'TMDB_API_TOKEN is not defined. Add TMDB_API_TOKEN=<your-token> to .env.local',
    );
  }

  return token;
};

const parseJsonSafely = async <T>(response: Response): Promise<T | null> => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
};

const customFetchInterceptor = async <T>(
  url: string,
  options: NextFetchOptions = {},
): Promise<T> => {
  const headers = new Headers(options.headers);

  headers.set('Authorization', `Bearer ${getTmdbToken()}`);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await parseJsonSafely<T | ApiErrorResponse>(response);

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;

    throw new ApiRequestError({
      message:
        errorData?.status_message ||
        errorData?.message ||
        `Request failed with status ${response.status}`,
      status: response.status,
      statusText: response.statusText,
      details: errorData,
    });
  }

  return data as T;
};

export default customFetchInterceptor;