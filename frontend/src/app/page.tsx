"use client";
import Image from "next/image";
import React, { useState } from 'react'
import CallButton from "@/components/CallButton";

export default function Home ()
{
  const [messages, setMessages] = useState([])
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="vercel.svg"
          alt="Next.js logo"
          width={ 400 }
          height={ 50 }
          priority
        />
        <p className="items-center text-sm text-center sm:text-center font-[family-name:var(--font-geist-mono)]">
          Book an Appointnment with us Now.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <CallButton />

          <div>
            {messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
