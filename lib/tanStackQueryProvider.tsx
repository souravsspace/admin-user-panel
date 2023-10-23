"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type Props = {
   children: React.ReactNode
}

const queryCLient = new QueryClient()

export default function QueryProvider({ children }: Props) {
   return (
      <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
   )
}
