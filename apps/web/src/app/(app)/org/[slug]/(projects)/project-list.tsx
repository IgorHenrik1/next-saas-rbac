import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription className="leading-relax line-clamp-2"></CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarImage src="https://github.com/IgorHenrik1.png" />
            <AvatarFallback />
          </Avatar>
          <span className="text-xs text-muted-foreground">
            Created by <span className='font-medium text-foreground'>Igor</span> a day ago
          </span>
          <Button size='xs' variant='outline' className='ml-auto'>
            View <ArrowRight className='size-4 mr-2' />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
