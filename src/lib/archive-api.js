const configuredOrigin = (import.meta.env.VITE_ARCHIVE_ORIGIN || '').replace(/\/$/, '')
const archiveOrigin = configuredOrigin || (import.meta.env.DEV ? 'https://portfolio-archive-backend-preview.vkharikrishnan45.workers.dev' : '')

export const archiveApiUrl = (path) => `${archiveOrigin}${path}`

export async function fetchArchiveVersions(signal) {
  const response = await fetch(archiveApiUrl('/api/archive/versions'), {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error(`Archive request failed (${response.status})`)
  const payload = await response.json()
  if (!Array.isArray(payload.versions)) throw new Error('Archive response is invalid')
  return payload.versions
}
