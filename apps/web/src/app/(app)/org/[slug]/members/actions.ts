'use server'

import { getCurrentOrg } from "@/auth/auth"
import { RemoveMember } from "@/http/remove-member"
import { revalidateTag } from "next/cache"

export async function removeMemberAction(memberId: string){
  const currentOrg = getCurrentOrg()
  await RemoveMember({org: currentOrg!, memberId})
  revalidateTag(`${currentOrg}/members`)
}