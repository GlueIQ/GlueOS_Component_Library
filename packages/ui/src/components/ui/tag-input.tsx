import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "./badge"
import { Input } from "./input"
import { cn } from "../../lib/utils"

export interface TagInputProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  allowDuplicates?: boolean
  delimiter?: string | RegExp
  suggestions?: string[]
  validate?: (tag: string) => boolean
  inputClassName?: string
  tagClassName?: string
  disabled?: boolean
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value = [],
      onChange,
      placeholder = "Type and press Enter to add tags...",
      maxTags,
      allowDuplicates = false,
      delimiter = ",",
      suggestions = [],
      validate,
      inputClassName,
      tagClassName,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("")
    const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleAddTag = (tag: string) => {
      const trimmedTag = tag.trim()
      if (!trimmedTag) return

      // Check if tag already exists
      if (!allowDuplicates && value.includes(trimmedTag)) {
        setInputValue("")
        return
      }

      // Check max tags limit
      if (maxTags && value.length >= maxTags) {
        setInputValue("")
        return
      }

      // Validate tag
      if (validate && !validate(trimmedTag)) {
        setInputValue("")
        return
      }

      onChange?.([...value, trimmedTag])
      setInputValue("")
      setShowSuggestions(false)
    }

    const handleRemoveTag = (tagToRemove: string) => {
      onChange?.(value.filter((tag) => tag !== tagToRemove))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue) {
        e.preventDefault()
        handleAddTag(inputValue)
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        // Remove last tag on backspace if input is empty
        onChange?.(value.slice(0, -1))
      } else if (e.key === "Escape") {
        setShowSuggestions(false)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value

      // Handle delimiter
      if (typeof delimiter === "string" && newValue.includes(delimiter)) {
        const tags = newValue.split(delimiter)
        tags.slice(0, -1).forEach((tag) => handleAddTag(tag))
        setInputValue(tags[tags.length - 1] || "")
        return
      }

      setInputValue(newValue)

      // Filter suggestions
      if (suggestions.length > 0 && newValue) {
        const filtered = suggestions.filter(
          (suggestion) =>
            suggestion.toLowerCase().includes(newValue.toLowerCase()) &&
            !value.includes(suggestion)
        )
        setFilteredSuggestions(filtered)
        setShowSuggestions(filtered.length > 0)
      } else {
        setShowSuggestions(false)
      }
    }

    const handleSuggestionClick = (suggestion: string) => {
      handleAddTag(suggestion)
      inputRef.current?.focus()
    }

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div
          className={cn(
            "flex flex-wrap gap-2 p-2 rounded-md border border-input bg-background min-h-10",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {value.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                "gap-1 pr-1 py-1",
                tagClassName
              )}
            >
              <span>{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveTag(tag)
                  }}
                  className="rounded-full hover:bg-muted p-0.5 transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (filteredSuggestions.length > 0) {
                setShowSuggestions(true)
              }
            }}
            onBlur={() => {
              // Delay to allow clicking suggestions
              setTimeout(() => setShowSuggestions(false), 200)
            }}
            placeholder={value.length === 0 ? placeholder : ""}
            disabled={disabled || (maxTags ? value.length >= maxTags : false)}
            className={cn(
              "flex-1 border-0 p-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[120px]",
              inputClassName
            )}
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-accent text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {maxTags && (
          <div className="text-xs text-muted-foreground mt-1">
            {value.length}/{maxTags} tags
          </div>
        )}
      </div>
    )
  }
)

TagInput.displayName = "TagInput"

export { TagInput }
