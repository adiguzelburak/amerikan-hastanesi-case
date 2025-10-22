import { SelectField } from "@/components/ui/custom-select"
import { Spinner } from "@/components/ui/spinner"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  addUser,
  selectUsersStatusFromState,
  selectUsersFromState,
} from "@/features/users/usersSlice"
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
} from "@headlessui/react"
import { useFormik } from "formik"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import type { User } from "./columns"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export const AddUser = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectUsersStatusFromState)
  const users = useAppSelector(selectUsersFromState)
  const [isOpen, setIsOpen] = useState(false)

  const validationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    role: z.string().min(1, "Role is required"),
    permissions: z
      .array(z.enum(["Read", "Write", "Delete", "Update"]))
      .min(1, "Permissions are required")
      .max(
        4,
        "Permissions must be one of the following: Read, Write, Delete, Update",
      ),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      role: "Admin",
      permissions: [] as string[],
    },
    validate: values => {
      try {
        validationSchema.parse(values)

        const nameExists = users.some(
          user => user.name.toLowerCase() === values.name.toLowerCase(),
        )

        if (nameExists) {
          return {
            name: "A user with this name already exists",
          }
        }

        return {}
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.issues.reduce<Record<string, string>>((acc, err) => {
            const path = err.path.join(".")
            acc[path] = err.message
            return acc
          }, {})
        }
        return {}
      }
    },
    onSubmit: (values: {
      name: string
      role: string
      permissions: string[]
    }) => {
      dispatch(
        addUser({
          id: Math.random().toString(36).substring(2, 15),
          name: values.name,
          role: values.role,
          permissions: values.permissions as (
            | "Read"
            | "Write"
            | "Delete"
            | "Update"
          )[],
        } as User),
      )
        .unwrap()
        .then(() => {
          formik.resetForm()
          toast.success("User added successfully")
          close()
        })
        .catch(error => {
          toast.error("Error adding user")
          console.error("Error adding user:", error)
        })
    },
  })

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const permissions = [
    { label: "Read", value: "Read" },
    { label: "Write", value: "Write" },
    { label: "Delete", value: "Delete" },
    { label: "Update", value: "Update" },
  ]

  return (
    <>
      <Button
        onClick={open}
        className="flex items-center justify-center gap-2 rounded-md bg-accent-foreground px-4 py-2 text-sm font-medium text-accent focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-accent-foreground/60"
      >
        <PlusIcon /> Add User
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
        aria-labelledby="add-user-dialog-title"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-accent p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                id="add-user-dialog-title"
                className="text-base/8 font-medium text-accent-foreground mb-4"
              >
                Add New User
              </DialogTitle>
              <form
                onSubmit={formik.handleSubmit}
                aria-label="Add new user form"
              >
                <Field className="flex flex-col gap-2">
                  <label
                    htmlFor="add-user-name"
                    className="text-accent-foreground text-sm"
                  >
                    Name
                  </label>
                  <Input
                    id="add-user-name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-accent text-accent-foreground border-accent-foreground border rounded-md px-2 py-1"
                    name="name"
                    aria-describedby={
                      formik.errors.name && formik.touched.name
                        ? "add-user-name-error"
                        : undefined
                    }
                    aria-invalid={
                      formik.errors.name && formik.touched.name ? true : false
                    }
                    aria-required="true"
                  />
                  {formik.errors.name && formik.touched.name && (
                    <Description
                      id="add-user-name-error"
                      className="text-red-500 text-xs"
                      role="alert"
                    >
                      *{formik.errors.name}
                    </Description>
                  )}
                </Field>

                <div className="mt-4">
                  <SelectField
                    label="Role"
                    description="Select the role of the user"
                    options={[
                      { label: "Admin", value: "Admin" },
                      { label: "Doctor", value: "Doctor" },
                      { label: "Patient", value: "Patient" },
                    ]}
                    name="role"
                    value={formik.values.role}
                    onChange={e => {
                      void formik.setFieldValue("role", e.target.value)
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.errors.role && formik.touched.role && (
                  <Description className="text-red-500 text-xs">
                    *{formik.errors.role}
                  </Description>
                )}

                <div className="mt-4">
                  <label
                    id="add-user-permissions-label"
                    className="text-sm/6 font-medium text-accent-foreground"
                  >
                    Permissions
                  </label>
                  <Description className="text-sm/6 text-accent-foreground/50">
                    Select the permissions of the user
                  </Description>
                  <div
                    className="grid grid-cols-4 gap-3 mt-4"
                    role="group"
                    aria-labelledby="add-user-permissions-label"
                    aria-describedby={
                      formik.errors.permissions && formik.touched.permissions
                        ? "add-user-permissions-error"
                        : undefined
                    }
                    aria-required="true"
                  >
                    {permissions.map(permission => (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`add-permission-${permission.value}`}
                          checked={formik.values.permissions.includes(
                            permission.value,
                          )}
                          onCheckedChange={checked => {
                            if (checked) {
                              void formik.setFieldValue("permissions", [
                                ...formik.values.permissions,
                                permission.value,
                              ])
                            } else {
                              void formik.setFieldValue(
                                "permissions",
                                formik.values.permissions.filter(
                                  p => p !== permission.value,
                                ),
                              )
                            }
                          }}
                          aria-label={`${permission.label} permission`}
                        />
                        <label
                          htmlFor={`add-permission-${permission.value}`}
                          className="text-sm text-accent-foreground cursor-pointer"
                        >
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {formik.errors.permissions && formik.touched.permissions && (
                  <Description
                    id="add-user-permissions-error"
                    className="text-red-500 text-xs"
                    role="alert"
                  >
                    *{formik.errors.permissions}
                  </Description>
                )}

                <div className="mt-4">
                  <Button
                    className="disabled:opacity-50 inline-flex items-center gap-2 rounded-md bg-accent-foreground px-3 py-1.5 text-sm/6 font-semibold text-accent shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-accent-foreground/60 transition-all duration-300 data-open:bg-accent-foreground/70"
                    type="submit"
                    disabled={status === "loading"}
                    aria-label={
                      status === "loading"
                        ? "Adding user, please wait"
                        : "Add user"
                    }
                  >
                    {status === "loading" ? (
                      <Spinner
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : null}
                    Add User
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
