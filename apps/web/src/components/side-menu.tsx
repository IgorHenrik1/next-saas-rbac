import { SheetHeader, SheetTitle } from './ui/sheet'

export function SideMenu() {
  return (
    <div className="p-5">
      <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
    </div>
  )
}
