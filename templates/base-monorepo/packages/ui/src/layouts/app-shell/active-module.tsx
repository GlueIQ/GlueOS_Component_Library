"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Module {
  name: string
  description: string
}

const defaultModule: Module = {
  name: "Launchpad",
  description: "Platform Home",
}

const ActiveModuleContext = createContext<{
  activeModule: Module
  setActiveModule: (mod: Module) => void
}>({
  activeModule: defaultModule,
  setActiveModule: () => {},
})

export function ActiveModuleProvider({ children }: { children: ReactNode }) {
  const [activeModule, setActiveModule] = useState<Module>(defaultModule)

  return (
    <ActiveModuleContext.Provider value={{ activeModule, setActiveModule }}>
      {children}
    </ActiveModuleContext.Provider>
  )
}

export function useActiveModule() {
  return useContext(ActiveModuleContext)
}
