"use client"
import { createContext, ReactNode, useState } from "react"

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
})

export function ThemeProvider() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light"
  setTheme(newTheme)

  if (newTheme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}