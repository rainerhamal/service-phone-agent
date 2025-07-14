import React, { useEffect, useState } from 'react'
import { RetellWebClient } from "retell-client-js-sdk";
import { useCallback } from 'react';
// import Retell from 'retell-sdk';

const agentId = process.env.NEXT_PUBLIC_AGENT_ID
interface RegisterCallResponse
    {
        access_token: string;
    }
const retellWebClient = new RetellWebClient();

export default function CallButton ()
{
    const [ isCalling, setIsCalling ] = useState( false );

    useEffect( () =>
    {
        retellWebClient.on( "call_started", () =>
        {
            console.log( "call started" );
        } );

        retellWebClient.on( "call_ended", () =>
        {
            console.log( "call ended" );
            setIsCalling( false );
        } );

        retellWebClient.on( "agent_start_talking", () =>
        {
            console.log( "agent_start_talking" );
        } );

        retellWebClient.on( "agent_stop_talking", () =>
        {
            console.log( "agent_stop_talking" );
        } );

        retellWebClient.on( "audio", ( audio ) =>
        {
            console.log(audio);
        } );

        retellWebClient.on( "update", ( update ) =>
        {
            console.log(update);
        } );

        retellWebClient.on( "metadata", ( metadata ) =>
        {
            console.log(metadata);
        } );

        retellWebClient.on( "error", ( error ) =>
        {
            console.error( "An error occurred:", error );
            // Stop the call
            retellWebClient.stopCall();
        } );
        return () => {
            retellWebClient.off("call_started");
            retellWebClient.off("call_ended");
            retellWebClient.off("agent_start_talking");
            retellWebClient.off("agent_stop_talking");
            retellWebClient.off("audio");
            retellWebClient.off("update");
            retellWebClient.off("metadata");
            retellWebClient.off("error");
        }
    }, [] );

    const toggleConversation = useCallback(async () =>
    {
        if ( isCalling )
        {
            try {
                await retellWebClient.stopCall();
                setIsCalling(false);
            } catch (error) {
                console.error("Failed to stop call:", error);
            }
            
        } else
        {
            console.log("Agent ID:", agentId);
            if (!agentId) {
                console.error("Failed to start call: agentId is undefined.");
                return;
            }
            const registerCallResponse = await registerCall(agentId);
            if (registerCallResponse?.access_token) {
                retellWebClient
                    .startCall({
                        accessToken: registerCallResponse.access_token,
                    })
                    .catch(console.error);
                setIsCalling(true); // Update button to "Stop" when conversation starts
            } else {
                console.error("Failed to start call: No access token received.");
            }
        }
    }, [ isCalling, agentId ]);

    const registerCall = useCallback(async (agentId: string) =>
    {
        console.log("Agent ID in registerCall:", agentId);
        try
        {
            const response = await fetch( 'http://localhost:8000/create-web-call', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify( { 
                    agent_id: agentId,
                 } ),
            } );
            if ( !response.ok )
            {
                throw new Error( `Error: ${ response.status }` );
            }
            const data: RegisterCallResponse = await response.json();
            return data;
        } catch ( err )
        {
            console.log( err );
            throw new Error(String(err));
            // return null;
        }
    },[]);

    return (
        <div>
            <button
                onClick={ toggleConversation }
                className="flex items-center gap-2 bg-white hover:bg-violet-700 text-black font-bold py-2 px-4 rounded"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                </svg>
                {isCalling ? "End Call" : "Make a Call"}
            </button>
        </div>
    )
}



// function useCallback ( arg0: ( agentId: string ) => Promise<RegisterCallResponse>, arg1: never[] )
// {
//     throw new Error( 'Function not implemented.' );
// }

