import React, { ReactNode } from "react";
// import Image from "next/image";
import { cn } from "cn"

export function TextBanner({
  title,
  description,
  image,
  children,
}: {
  title: string;
  description: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <section className={cn(
        "relative flex items-center justify-center p-6 sm:p-12 bg-linear-to-r overflow-hidden rounded-2xl",
        image ? "min-h-80" : "min-h-80 from-professional-main to-professional-sub",
      )}>
        {image && (
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="X"
              src={image}
              // fill
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}
        <div className="relative z-10 w-full max-w-3xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              {title}
            </h2>
            <p className="text-lg text-slate-100 max-w-xl mx-auto">
              {description}
            </p>
          </div>
          {children ? children : null}
        </div>
        {/*<div className="flex flex-col gap-6 text-center">*/}
        {/*  <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">{title}</h2>*/}
        {/*  <p className="text-lg text-slate-100 max-w-xl mx-auto">*/}
        {/*    {description}*/}
        {/*  </p>*/}
        {/*</div>*/}
        {/*<div className="absolute inset-0 bg-black/40"></div>*/}
      </section>
    </>
  )
}
