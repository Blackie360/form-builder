"use client"
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if(!mounted) return null; // avoid rehydartioon errors
  return (
   <Tabs defaultValue={theme} >
    <TabsList className='border flex gap-4 md:gap-8'>
        
        <TabsTrigger value='dark' onClick={() => setTheme("dark")} className='w-1/3 md:w-auto'>
            <MoonIcon className='h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0'/>
        </TabsTrigger>
        <TabsTrigger value='system' onClick={() => setTheme("system")} className='w-1/3 md:w-auto'>
            <DesktopIcon className='h-[1.2rem] w-[1.2rem]'/>
        </TabsTrigger>
    </TabsList>
   </Tabs>
  )
}

export default ThemeSwitcher