"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import {FiEdit2} from "react-icons/fi";
import {router} from "next/client";
import {CgFileAdd} from "react-icons/cg";
import { useRouter } from "next/navigation";
const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pathUrl = usePathname();
  const [hideTimeout, setHideTimeout] = useState<number | null>(null);
  const router = useRouter();
  
  const handleMouseEnter = (setOpen: (value: boolean) => void) => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setOpen(true);
  };

  
  const handleMouseLeave = (setOpen: (value: boolean) => void) => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 300);
    setHideTimeout(timeout as unknown as number); 
  };
  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
      <header
          className={`fixed left-0 top-0 z-99999 w-full py-7 ${
              stickyMenu
                  ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
                  : ""
          }`}
      >
        <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
          <div className="flex w-full items-center justify-between xl:w-1/4">
            <a href="/">
              <Image
                  src="/images/logo/logoEESWTitle.png"
                  alt="logo"
                  width={120.03}
                  height={30}
                  className="hidden w-full dark:block"
              />
              <Image
                  src="/images/logo/logoEESTitle.png"
                  alt="logo"
                  width={120.03}
                  height={30}
                  className="w-full dark:hidden"
              />
            </a>

            {/* Hamburger Toggle BTN */}
            <button
                aria-label="hamburger Toggler"
                className="block xl:hidden"
                onClick={() => setNavigationOpen(!navigationOpen)}
            >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                        !navigationOpen ? "!w-full delay-300" : "w-0"
                    }`}
                ></span>
                <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                        !navigationOpen ? "delay-400 !w-full" : "w-0"
                    }`}
                ></span>
                <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                        !navigationOpen ? "!w-full delay-500" : "w-0"
                    }`}
                ></span>
              </span>
            </span>
            </button>
          </div>

          {/* Nav Menu Start */}
          <div
              className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
                  navigationOpen &&
                  "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
              }`}
          >
            <nav>
              <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
                {menuData.map((menuItem, key) => (
                    <li key={key} className={menuItem.submenu && "group relative"}>
                      {menuItem.submenu ? (
                          <>
                            <button
                                onClick={() => setDropdownToggler(!dropdownToggler)}
                                className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary"
                            >
                              {menuItem.title}
                              <span>
                          <svg
                              className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                          >
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                          </svg>
                        </span>
                            </button>
                            <ul
                                className={`dropdown ${
                                    dropdownToggler ? "flex" : ""
                                }`}
                            >
                              {menuItem.submenu.map((item, key) => (
                                  <li key={key} className="hover:text-primary">
                                    <Link href={item.path || "#"}>{item.title}</Link>
                                  </li>
                              ))}
                            </ul>
                          </>
                      ) : (
                          <Link
                              href={`${menuItem.path}`}
                              className={
                                pathUrl === menuItem.path
                                    ? "text-primary hover:text-primary"
                                    : "hover:text-primary"
                              }
                          >
                            {menuItem.title}
                          </Link>
                      )}
                    </li>
                ))}
              </ul>
            </nav>
            <div className="mt-7 flex items-center gap-6 xl:mt-0">
              <button
                  onClick={() => router.push(`/products/add`)}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow hover:bg-gray-300"
              >
                <CgFileAdd size={20}/>

              </button>
            </div>
            <div className="mt-7 flex items-center gap-6 xl:mt-0">
              <ThemeToggler/>

              <Link href="/auth/signup" className="text-primary font-medium">
                Sign up
              </Link>

              <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(setCartOpen)}
                  onMouseLeave={() => handleMouseLeave(setCartOpen)}
              >
                <button className="text-primary font-medium">Basket 🛒</button>
                <div
                    className={`absolute right-0 top-full mt-2 w-80 bg-white p-4 shadow-md dark:bg-gray-800 transition-all duration-300 transform ${
                        cartOpen
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 -translate-y-4 invisible"
                    }`}
                >
                  <p className="text-gray-700 dark:text-gray-300">
                    Ваши товары в корзине:
                  </p>
                  <ul>
                    <li>Товар 1</li>
                    <li>Товар 2</li>
                  </ul>
                </div>
              </div>

              {/* Профиль */}
              <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(setProfileOpen)}
                  onMouseLeave={() => handleMouseLeave(setProfileOpen)}
              >
                <button className="text-primary font-medium">Profile 👤</button>
                <div
                    className={`absolute right-0 top-full mt-2 w-64 bg-white p-4 shadow-md dark:bg-gray-800 transition-all duration-300 transform ${
                        profileOpen
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 -translate-y-4 invisible"
                    }`}
                >
                  <ul>
                    <li>
                      <Link href="/profile/settings">Настройки</Link>
                    </li>
                    <li>
                      <Link href="/profile/account">Личный кабинет</Link>
                    </li>
                    <li>
                      <Link href="/profile/orders">Покупки</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>
  );
};

export default Header;
