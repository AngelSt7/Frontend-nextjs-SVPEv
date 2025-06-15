"use client"

import { HeroUIProvider } from "@heroui/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode } from "react"
import ToasterWrapper from "../components/dashboard/ui/darkmode/ToasterWrapper"

export function NextUIProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" enableSystem defaultTheme="system">
      <HeroUIProvider>
        {children}
        <ToasterWrapper />
      </HeroUIProvider>
    </NextThemesProvider>
  )
}
