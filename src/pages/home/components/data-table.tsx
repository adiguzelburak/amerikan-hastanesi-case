/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircleIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "react-router-dom"

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  isError,
}: {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  isError: boolean
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialPage = parseInt(searchParams.get("page") || "1") - 1
  const initialPageSize = parseInt(searchParams.get("pageSize") || "10")
  const initialName = searchParams.get("name") || ""
  const initialRole = searchParams.get("role") || ""

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = []
    if (initialName) filters.push({ id: "name", value: initialName })
    if (initialRole) filters.push({ id: "role", value: initialRole })
    return filters
  })
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: initialPageSize,
        pageIndex: initialPage,
      },
    },
  })

  useEffect(() => {
    const params = new URLSearchParams()

    const pageIndex = table.getState().pagination.pageIndex
    const pageSize = table.getState().pagination.pageSize

    if (pageIndex > 0) {
      params.set("page", String(pageIndex + 1))
    }

    if (pageSize !== 10) {
      params.set("pageSize", String(pageSize))
    }

    const nameFilter = table.getColumn("name")?.getFilterValue() as string
    const roleFilter = table.getColumn("role")?.getFilterValue() as string

    if (nameFilter) {
      params.set("name", nameFilter)
    }

    if (roleFilter) {
      params.set("role", roleFilter)
    }

    setSearchParams(params, { replace: true })
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
    columnFilters,
    setSearchParams,
  ])

  return (
    <div className="w-full space-y-4">
      {/* Filters Section */}
      <div className="flex items-center gap-4" role="search">
        <div className="max-w-sm flex-1">
          <label htmlFor="search-users" className="sr-only">
            Search users by name
          </label>
          <Input
            id="search-users"
            placeholder="Search by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) || ""}
            onChange={event =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            aria-label="Search users by name"
          />
        </div>
        <div>
          <label htmlFor="filter-by-role" className="sr-only">
            Filter users by role
          </label>
          <Select
            value={
              (table.getColumn("role")?.getFilterValue() as string) || "all"
            }
            onValueChange={value =>
              table
                .getColumn("role")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger
              id="filter-by-role"
              className="w-[180px]"
              aria-label="Filter by role"
            >
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Patient">Patient</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-hidden rounded-md border w-full"
        role="region"
        aria-label="Users table"
      >
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-12 p-0 text-center"
                >
                  <div
                    className="flex items-center justify-center h-24 text-lg"
                    role="status"
                    aria-live="polite"
                  >
                    <Spinner
                      className="size-6 animate-spin mr-2"
                      aria-hidden="true"
                    />
                    <span>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div
                    className="flex items-center justify-center h-24 text-2xl"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircleIcon
                      className="size-6 mr-2"
                      aria-hidden="true"
                    />
                    <span>Error loading data.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                  role="status"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-between px-2"
        role="navigation"
        aria-label="Table pagination"
      >
        <div
          className="flex-1 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{" "}
          of {table.getFilteredRowModel().rows.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </Button>
          <div
            className="text-sm"
            aria-current="page"
            aria-label={`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
          >
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
