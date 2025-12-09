import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-[#FFB900] text-[#1A1A1A] hover:bg-[#FF9500] active:bg-[#FF8000] active:scale-[0.98] shadow-md hover:shadow-lg font-semibold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 active:scale-[0.98] shadow-sm hover:shadow-md",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-[#FFB900] active:border-[#FF9500] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80 active:scale-[0.98]",
        link: "text-[#FFB900] underline-offset-4 hover:underline active:text-[#FF9500]",
        ai: "bg-gradient-to-r from-[#FFB900] to-[#FFA500] text-[#1A1A1A] rounded-xl shadow-lg hover:scale-[1.03] hover:shadow-xl active:scale-[1.01] font-semibold"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
