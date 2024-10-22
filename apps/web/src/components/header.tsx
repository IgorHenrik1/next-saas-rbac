import { LogOut, MenuIcon, Slash } from 'lucide-react'
import Image from 'next/image'

import rocketseatIcon from '@/assets/rockeatseat-icon.svg'
import { ability } from '@/auth/auth'

import { OrganizationSwitcher } from './organization-switcher'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
export async function Header() {
  const permissions = await ability()
  return (
    <>
      <div className="mx-auto hidden max-w-[1200px] flex-wrap items-center justify-between lg:flex">
        <div className="flex items-center gap-3">
          <Image
            src={rocketseatIcon}
            alt="Rocketseat"
            className="siz6-6 dark:invert"
          />
          <Slash className="size-3 -rotate-[24deg] text-border" />
          <OrganizationSwitcher />
          {permissions?.can('get', 'Project') && (
            <>
              <Slash className="size-3 -rotate-[24deg] text-border" />
              <ProjectSwitcher />
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <PendingInvites />
          <ThemeSwitcher />
          <Separator orientation="vertical" className="h-5" />
          <ProfileButton />
        </div>
      </div>
      <div className="flex justify-between lg:hidden">
        <Image
          src={rocketseatIcon}
          alt="Rocketseat"
          className="siz6-6 dark:invert"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-full flex-col items-start gap-3 px-5 pt-10">
            <div className="flex w-full flex-row-reverse items-center justify-between">
              <a href="/api/auth/sign-out" className="block lg:hidden">
                <LogOut className="size-4" />
              </a>
              <PendingInvites />
              <ThemeSwitcher />
              <Separator orientation="vertical" className="h-5" />
              <ProfileButton />
            </div>
            <Separator />
            <OrganizationSwitcher />
            {permissions?.can('get', 'Project') && (
              <>
                <ProjectSwitcher />
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
