import type { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { DeleteUser } from "./delete-user"
import { EditUser } from "./edit-user"

// Zod schema for User data validation
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  permissions: z.array(z.enum(["Read", "Write", "Delete", "Update"])),
})

// Infer TypeScript type from Zod schema
export type User = z.infer<typeof userSchema>

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const permissions = row.getValue("permissions")
      return Array.isArray(permissions) ? permissions.join(", ") || "" : ""
    },
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-2">
          <EditUser user={user} />
          <DeleteUser userId={user.id} />
        </div>
      )
    },
  },
]
