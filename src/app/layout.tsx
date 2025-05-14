import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mikhail Haritz - Web Developer Portfolio",
  description: "A modern portfolio website showcasing web development projects",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${plus_jakarta_sans.className} bg-black text-white`}>
          {children}
      </body>
    </html>
  )
}
