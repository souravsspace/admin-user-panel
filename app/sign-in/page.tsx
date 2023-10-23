import QueryProvider from "@/lib/tanStackQueryProvider"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"

export default function SignIn() {
   return (
      <QueryProvider>
         <main>
            <div className="flex w-full h-screen">
               <section className="p:4 md:p-10 flex-1 bg-black/90 text-white md:block hidden">
                  <LeftSide />
               </section>
               <section className="p:4 md:p-10 flex-1 bg-black text-white">
                  <RightSide />
               </section>
            </div>
         </main>
      </QueryProvider>
   )
}
