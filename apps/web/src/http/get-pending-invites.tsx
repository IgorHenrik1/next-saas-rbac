import { Role } from '@saas/auth'

import { api } from './api-client'

interface getPendingInvitesResponse {
  invites: {
    organization: {
      name: string
    }
    id: string
    role: Role
    email: string
    createAt: string
    author: {
      name: string | null
      id: string
      avatarUrl: string | null
    } | null
  }[]
}

export async function getPendingInvites() {
  const result = await api
    .get(`pending-invites`, {})
    .json<getPendingInvitesResponse>()

  return result
}
