const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function endpointUrl(endpoint) {
  if (endpoint.startsWith('/api/')) return `${apiBaseUrl.replace(/\/api$/, '')}${endpoint}`
  return `${apiBaseUrl}/${endpoint.replace(/^\//, '')}/`
}

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(endpointUrl(resource))
  if (!response.ok) throw new Error(`Could not load ${resource}`)
  return responseItems(await response.json())
}