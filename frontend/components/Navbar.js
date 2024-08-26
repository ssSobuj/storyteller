"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";

function Navbar() {
  const { isLoggedIn, user, logoutUser } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="navbar">
      <nav className="navbar-wrapper">
        <a className="navbar__logo" href="#home">
          <img src="/images/logo/logo.png" alt="Logo" />
        </a>
        <div className="navbar__list" id="navbarNav">
          <ul className="navbar__nav">
            <li className="navbar__item">
              <Link className="navbar__link" href="/">
                Home
              </Link>
            </li>
            <li className="navbar__item">
              <Link className="navbar__link" href="/story/slug">
                Story
              </Link>
            </li>
            <li className="navbar__item">
              <Link className="navbar__link" href="/create-story">
                Create Story
              </Link>
            </li>
          </ul>
          <div className="navbar__get-started">
            {user ? (
              <>
                <Link className="button me-2" href="/">
                  {user?.username}
                </Link>
                <button onClick={handleLogout} className="button">
                  Logout
                </button>
              </>
            ) : (
              <Link className="button" href="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
