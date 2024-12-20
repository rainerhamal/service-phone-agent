"use client";
import Image from "next/image";
import React, { useState } from 'react'

export default function Home ()
{
  const [messages, setMessages] = useState([])
  const [ws, setWs] = useState(null);

  const callAgentHandler = () => {
    const websocket = new WebSocket('ws://localhost:8000/ws');
    setWs(websocket);

    websocket.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };
    websocket.onopen = ()=> {
      websocket.send('Hello, I want to book an appointment!');
    };
  };
  
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
          <button 
            onClick={callAgentHandler} 
            class="flex items-center gap-2 bg-white hover:bg-violet-700 text-black font-bold py-2 px-4 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
            </svg>
            Call Us
          </button>

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
