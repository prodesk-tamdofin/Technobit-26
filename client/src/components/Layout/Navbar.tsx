"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { FiPower, FiUser } from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
import { IoHomeOutline, IoCalendarOutline, IoImagesOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import ExtendedColors from "../../../color.config";
import useUser from "@/hooks/useUser";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { reqImgWrapper } from "@/api/requests";
import { logOut } from "@/api/authentication";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import useSettings from "@/hooks/useSettings";

let scrollTop = 0;

// Glass-themed Nav Link button
const IconNavLink = ({
  href,
  icon,
  label,
  isImage,
  imageSrc,
}: {
  href: string;
  icon?: React.ReactNode;
  label: string;
  isImage?: boolean;
  imageSrc?: string;
}) => {
  const path = usePathname();
  const isActive = path === href;
  
  return (
    <li>
      <Link
        href={href}
        className={`relative flex flex-row items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 group overflow-hidden backdrop-blur-md
          ${isActive 
            ? "bg-gradient-to-br from-primary-350/40 to-primary-150/20 border border-primary-350/60 text-white shadow-lg shadow-primary-350/20" 
            : "bg-white/[0.08] border border-white/[0.15] text-white/80 hover:bg-white/[0.12] hover:border-white/25 hover:text-white hover:shadow-lg hover:shadow-primary-350/10"
          }`}
        style={{
          boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.3), inset 0 1px 1px rgba(255,255,255,0.1)' : 'inset 0 1px 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Glass highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        {isImage && imageSrc ? (
          <img 
            src={imageSrc} 
            alt={label} 
            className="relative z-10 w-4 h-4 object-contain grayscale brightness-200 group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <span className="relative z-10 text-sm group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>
        )}
        <span className="relative z-10 text-xs font-medium tracking-wide">{label}</span>
      </Link>
    </li>
  );
};

const NavLink = ({
  href,
  children,
  className,
  classNameLi,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  classNameLi?: string;
}) => {
  const path = usePathname();
  return (
    <li className={classNameLi}>
      <Link
        href={href}
        className={
          "block rounded-full border-gray-700 px-3 py-2 text-white hover:bg-primary-450 hover:text-white xl:p-0 xl:hover:bg-transparent xl:hover:text-primary-450 xl:hover:text-secondary-200/90 " +
          (path === href ? "text-secondary-200/90" : "text-white") +
          " " +
          className
        }
      >
        {children}
      </Link>
    </li>
  );
};

const ProfileLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        href={href}
        className="block px-4 py-2 text-sm text-white/80 hover:bg-primary-400 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const path = usePathname();

  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [userExpanded, setUserExpanded] = useState(false);
  const [showLoader, setLoader] = useState(true);
  const animationDuration = 1.5;
  const Router = useRouter();
  const [user] = useUser(false, [path]);
  // cmnt
  const navRef = useRef<HTMLDivElement>(null);
  const navItem = useRef<HTMLDivElement>(null);
  const [config] = useSettings();

  useEffect(() => {
    const handleClickOutside: EventListener = (e) => {
      if (
        navRef.current &&
        e.target instanceof Node &&
        !navRef.current.contains(e.target)
      ) {
        setExpanded(false);
        setUserExpanded(false);
      }
    };

    const scrollHandler = () => {
      if (navRef.current && navItem.current) {
        if (window.scrollY < 15) {
          // At top - completely transparent, no glass effect
          navRef.current.style.backgroundColor = "transparent";
          navRef.current.style.backdropFilter = "none";
          navRef.current.style.border = "1px solid transparent";
          navRef.current.style.boxShadow = "none";
        } else if (scrollTop - window.scrollY > 0 || window.scrollY > 15) {
          // Scrolled down - glass effect with more transparency
          navRef.current.style.backgroundColor = "rgba(11, 13, 18, 0.4)";
          navRef.current.style.backdropFilter = "blur(20px)";
          navRef.current.style.border = "1px solid rgba(255, 255, 255, 0.06)";
          navRef.current.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
        }
        scrollTop = window.scrollY;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    window.addEventListener("scroll", scrollHandler);

    setMounted(true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  if (!mounted)
    return (
      <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-950">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return (
    <>
      {path !== "/download-admit" ? (
        <nav className="container-c fixed left-1/2 top-0 z-[100] -translate-x-1/2 transition-all">
          <div
            ref={navRef}
            className={`mt-2 flex max-h-24 w-full flex-wrap items-center justify-between rounded-2xl py-3 px-4 transition-all duration-300`}
            style={{
              backgroundColor: "transparent",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              border: "1px solid transparent",
              boxShadow: "none",
            }}
          >
            <Link
              href="/"
              className="flex grow basis-0 items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/ITC_LOGO.png"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                alt="Technobit'26 Logo"
              />
            </Link>
            <div className="relative flex items-center justify-end space-x-3 xl:order-2 xl:grow xl:basis-0 xl:space-x-0 rtl:space-x-reverse">
              {user ? (
                <button
                  onClick={() => {
                    setUserExpanded(!userExpanded);
                    setExpanded(false);
                  }}
                  type="button"
                  className="rounded-full border border-primary-200 p-1 transition hover:border-primary-400"
                >
                  {reqImgWrapper(user.image) ? (
                    <img
                      className="z-10 h-[42px] w-[42px] rounded-full hover:brightness-75 object-cover"
                      src={reqImgWrapper(user.image)!}
                      alt={user.fullName || "User"}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <span className={`z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-primary-400 text-white ${reqImgWrapper(user.image) ? "hidden" : ""}`}>
                    <FaUser className="h-4 w-4" />
                  </span>
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    type="button"
                    className="before:ease Share bold group relative flex items-center overflow-hidden py-2 pl-4 pr-4 text-center text-sm font-medium text-white hover:text-primary-150 focus:outline-none focus:ring-4 xl:px-4"
                  >
                    <span className="relative z-10 mr-1 hidden border-b-2 border-white/40 transition group-hover:border-primary-150/40 xxsm:inline">
                      LOGIN
                    </span>
                    <LuLogIn className="z-10 h-5 w-5 opacity-75 transition group-hover:translate-x-1 sm:h-4 sm:w-4 xl:mr-2" />
                  </Link>
                  <Link
                    href="/register"
                    type="button"
                    className="before:ease Share group relative hidden items-center overflow-hidden rounded-full border border-primary-400 bg-primary-400 px-4 py-2 text-center text-sm font-medium text-white/85 shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-secondary-700 before:transition-all before:duration-300 hover:border-primary-350 hover:text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-primary-300 md:flex"
                  >
                    <span className="relative z-10 mr-1 hidden translate-x-1 transition sm:inline">
                      REGISTER
                    </span>
                    <LuLogIn className="z-10 h-5 w-5 translate-x-1 opacity-50 transition group-hover:translate-x-2.5 sm:h-4 sm:w-4 md:mr-2" />
                  </Link>
                </>
              )}

              {user && (
                <div
                  className={
                    "absolute right-0 top-7 z-50 my-4 origin-top-right list-none divide-y divide-white/10 rounded-xl text-base shadow-2xl transition backdrop-blur-xl " +
                    (userExpanded ? "scale-100" : "pointer-events-none scale-0")
                  }
                  style={{
                    backgroundColor: "rgba(11, 13, 18, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  }}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-white">
                      {user.fullName}
                    </span>
                    <span className="block truncate text-sm text-white/60">
                      {user.email}
                    </span>
                  </div>
                  <ul
                    className="py-2"
                    aria-labelledby="user-menu-button"
                    onClick={() => setUserExpanded(false)}
                  >
                    <ProfileLink href="/profile">
                      {" "}
                      <FiUser className="-mt-1 mr-2 inline align-middle" />
                      Profile
                    </ProfileLink>
                    <li>
                      <button
                        onClick={async () => {
                          await logOut();
                          toast.success("Sign Out Successfull");
                          Router.push("/login");
                          Router.refresh();
                        }}
                        className="block w-full px-4 py-2 text-start text-sm text-white/80 hover:bg-primary-400 hover:text-white"
                      >
                        <FiPower className="-mt-1 mr-2 inline align-middle" />
                        Sign Out
                      </button>
                    </li>{" "}
                  </ul>
                </div>
              )}

              <button
                onClick={() => {
                  setExpanded(!expanded);
                  setUserExpanded(false);
                }}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-150/20 p-2 text-sm text-white/40 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-gray-200 xl:hidden"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!expanded ? (
                  <RxHamburgerMenu className={"h-5 w-5"}></RxHamburgerMenu>
                ) : (
                  <RxCross1 className={"h-5 w-5"} />
                )}
              </button>
            </div>
            <div
              ref={navItem}
              style={{ transformOrigin: "top" }}
              className={`absolute right-0 top-[104%] max-w-[450px] origin-top-right items-center justify-between rounded-xl backdrop-blur-xl bg-black/40 border border-white/10 px-14 text-white shadow-2xl transition xl:static xl:max-w-none xl:rounded-2xl xl:py-2 xl:px-3 xl:bg-white/[0.05] xl:backdrop-blur-lg xl:border-white/[0.1] xl:shadow-lg ${
                expanded
                  ? "scale-100"
                  : "pointer-events-none scale-0 xl:pointer-events-auto"
              } w-full xl:order-1 xl:flex xl:w-auto xl:scale-100`}
              id="navbar-sticky"
            >
              <ul
                onClick={() => {
                  setUserExpanded(false);
                  setExpanded(false);
                }}
                className="flex flex-col space-y-2 rounded-lg p-4 text-center font-medium xl:flex-row xl:space-x-3 xl:space-y-0 xl:p-0 rtl:space-x-reverse"
              >
                <IconNavLink 
                  href="/" 
                  icon={<IoHomeOutline />} 
                  label="Home" 
                />
                <IconNavLink 
                  href="/itc" 
                  isImage={true}
                  imageSrc="/ITC_LOGO.png"
                  label="ITC" 
                />
                <IconNavLink 
                  href="/events" 
                  icon={<MdOutlineCategory />} 
                  label="Segments" 
                />
                <IconNavLink 
                  href="/gallery" 
                  icon={<IoImagesOutline />} 
                  label="Gallery" 
                />
                {config?.showSchedule ? (
                  <IconNavLink 
                    href="/schedule" 
                    icon={<IoCalendarOutline />} 
                    label="Schedule" 
                  />
                ) : null}
                {!user && (
                  <NavLink
                    className="flex items-center justify-center bg-primary-350 hover:bg-primary-450"
                    classNameLi="md:hidden"
                    href="/register"
                  >
                    Register
                    <LuLogIn className="z-10 h-5 w-5 translate-x-1 opacity-50 transition group-hover:translate-x-2.5 sm:h-4 sm:w-4 xl:mr-2" />
                  </NavLink>
                )}
              </ul>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
