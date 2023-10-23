"use client"

import { signOut, useSession } from "next-auth/react"
import SignIn from "./sign-in/page"
import { Button } from "@/components/ui/button"

export default function Home() {
   const { status, data } = useSession()

   if (status === "loading") return <div>Loading...</div>

   return (
      <main>
         <h1>Home</h1>
         {data?.user && (
            <div>
               <h2>Welcome {data.user.name}</h2>
               <p>You can now access our super secret pages</p>
               <Button onClick={() => signOut()}>Logout</Button>
            </div>
         )}
      </main>
   )
}
