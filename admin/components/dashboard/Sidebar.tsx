"use client";

import { cn, SIDE_BAR_ITEMS } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="w-70 h-full bg-light-400">
      <aside className="py-6 h-full">
        <div className="flex flex-col justify-start items-start gap-6">
          {SIDE_BAR_ITEMS?.map((item, index) => {
            return <Item pathname={pathname} {...item} key={index} />;
          })}
        </div>
      </aside>
    </section>
  );
};

const Item = ({
  pathname,
  href,
  label,
  icon: Icon,
}: {
  pathname: string;
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "w-full relative flex justify-start items-center px-4 py-4 gap-3 group hover:bg-brand transition-all duration-300 hover:transition-all hover:duration-300 rounded-xl text-xl text-gray-900 font-semibold hover:text-light-400 ",
        pathname === href && "bg-brand text-light-400",
      )}
    >
      <Icon
        className={cn(
          "text-xl text-gray-900 font-semibold group-hover:text-light-400  transition-all duration-300 group-hover:transition-all group-hover:duration-300",
          pathname === href && "text-light-400",
        )}
      />
      {label}
    </Link>
  );
};

export default Sidebar;
