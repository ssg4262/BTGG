import { useEffect, useState } from 'react'

export function useDarkMode(): [boolean, (value: boolean) => void] {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
    })

    useEffect(() => {
        const html = document.documentElement
        if (isDark) {
            html.classList.add('dark')
            localStorage.theme = 'dark'
        } else {
            html.classList.remove('dark')
            localStorage.theme = 'light'
        }
    }, [isDark])

    return [isDark, setIsDark]
}