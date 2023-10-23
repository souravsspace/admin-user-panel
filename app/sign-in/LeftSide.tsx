import { BiSolidFaceMask } from "react-icons/bi"

export default function LeftSide() {
   return (
      <main className="flex flex-col justify-between h-full">
         <header className="flex gap-2 items-center">
            <span className="text-3xl">
               <BiSolidFaceMask />
            </span>
            <h3 className="text-xl">Rue Inc</h3>
         </header>
         <blockquote className="space-y-2">
            <p className="text-lg">
               &ldquo; Most of us can&apos;t help but live as though we&apos;ve
               got two lives to live, one is the mockup, the other the finished
               version, and then there are all those versions in between &rdquo;
            </p>
            <footer className="text-sm">Sourav Ukil</footer>
         </blockquote>
      </main>
   )
}
