import { useTheme } from '@/providers/theme/ThemeProvider.tsx'
import clsx from 'clsx'

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useTheme()

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className={clsx(
                'w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300',
                isDark ? 'bg-gray-700' : 'bg-gray-300'
            )}
        >
            <div
                className={clsx(
                    'w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300',
                    isDark ? 'translate-x-0' : 'translate-x-6'
                )}
            >
            </div>
        </button>
    )
}
