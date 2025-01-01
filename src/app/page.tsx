import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignOutButton, SignUpButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignUpButton>
          <Button className='bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded'>Зарегистрироваться</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton><Button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'>Войти</Button></SignOutButton>
      </SignedIn>
    </div>
  )
}
