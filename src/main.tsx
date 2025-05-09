import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import '@/assets/styles/common/common.css'
import '@/assets/styles/font/font.css'
import { ThemeProvider } from './providers/theme/ThemeProvider.tsx'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RecoilRoot>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </RecoilRoot>
    </React.StrictMode>
)
