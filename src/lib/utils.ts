import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// twMerge will handle any conflicts with classNames from Tailwind in-line classes in JSX
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
