export type SafeRedirectSegments = {
  pathname: string
  search: string
  hash: string
}

export const DEFAULT_REDIRECT_PATH = '/'

export const isRelativePath = (value: string) => value.startsWith('/') && !value.startsWith('//')

export const sanitizeRelativeRedirect = (value: unknown, fallback = DEFAULT_REDIRECT_PATH) => {
  if (typeof value !== 'string') {
    return fallback
  }

  return isRelativePath(value) ? value : fallback
}

export const resolveRedirectSegments = (
  targetUrl: string | string[] | null | undefined,
  origin: string
): SafeRedirectSegments | null => {
  const candidate = Array.isArray(targetUrl) ? targetUrl[0] : targetUrl

  if (!candidate) {
    return null
  }

  try {
    const parsedUrl = new URL(candidate, origin)
    if (parsedUrl.origin !== origin) {
      return null
    }

    return {
      pathname: parsedUrl.pathname,
      search: parsedUrl.search,
      hash: parsedUrl.hash,
    }
  } catch {
    return null
  }
}

export const stringifyRedirectSegments = (segments: SafeRedirectSegments) =>
  `${segments.pathname}${segments.search}${segments.hash}`
