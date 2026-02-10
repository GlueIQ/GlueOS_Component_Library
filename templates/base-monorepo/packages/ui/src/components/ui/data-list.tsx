"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type DataListContextValue = {
  orientation: "vertical" | "horizontal"
  size: "sm" | "default" | "lg"
}

const DataListContext = React.createContext<DataListContextValue>({
  orientation: "vertical",
  size: "default",
})

function useDataListContext() {
  return React.useContext(DataListContext)
}

// ---------------------------------------------------------------------------
// DataList (root wrapper — renders <dl>)
// ---------------------------------------------------------------------------

const dataListVariants = cva("grid", {
  variants: {
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-cols-[auto_1fr]",
    },
    size: {
      sm: "text-sm gap-2",
      default: "text-base gap-4",
      lg: "text-lg gap-6",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "default",
  },
})

type DataListProps = React.ComponentPropsWithoutRef<"dl"> &
  VariantProps<typeof dataListVariants>

const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  ({ className, orientation = "vertical", size = "default", ...props }, ref) => {
    return (
      <DataListContext.Provider
        value={{
          orientation: orientation ?? "vertical",
          size: size ?? "default",
        }}
      >
        <dl
          ref={ref}
          data-slot="data-list"
          data-orientation={orientation}
          data-size={size}
          className={cn(dataListVariants({ orientation, size, className }))}
          {...props}
        />
      </DataListContext.Provider>
    )
  },
)
DataList.displayName = "DataList"

// ---------------------------------------------------------------------------
// DataListItem — wraps a single key-value pair (renders <div>)
// ---------------------------------------------------------------------------

type DataListItemProps = React.ComponentPropsWithoutRef<"div">

const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useDataListContext()

    return (
      <div
        ref={ref}
        data-slot="data-list-item"
        className={cn(
          orientation === "vertical" ? "flex flex-col gap-1" : "contents",
          className,
        )}
        {...props}
      />
    )
  },
)
DataListItem.displayName = "DataListItem"

// ---------------------------------------------------------------------------
// DataListTerm — the key / label (renders <dt>)
// ---------------------------------------------------------------------------

type DataListTermProps = React.ComponentPropsWithoutRef<"dt">

const DataListTerm = React.forwardRef<HTMLElement, DataListTermProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useDataListContext()

    return (
      <dt
        ref={ref}
        data-slot="data-list-term"
        className={cn(
          "font-medium text-foreground",
          orientation === "horizontal" && "text-muted-foreground font-normal",
          className,
        )}
        {...props}
      />
    )
  },
)
DataListTerm.displayName = "DataListTerm"

// ---------------------------------------------------------------------------
// DataListDetail — the value (renders <dd>)
// ---------------------------------------------------------------------------

type DataListDetailProps = React.ComponentPropsWithoutRef<"dd">

const DataListDetail = React.forwardRef<HTMLElement, DataListDetailProps>(
  ({ className, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        data-slot="data-list-detail"
        className={cn("text-foreground", className)}
        {...props}
      />
    )
  },
)
DataListDetail.displayName = "DataListDetail"

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  DataList,
  DataListItem,
  DataListTerm,
  DataListDetail,
  dataListVariants,
  type DataListProps,
  type DataListItemProps,
  type DataListTermProps,
  type DataListDetailProps,
}
