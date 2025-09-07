// app/page.js
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import Link from "next/link";
import { Authbutton } from "@/components/ui/Authbutton";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black">
      {/* <main className="min-h-screen flex items-center justify-center px-4"></main> */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 sm:px-6 md:px-12">
        {/* Heading */}
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-3xl md:text-5xl lg:text-7xl:text-2xl  font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Your Farming Companion, <br /> Smart Krishi{" "}
        </h2>
        {/* Subheading */}
        <p className="max-w-xl mx-auto text-sm md:text-lg:px-2 text-neutral-700 dark:text-neutral-400 text-center px-2">
          {" "}
          Get the best crop recommendations, weather insights, and expert
          farming tips. Empowering farmers with data-driven decisions, totally
          free.{" "}
        </p>
        {/* Buttons: Login and Register side-by-side */}
        <div className="mt-6 flex flex-row items-center justify-center space-x-4 z-20">
          <Authbutton
            href="/login"
            containerClassName="rounded-full  transition duration-300 transform hover:scale-105 hover:shadow-lg "
            className="bg-white text-black dark:bg-black dark:text-white px-6 py-2 font-medium"
          >
            Login{" "}
          </Authbutton>
          <Authbutton
            href="/register"
            containerClassName="rounded-full"
            className="bg-transparent border border-neutral-300 dark:border-neutral-600 text-black dark:text-white px-4 sm:px-6 md:px-12"
          >
            {" "}
            Register
          </Authbutton>
        </div>
      </BackgroundLines>
    </main>
  );
}


