import { api } from './api-client'

interface GetOrganizationResponse {
  organization: {
    name: string
    id: string
    slug: string | null
    domain: string | null
    shouldAttachUserByDomain: boolean
    avatarUrl: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

export async function getOrganization(org: string) {
  const result = await api
    .get(`organizations/${org}`)
    .json<GetOrganizationResponse>()

  return result
}
