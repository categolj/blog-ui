import React, {useEffect, useState} from 'react'
import {useTheme} from 'next-themes'
import {HalfMoon, SunLight} from 'iconoir-react'

export default function ThemeButton() {
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    return (
        <>
            <button
                aria-label="DarkModeToggle"
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {mounted && <>{theme === 'dark' ? <HalfMoon/> : <SunLight/>}</>}
            </button>
        </>
    );
}
