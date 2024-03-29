import { ButtonProps } from "@/components/shad/ui/button";
import { cn } from "@/lib/shad/utils";
import { forwardRef, useRef } from "react";
import { motion } from "framer-motion"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, className, type, onClick }, ref) => {
    const classes = "border-[3px] select-none border-black px-4 py-2 shadow-[6px_4px_0px_1px_rgb(0,0,0)] shadow-primary focus:outline-none hover:border-primary transition-all duration-250"

    return (
      <motion.button
        disabled={disabled}
        className={cn(classes, className)}
        onClick={onClick}
        type={type}
        whileTap={{
          boxShadow: "0px 0px 0px 0px",
          backgroundColor: "#7888ff",
          color: "rgb(255, 255, 255)",
          x: 6,
          y: 4,
          transition: {
            ease: "linear",
            duration: 0.25,
          }
        }}
        ref={ref}
      >
        {children}
      </motion.button>
    )
  })
