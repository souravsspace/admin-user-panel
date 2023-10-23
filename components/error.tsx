import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Terminal } from "lucide-react"

export default function Error({
   title,
   description,
}: {
   title: string
   description: string
}) {
   return (
      <Alert variant="destructive">
         <Terminal className="h-4 w-4" />
         <AlertTitle>{title}</AlertTitle>
         <AlertDescription>{description}</AlertDescription>
      </Alert>
   )
}
