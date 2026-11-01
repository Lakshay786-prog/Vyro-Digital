"use client";
import { useEffect, useRef, useState } from "react";
export function Reveal({children,className=""}:{children:React.ReactNode,className?:string}) {
 const ref=useRef<HTMLDivElement>(null); const [shown,setShown]=useState(false);
 useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setShown(true);io.disconnect();}},{threshold:.12});io.observe(el);return()=>io.disconnect();},[]);
 return <div ref={ref} className={`reveal ${shown?"is-visible":""} ${className}`}>{children}</div>;
}