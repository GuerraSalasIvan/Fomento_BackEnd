'use client'

export default function DarkTitle({text}){
    return(
        <div className="m-2">
            <h1 className="text-3xl text-menu-bg-800 font-bold">{text}</h1>
        </div>
    );
}