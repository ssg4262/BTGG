import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/theme/ThemeProvider.tsx'

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useTheme()

    return (
        <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setIsDark(!isDark)}
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}