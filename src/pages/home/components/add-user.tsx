import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react"
import { PlusIcon } from "lucide-react"
import { useState } from "react"

export const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={open}
        className="flex items-center justify-center gap-2 rounded-md bg-accent-foreground px-4 py-2 text-sm font-medium text-accent focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
      >
        <PlusIcon /> Add User
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-accent p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/8 font-medium text-accent-foreground mb-4"
              >
                Payment successful
              </DialogTitle>
              <Field className="flex flex-col gap-2">
                <Label className="text-accent-foreground text-sm">Name</Label>
                <Input
                  className="bg-accent text-accent-foreground border-accent-foreground border rounded-md px-2 py-1"
                  name="full_name"
                />
              </Field>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-accent-foreground px-3 py-1.5 text-sm/6 font-semibold text-accent shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-accent-foreground/60 transition-all duration-300 data-open:bg-accent-foreground/70"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
