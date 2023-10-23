import nextAuth from "next-auth"
import { options } from "./options"

const handeler = nextAuth(options)
export { handeler as GET, handeler as POST }
