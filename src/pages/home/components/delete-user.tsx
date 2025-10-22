import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { deleteUser } from "@/lib/api/fakeApi"
import { TrashIcon } from "lucide-react"
export const DeleteUser = ({ userId }: { userId: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="destructive" size="sm">
          <TrashIcon className="size-4" /> Delete User
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-accent-foreground">
          Are you sure you want to delete this user?
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => deleteUser(userId)}
          className="hover:bg-destructive/60"
        >
          Delete User
        </Button>
      </PopoverContent>
    </Popover>
  )
}
