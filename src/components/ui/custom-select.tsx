import { Description, Field, Label, Select } from "@headlessui/react"
import clsx from "clsx"
import { ChevronDownIcon } from "lucide-react"

export const SelectField = ({
  label,
  description,
  options,
  name,
  value,
  onChange,
  onBlur,
}: {
  label: string
  description: string
  options: { label: string; value: string }[]
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void
}) => {
  return (
    <div className="w-full">
      <Field>
        <Label className="text-sm/6 font-medium text-accent-foreground">
          {label}
        </Label>
        <Description className="text-sm/6 text-accent-foreground/50">
          {description}
        </Description>
        <div className="relative">
          <Select
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border-none bg-accent-foreground/10 text-accent-foreground border-accent-foreground border px-3 py-1.5 text-sm/6",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
              // Make the text of each option black on Windows
              "*:text-accent-foreground",
            )}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-accent-foreground/60"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  )
}
