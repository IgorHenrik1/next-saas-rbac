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
import { ChevronsUpDown, Loader, Loader2, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getProjects } from '@/http/get-projects'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from './ui/skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'project'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject =
    data && projectSlug
      ? data.projects.find((project) => project.slug === projectSlug)
      : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex border p-2 lg:p-1 lg:border-none w-full lg:w-[192px] items-center gap-2 rounded text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground">
        {
          isLoading ? (
            <>
              <Skeleton className='size-4 shrink-0 rounded-full' />
              <Skeleton className='h-4 w-full' />
            </>
          ) : (
            <>
                    {currentProject ? (
          <>
            <Avatar className=" size-4">
              {currentProject.avatarUrl && (
                <AvatarImage src={currentProject.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">{currentProject.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Select project</span>
        )}
            </>
          )
        }
        {
          isLoading ? (
            <Loader2 className='ml-auto text-muted-foreground size-4 animate-spin'/>

          ) : (
            <ChevronsUpDown className="ml-auto size-4 text-muted-foreground shrink-0" />

          )
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-2}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup className="space-y-2 pointer">
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data &&
            data.projects.map((project) => {
              return (
                <DropdownMenuItem key={project.id} asChild >
                  <Link  href={`/org/${orgSlug}/project/${project.slug}`}>
                    <Avatar className="mr-2 size-4">
                      {project.avatarUrl && (
                        <AvatarImage src={project.avatarUrl} />
                      )}
                      <AvatarFallback />
                    </Avatar>
                    <span className="line-clamp-1">{project.name}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/org/${orgSlug}/create-project`}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
