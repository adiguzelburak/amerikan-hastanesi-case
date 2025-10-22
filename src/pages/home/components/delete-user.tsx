import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  deleteUser,
  selectUsersStatusFromState,
} from "@/features/users/usersSlice"
import { TrashIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { toast } from "sonner"

export const DeleteUser = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectUsersStatusFromState)

  const handleDelete = () => {
    dispatch(deleteUser(userId))
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully")
      })
      .catch(error => {
        toast.error("Error deleting user")
        console.error("Error deleting user:", error)
      })
      .finally(() => {
        setIsOpen(false)
      })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="destructive" size="sm">
          <TrashIcon className="size-4" /> Delete User
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-accent-foreground mb-2">
          Are you sure you want to delete this user?
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={status === "loading"}
          className="hover:bg-destructive/60"
        >
          {status === "loading" ? (
            <Spinner className="size-4 animate-spin" />
          ) : null}
          Delete User
        </Button>
      </PopoverContent>
    </Popover>
  )
}
