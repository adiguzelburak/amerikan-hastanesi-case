/* eslint-disable @typescript-eslint/no-floating-promises */
import { getUsers } from "@/lib/api/fakeApi"
import { columns, type User } from "./components/columns"
import { DataTable } from "./components/data-table"
import { useEffect, useState } from "react"
import { AddUser } from "./components/add-user"

export const HomePage = () => {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers()
        setData(response as User[])
      } catch (error) {
        console.error("Error fetching users:", error)
        setIsError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="w-full h-full">
      <div className="flex justify-end mb-4">
        <AddUser />
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        isError={isError}
      />
    </div>
  )
}
