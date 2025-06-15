"use client"

import { Toaster } from "react-hot-toast"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ToasterWrapper() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "10px",
          background: (theme === "dark" || resolvedTheme === "dark") ? "#333" : "#fff",
          color: (theme === "dark" || resolvedTheme === "dark") ? "#fff" : "#000",
        },
      }}
    />
  )
}
