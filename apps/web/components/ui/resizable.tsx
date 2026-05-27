"use client"

import * as React from "react"

function ResizablePanelGroup({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={className}
    >
      {children}
    </div>
  )
}

function ResizablePanel({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={className}
    >
      {children}
    </div>
  )
}

function ResizableHandle() {
  return null
}

export {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
}