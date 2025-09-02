"use client";
import Logo from "../ui/Logo";
import Link from "next/link";

import { FaUserAlt } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Search from "../ui/Search";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isSearchModal);
  return (
    <div className="h-[5.5rem] bg-secondary  justify-center items-center">
      <div className="container mx-auto flex justify-between items-center text-white h-full">
        <div>
          <Logo />
        </div>
        <nav className="hidden sm:block">
          <ul className="flex justify-center items-center space-x-4">
            <li className="px-[5px] py-[10px] uppercase hover:text-primary gap-x-2 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary gap-x-2 cursor-pointer">
              <Link href="/menu">Menu</Link>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary gap-x-2 cursor-pointer">
              <Link href="/about">About</Link>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary gap-x-2 cursor-pointer">
              <Link href="/reservation">Book Table</Link>
            </li>
          </ul>
        </nav>
        <div className="mx-2 ">
          <div className="flex items-center gap-x-4">
            <Link href="/auth" className="hover:text-primary transition-all">
              <FaUserAlt />
            </Link>
            <Link href="/cart" className="hover:text-primary transition-all">
              <HiShoppingCart />
            </Link>
            <button
              onClick={() => setIsSearchModal(!isSearchModal)}
              className="hover:text-primary transition-all"
            >
              <FaSearch />
            </button>
            <button className="btn-primary hidden sm:block">
              Order Online
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden hover:text-primary transition-all"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu - Visible on small screens */}
      {isMenuOpen && (
        <nav className="bg-white text-black sm:hidden w-full absolute left-0 top-[5.5rem] z-50">
          <div className="flex justify-end p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-black hover:text-primary transition-all"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <ul className="flex flex-col gap-4 p-4 uppercase">
            <li className="px-3 py-2 hover:text-primary cursor-pointer">
              <a href="">Home</a>
            </li>
            <li className="px-3 py-2 hover:text-primary cursor-pointer">
              <a href="">Menu</a>
            </li>
            <li className="px-3 py-2 hover:text-primary cursor-pointer">
              <a href="">About</a>
            </li>
            <li className="px-3 py-2 hover:text-primary cursor-pointer">
              <a href="">Book Table</a>
            </li>
          </ul>
        </nav>
      )}

      {isSearchModal && <Search setIsSearchModal={setIsSearchModal}></Search>}
    </div>
  );
};

export default Header;
