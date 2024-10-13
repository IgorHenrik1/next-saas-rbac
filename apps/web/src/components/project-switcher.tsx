'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getProjects } from '@/http/get-projects'
import { use } from 'react'
import { useQuery } from '@tanstack/react-query'

export function ProjectSwitcher(){
  const {slug: orgSlug} = useParams<{
    slug: string
  }>()

  const {data, isLoading} = useQuery({
    queryKey: [orgSlug, 'project'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  console.log(data)
  return(
    <DropdownMenu>
    <DropdownMenuTrigger className="flex w-[192px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground">
      {/* {currentOrganization ? (
        <>
          <Avatar className="mr-2 size-4">
            {currentOrganization.avatarUrl && (
              <AvatarImage src={currentOrganization.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>
          <span className="truncate text-left">{currentOrganization.name}</span>
        </>
      ) : (*/}
        <span className="text-muted-foreground">Select project</span>
      {/* )}  */}
      <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      alignOffset={-2}
      sideOffset={12}
      className="w-[200px]"
    >
      <DropdownMenuGroup className="space-y-2">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        {/* {organizations.map((organization) => {
          return ( */}
            <DropdownMenuItem /* key={organization.id} */ asChild>
              <Link href={''}>
                <Avatar className="mr-2 size-4">
                  {/* {organization.avatarUrl && (
                    <AvatarImage src={organization.avatarUrl} />
                  )} */}
                  <AvatarFallback />
                </Avatar>
                <span className="line-clamp-1">Projeto teste</span>
              </Link>
            </DropdownMenuItem>
          {/* )
        })} */}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="">
          <PlusCircle className="mr-2 size-4" />
          Create new
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}