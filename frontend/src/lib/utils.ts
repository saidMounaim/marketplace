import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string) {
  if (!fullName) return "SM";
  const nameParts = fullName.trim().split(" ");
  const initials = nameParts.map((part) => part[0].toUpperCase()).join("");
  return initials;
}
