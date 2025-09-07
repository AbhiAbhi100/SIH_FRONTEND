// components/ui/Authbutton.jsx
"use client";
import React from "react";
import Link from "next/link";
import { HoverBorderGradient } from "./hover-border-gradient";

export function Authbutton({ children, href, onClick, containerClassName = "", className = "" }) {
  const content = (
    <HoverBorderGradient
      containerClassName={`rounded-full ${containerClassName}`}
      as={href ? "div" : "button"}
      className={className}
    >
      <div className="flex items-center space-x-2 px-4 py-2">
        <AceternityLogo />
        <span>{children}</span>
      </div>
    </HoverBorderGradient>
  );

  if (href) {
    // ✅ New Next.js Link API — no <a> wrapper needed
    return (
      <Link href={href} aria-label={typeof children === "string" ? children : "auth-button"}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );
}

const AceternityLogo = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 66 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-black dark:text-white"
  >
    <path
      d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696 57.4696"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
