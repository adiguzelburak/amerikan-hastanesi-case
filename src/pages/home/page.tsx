import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export const HomePage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <Link to="/test">Test</Link>
    </div>
  )
}
