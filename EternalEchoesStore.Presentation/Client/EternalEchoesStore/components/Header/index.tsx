"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useEffect, useRef, useState} from "react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


  const cartRef = useRef(null);
  const profileRef = useRef(null);

  const pathUrl = usePathname();

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };
  const handleCartClick = () => {
    setCartOpen(!cartOpen);
    setProfileOpen(false); // Закрыть окно профиля при открытии корзины
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    setCartOpen(false); // Закрыть окно корзины при открытии профиля
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
          cartRef.current &&
          !cartRef.current.contains(event.target as Node) &&
          profileRef.current &&
          !profileRef.current.contains(event.target as Node)
      ) {
        setCartOpen(false);
        setProfileOpen(false);
      }
    };

    // Добавляем слушатель кликов
    document.addEventListener("mousedown", handleOutsideClick);

    // Убираем слушатель при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [cartRef, profileRef]);

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

            <button
                aria-label="hamburger Toggler"
                className="block xl:hidden"
                onClick={() => setNavigationOpen(!navigationOpen)}
            >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              {/* ... */}
            </span>
            </button>
          </div>

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
                            {/* ... */}
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
              <ThemeToggler />

              <Link href="/register" className="text-primary font-medium">
                Sign up
              </Link>

              <div className="relative" ref={cartRef}>
                <button
                    className="text-primary font-medium"
                    onClick={handleCartClick}
                >
                  Basket 🛒
                </button>
                {cartOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white p-4 shadow-md dark:bg-gray-800">
                      <p className="text-gray-700 dark:text-gray-300">
                        Ваши товары в корзине:
                      </p>
                      <ul>
                        <li>Товар 1</li>
                        <li>Товар 2</li>
                      </ul>
                    </div>
                )}
              </div>

              <div className="relative" ref={profileRef}>
                <button
                    className="text-primary font-medium"
                    onClick={handleProfileClick}
                >
                  Profile 👤
                </button>
                {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white p-4 shadow-md dark:bg-gray-800">
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
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
