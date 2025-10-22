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
        <Button variant="destructive" size="sm" aria-label="Delete user">
          <TrashIcon className="size-4" aria-hidden="true" /> Delete User
        </Button>
      </PopoverTrigger>
      <PopoverContent
        role="dialog"
        aria-labelledby="delete-user-title"
        aria-describedby="delete-user-description"
      >
        <p id="delete-user-description" className="text-accent-foreground mb-2">
          Are you sure you want to delete this user?
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={status === "loading"}
          className="hover:bg-destructive/60"
          aria-label={
            status === "loading"
              ? "Deleting user, please wait"
              : "Confirm delete user"
          }
        >
          {status === "loading" ? (
            <Spinner className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          Delete User
        </Button>
      </PopoverContent>
    </Popover>
  )
}
