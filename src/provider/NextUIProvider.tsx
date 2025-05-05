// app/providers.tsx

import {HeroUIProvider} from '@heroui/react'

export function NextUIProvider({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}