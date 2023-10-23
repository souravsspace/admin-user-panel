import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import SignInForm from "./SignInForm"

export default function RightSide() {
   return (
      <main className="flex flex-col h-full">
         <header className="flex justify-end p-4 md:p-0">
            <Link
               href="/sign-up"
               className={
                  cn(buttonVariants({ variant: "secondary" })) +
                  "transition-all bg-transparent text-white hover:bg-white/10 text-base"
               }
            >
               Register
            </Link>
         </header>
         <main className="flex h-full items-center justify-center flex-col">
            <SignInForm />
            <footer className="text-white/70 text-center text-sm">
               By clicking continue, you agree to our <br />
               <span className="transition-all hover:text-white underline cursor-pointer">
                  Terms of Service
               </span>{" "}
               and{" "}
               <span className="transition-all hover:text-white underline cursor-pointer">
                  Privacy Policy
               </span>
               .
            </footer>
         </main>
      </main>
   )
}
