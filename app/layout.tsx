import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import AuthSessionProvider from "@/lib/AuthSessionProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "Admin _ User",
   description: "Admin _ User",
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <AuthSessionProvider>{children}</AuthSessionProvider>
         </body>
      </html>
   )
}
