import { clsx, type ClassValue } from "clsx";
import { Bolt, LayoutDashboard, Library, User } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SIDE_BAR_ITEMS = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Request",
    href: "/request",
    icon: LayoutDashboard,
    
    
  },
  {
    label: "Users",
    href: "/users",
    icon: User,
  },
  {
    label: "course",
    href: "/course",
    icon: Library,
  },
  {
    label: "settings",
    href: "/settings",
    icon: Bolt,
  },
];


export const CARD_COLORS = [
  ["#b73bb1","#ef4238"],
  ["#24b6d0","#2f41e3"],
  ["#5f5682","#9c365a"],
  ["#3df759","#59cfdc"],
  ["#f73d36","#b138a8"],
]