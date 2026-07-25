"use client"

import React, { ReactNode, useEffect } from "react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { HeaderProps } from "@/lib/utils/interface";
// import { NavElement } from "@/components/dashboard/nav-element"
// import { Breadcrumbar } from "@/components/layout/breadcrumbar"

export function Dashbar({ top, bottom, left, right, user, auth, nav }: HeaderProps) {
  return (
    <>
      <header className="flex h-14 shrink-0 border-b items-center gap-2 ease-linear">
        <div className="flex flex-1 items-center justify-between gap-2 px-6">
          <div className="container flex h-14 items-center gap-2 md:gap-4">
            {left}
            {/*<Separator*/}
            {/*  orientation="vertical"*/}
            {/*  className="mr-2 data-[orientation=vertical]:h-4"*/}
            {/*/>*/}
            {/*<Breadcrumbar />*/}
          </div>
          <div className="items-center">
            <div className="ml-auto flex items-center space-x-2">
              {right}
              {/*<NavElement user={null} />*/}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
