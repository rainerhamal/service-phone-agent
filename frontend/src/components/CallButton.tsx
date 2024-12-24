import React, { use, useState } from 'react'

export default function CallButton ()
{
    const [ status, setStatus ] = useState( 'idle' );

    const startCall = async () =>
    {
        alert("Button clicked!");

        setStatus( 'calling' );
        const response = await fetch( 'http://localhost:8000/api/start-call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { caller_id: '123', receiver_id: 456, message: "Hello" } )
        } );
        if ( response.ok )
        {
            setStatus( 'connected' );
        } else
        {
            setStatus( 'failed' )
        }
    };

    return (
        <div>
            <button
                onClick={ startCall }
                class="flex items-center gap-2 bg-white hover:bg-violet-700 text-black font-bold py-2 px-4 rounded"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                </svg>
                Call Us
            </button>
        </div>
    )
}



