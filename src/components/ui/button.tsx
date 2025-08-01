import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border border-primary dark:border-none bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_1px_2px_4px_0_rgba(255,255,255,0.4),_inset_0_-2px_4px_1px_rgba(0,0,0,0.4)] after:pointer-events-none",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_1px_2px_4px_0_rgba(255,255,255,0.1),_inset_0_-2px_4px_1px_rgba(0,0,0,0.1)] after:pointer-events-none",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_1px_2px_4px_0_rgba(255,255,255,0.1),_inset_0_-2px_4px_1px_rgba(0,0,0,0.1)] after:pointer-events-none",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
