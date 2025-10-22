import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  fetchUsers,
  selectUsersFromState,
  selectUsersStatusFromState,
  selectUsersErrorFromState,
} from "@/features/users/usersSlice"
import { useEffect } from "react"
import { AddUser } from "./components/add-user"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsersFromState)
  const status = useAppSelector(selectUsersStatusFromState)
  const error = useAppSelector(selectUsersErrorFromState)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers())
    }
  }, [status, dispatch])

  return (
    <div className="w-full h-full space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Users Management
          </h2>
          <p className="text-muted-foreground">
            Manage your users and their roles
          </p>
        </div>
        <AddUser />
      </div>
      <DataTable
        columns={columns}
        data={users}
        isLoading={status === "loading"}
        isError={status === "failed" && error !== null}
      />
    </div>
  )
}
