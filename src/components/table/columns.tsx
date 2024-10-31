"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Petition, Report } from "../../lib/actions/appwrite.actions"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tooltip } from "@/components/ui/tooltip"

type DataItem = Petition | Report

export const columns: ColumnDef<DataItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const value = row.getValue("name") as string
      return (
        <Tooltip content={value}>
          <span className="font-medium truncate max-w-[200px] inline-block">
            {value}
          </span>
        </Tooltip>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return <Badge variant="outline">{category}</Badge>
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.getValue("stage") as string
      return (
        <Badge variant={
          stage === "victory" ? "success" :
          stage === "active" ? "default" :
          "secondary"
        }>
          {stage}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string
      return <div>{formatDate(date)}</div>
    },
  },
]