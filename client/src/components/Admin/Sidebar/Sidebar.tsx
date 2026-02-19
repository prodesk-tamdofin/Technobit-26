"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsPeople, BsCreditCard, BsPersonPlus, BsDownload } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";
import { MdEventAvailable, MdPayment } from "react-icons/md";

const SideLink = ({
  href,
  children,
  className,
  classNameLi,
  label,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  classNameLi?: string;
  label: string;
}) => {
  const path = usePathname();
  const active = path === href;
  return (
    <li className={classNameLi + " " + ""}>
      <Link
        href={href}
        className={`group relative grid h-10 w-10 place-items-center rounded-full text-3xl text-white/70 hover:text-white ${active ? "bg-primary-200/20" : ""}`}
      >
        {children}
        <div className="absolute -top-[40%] left-[120%] z-30 grid h-[60px] origin-bottom scale-0 place-items-center rounded-lg bg-primary-550 p-2 px-4 text-center text-sm text-white/75 transition group-hover:scale-100">
          {label}
        </div>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="mt-8 min-h-[80vh] w-[50px] shrink-0 basis-[50px] rounded-full bg-gradient-to-b from-primary-550 to-secondary-600 py-1">
      <ul className="flex flex-col items-center gap-2">
        <SideLink href="/safiq/" label={"Dashboard"}>
          <IoIosStats />
        </SideLink>
        <SideLink href="/safiq/events" label={"Events"}>
          <RiDashboardFill />
        </SideLink>
        <SideLink href="/safiq/registered" label={"Registered"}>
          <BsPersonPlus />
        </SideLink>
        <SideLink href="/safiq/participants" label={"Registrations"}>
          <MdEventAvailable />
        </SideLink>
        <SideLink href="/safiq/payments" label={"Payments"}>
          <MdPayment />
        </SideLink>
        <SideLink href="/safiq/create-user/solo" label={"Add Participant"}>
          <FaPlusCircle />
        </SideLink>
        <SideLink href="/safiq/csv" label={"Download CSV"}>
          <BsDownload />
        </SideLink>
      </ul>
    </aside>
  );
};

export default Sidebar;
