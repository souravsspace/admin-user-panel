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
import { SignupSchemaType, signupSchema } from "@/validation/zod.validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Error from "@/components/error"
import Success from "@/components/success"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { BsGithub } from "react-icons/bs"
import { signIn } from "next-auth/react"

export default function SignUpForm() {
   const router = useRouter()

   const { isPending, isPaused, isSuccess, mutateAsync } = useMutation({
      mutationFn: async (data: SignupSchemaType) => {
         await axios.post("/api/auth/register", data)
      },
   })

   const {
      register,
      handleSubmit,
      formState: { errors: zodError },
   } = useForm<SignupSchemaType>({ resolver: zodResolver(signupSchema) })

   const onSubmit = async (data: SignupSchemaType) => {
      await mutateAsync(data)
   }
   
   if (isSuccess) router.push("/sign-in")

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex items-center justify-center"
      >
         <Card className="bg-transparent !border-none max-w-md">
            <CardHeader>
               <CardTitle className="text-white/90">
                  Create an account
               </CardTitle>
               <CardDescription>
                  Enter your email below to create your account and get started.
               </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
               {zodError.name || zodError.email || zodError.password ? (
                  <Error
                     title={
                        zodError.name?.message ||
                        zodError.email?.message ||
                        zodError.password?.message ||
                        "Validation error"
                     }
                     description={"Some thing went worng"}
                  />
               ) : null}
               {isSuccess && (
                  <Success
                     title={"Success"}
                     description={"Your account has been created"}
                  />
               )}
               <Input
                  {...register("name")}
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="bg-transparent focus-visible:outline-none focus-visible:border-white border-white/70 text-white"
               />
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
                  disabled={isPending || isPaused}
                  className="w-full"
                  type="submit"
                  variant="secondary"
               >
                  Register
               </Button>
               <div className="flex justify-center items-center gap-1 my-3">
                  <Separator className="w-[100px] bg-white/50" />
                  <span className="text-white/50 text-sm">
                     OR CONTINUE WITH
                  </span>
                  <Separator className="w-[100px] bg-white/50" />
               </div>
               <Button
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
