import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from "@/validation/zod.validation"
import prisma from "@/prisma/prisma"
import { compare } from "bcrypt"

export const options: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   session: {
      strategy: "jwt",
   },
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: {
               label: "Email",
               type: "email",
               placeholder: "name@example.com",
            },
            password: {
               label: "Password",
               type: "password",
               placeholder: "********",
            },
         },
         async authorize(credentials) {
            if (!credentials) return null
            if (!credentials.email || !credentials.password) return null

            const validCredentials = loginSchema.safeParse(credentials)
            if (!validCredentials.success) return null

            const { email, password } = validCredentials.data
            const user = await prisma.user.findUnique({
               where: {
                  email: email,
               },
            })
            if (!user) return null

            const isValid = await compare(user.password, password)
            if (!isValid) return null

            return {
               ...user,
               id: String(user.id),
            }
         },
      }),
   ],
   pages: {
      signIn: "/sign-in",
   },
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            return {
               ...token,
               id: user.id,
               name: user.name,
               email: user.email,
            }
         }
         return token
      },
      async session({ session, token }) {
         return {
            ...session,
            id: token.id,
            name: token.name,
            email: token.email,
         }
      },
   },
}
