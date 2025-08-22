type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const DEFAULT_TIMEOUT = 8000

export interface ApiOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

export async function apiFetch<T>(url: string, opts: ApiOptions = {}): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), opts.timeout ?? DEFAULT_TIMEOUT)

  try {
    const res = await fetch(url, {
      method: opts.method ?? 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(opts.headers || {}),
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`API ${res.status}: ${text}`)
    }

    return (await res.json()) as T
  } finally {
    clearTimeout(timeout)
  }
}

