import rocketseatIcon from '@/assets/rockeatseat-icon.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'
import { LogOut, Menu, MenuIcon, Slash } from 'lucide-react'
import { OrganizationSwitcher } from './organization-switcher'
import { ability } from '@/auth/auth'
import { Separator } from './ui/separator'
import { ThemeSwitcher } from './theme/theme-switcher'
import { ProjectSwitcher } from './project-switcher'
import { PendingInvites } from './pending-invites'
import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { SideMenu } from './side-menu'
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { Card, CardContent } from './ui/card'
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
          <SheetContent className="flex flex-col gap-3 px-5 pt-10 w-full items-start">
            <div className="flex flex-row-reverse items-center w-full justify-between">
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
