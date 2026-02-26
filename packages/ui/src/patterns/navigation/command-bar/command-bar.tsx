/**
 * CommandBar Pattern
 *
 * A command palette (Cmd+K) for quick actions and navigation.
 * Composed of: Command, Dialog from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

"use client"

import * as React from "react"
import { cn } from "../../../lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../../components/ui/command"
import {
  Dialog,
  DialogContent,
} from "../../../components/ui/dialog"

export interface CommandBarGroup {
  heading: string
  items: CommandItemData[]
}

export interface CommandItemData {
  label: string
  icon?: React.ReactNode
  shortcut?: string
  onSelect?: () => void
}

interface CommandBarProps extends React.ComponentProps<"div"> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  groups?: CommandBarGroup[]
  placeholder?: string
}

export function CommandBar({
  open,
  onOpenChange,
  groups = [],
  placeholder = "Type a command or search...",
  className,
  ...props
}: CommandBarProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isOpen = open ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!isOpen)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen, setOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className={cn("overflow-hidden p-0", className)} {...props}>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {groups.map((group, groupIndex) => (
              <React.Fragment key={group.heading}>
                {groupIndex > 0 && <CommandSeparator />}
                <CommandGroup heading={group.heading}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.label}
                      onSelect={item.onSelect}
                    >
                      {item.icon && (
                        <span className="mr-2">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                          {item.shortcut}
                        </kbd>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
