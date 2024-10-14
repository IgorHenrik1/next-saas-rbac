import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'
import { redirect } from 'next/navigation'

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="pt-6">
        <Header />
        <Tabs />
      </div>
      <main className="mx-auto w-full max-w-[1200px] py-4">{children}</main>
    </div>
  )
}