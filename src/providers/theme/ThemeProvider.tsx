import React, { createContext, useContext } from 'react'
import { useDarkMode } from '@/hooks/useDarkMode.ts'

const ThemeContext = createContext<ReturnType<typeof useDarkMode> | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const darkMode = useDarkMode()
    return <ThemeContext.Provider value={darkMode}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('ThemeProvider 에러')
    return context
}