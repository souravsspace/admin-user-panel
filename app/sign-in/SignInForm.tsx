"use client"

import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginSchema, LoginSchemaType } from "@/validation/zod.validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Error from "@/components/error"
import Success from "@/components/success"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { BsGithub } from "react-icons/bs"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInForm() {
   const router = useRouter()
   const [error, setError] = useState("")
   const [isPending, setIsPending] = useState(false)
   const [isSuccess, setIsSuccess] = useState(false)

   const {
      register,
      handleSubmit,
      formState: { errors: zodError },
   } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) })

   const onSubmit = async (data: LoginSchemaType) => {
      try {
         setIsPending(true)
         await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
         })
         setIsSuccess(true)
         router.push("/")
      } catch (error) {
         setIsSuccess(false)
         setIsPending(false)
         setError("something went wrong!")
      }
      setIsSuccess(false)
      setIsPending(false)
      setError("")
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex items-center justify-center"
      >
         <Card className="bg-transparent !border-none max-w-md">
            <CardHeader>
               <CardTitle className="text-white/90">Login</CardTitle>
               <CardDescription>
                  Enter your email and password below to login to your account
               </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
               {zodError.email || zodError.password || error !== "" ? (
                  <Error
                     title={
                        zodError.email?.message ||
                        zodError.password?.message ||
                        error ||
                        "Validation error"
                     }
                     description={"Some thing went worng"}
                  />
               ) : null}
               {isSuccess && (
                  <Success
                     title={"Success"}
                     description={"Login successfully"}
                  />
               )}
               <Input
                  {...register("email")}
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-transparent focus-visible:outline-none focus-visible:border-white border-white/70 text-white"
               />
               <Input
                  {...register("password")}
                  name="password"
                  type="password"
                  placeholder="********"
                  className="bg-transparent focus-visible:outline-none focus-visible:border-white border-white/70 text-white"
               />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
               <Button
                  disabled={isPending}
                  className="w-full"
                  type="submit"
                  variant="secondary"
               >
                  Head In
               </Button>
               <div className="flex justify-center items-center gap-1 my-3">
                  <Separator className="w-[100px] bg-white/50" />
                  <span className="text-white/50 text-sm">
                     OR CONTINUE WITH
                  </span>
                  <Separator className="w-[100px] bg-white/50" />
               </div>
               <Button
                  disabled={true}
                  onClick={() => signIn("github")}
                  type="button"
                  className="transition-all w-full border hover:border-transparent border-white/10 flex items-center justify-center gap-2 bg-transparent text-white hover:bg-white/10 text-sm"
               >
                  <BsGithub className="w-4 h-4" />
                  <span>Github</span>
               </Button>
            </CardFooter>
         </Card>
      </form>
   )
}
