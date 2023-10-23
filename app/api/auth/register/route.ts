import { SignupSchemaType, signupSchema } from "@/validation/zod.validation"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/prisma/prisma"

export async function POST(request: Request) {
   const body = await request.json()
   const { name, email, password }: Partial<SignupSchemaType> = body
   if (!body || !name || !email || !password) {
      return NextResponse.json("Missing name, email or password", {
         status: 400,
      })
   }

   const validation = signupSchema.safeParse(body)
   if (!validation.success) {
      return NextResponse.json(validation.error.message, { status: 400 })
   }
   const { data } = validation

   const userExists = await prisma.user.findUnique({
      where: { email: data.email },
   })
   if (userExists) {
      return NextResponse.json("User already exists", { status: 400 })
   }

   const hashedPassword = await bcrypt.hash(data.password, 10)
   try {
      const user = await prisma.user.create({
         data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
         },
      })
      console.log(user)
      return NextResponse.json(user, { status: 201 })
   } catch (error: any) {
      return NextResponse.json(error.message, { status: 500 })
   }
}
