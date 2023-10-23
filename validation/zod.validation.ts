import z from "zod"

export const signupSchema = z.object({
   name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(40, { message: "Name must be less than 40 characters" }),
   email: z.string().email({ message: "Invalid email" }),
   password: z
      .string()
      .min(8, {
         message: "Password must be at least 8 characters",
      })
      .max(20, { message: "Password must be less than 20 characters" }),
})
export type SignupSchemaType = z.infer<typeof signupSchema>

export const loginSchema = z.object({
   email: z.string().email({ message: "Invalid email" }),
   password: z.string().min(8).max(20),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
