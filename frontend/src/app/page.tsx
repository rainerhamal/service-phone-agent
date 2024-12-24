"use client";
import Image from "next/image";
import React, { useState } from 'react'
import CallButton from "@/components/CallButton";

export default function Home ()
{
  const [messages, setMessages] = useState([])
  // const [ws, setWs] = useState(null);

  // const callAgentHandler = () => {
  //   // const websocket = new WebSocket('ws://localhost:8000/ws');
  //   // setWs(websocket);

  //   // websocket.onmessage = (e) => {
  //   //   setMessages((prev) => [...prev, e.data]);
  //   // };
  //   // websocket.onopen = ()=> {
  //   //   websocket.send('Hello, I want to book an appointment!');
  //   // };
  //   alert("Button")
  // };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/1F-TCB-Horizontal-Logo-Revised-Premier-Salon-1.png"
          alt="Next.js logo"
          width={ 400 }
          height={ 50 }
          priority
        />
        <p className="items-center text-sm text-center sm:text-center font-[family-name:var(--font-geist-mono)]">
          Book an Appoitnment with us Now.
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
