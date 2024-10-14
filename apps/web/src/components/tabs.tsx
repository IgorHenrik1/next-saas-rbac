import Link from 'next/link'
import { Button } from './ui/button'
import { getCurrentOrg } from '@/auth/auth'
import { NavLink } from './nav-link'

export function Tabs() {
  const currentOrg = getCurrentOrg()
  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <Button
          variant={'ghost'}
          size="sm"
          className="border-transparent border data-[current=true]:border-border ext-muted-foreground data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrg}`}>Projects</NavLink>
        </Button>
        <Button
          variant={'ghost'}
          size="sm"
          className="border-transparent border data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
        </Button>
        <Button
          variant={'ghost'}
          size="sm"
          className="border-transparent border data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrg}/settings`}>Settings & Billing</NavLink>
        </Button>
      </nav>
    </div>
  )
}
