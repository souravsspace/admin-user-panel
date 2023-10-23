import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Terminal } from "lucide-react"

export default function Success({
   title,
   description,
}: {
   title: string
   description: string
}) {
   return (
      <Alert className="bg-green-200">
         <Terminal className="h-4 w-4" />
         <AlertTitle className="text-green-600">{title}</AlertTitle>
         <AlertDescription className="text-green-600/90">
            {description}
         </AlertDescription>
      </Alert>
   )
}
