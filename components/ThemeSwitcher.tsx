"use client"
import { SunIcon } from '@radix-ui/react-icons';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if(!mounted) return null;
  return (
   <Tabs defaultValue={theme}>
    <TabsList className='border'>
        <TabsTrigger value='ligh' onClick={() => setTheme("light")}>
            <SunIcon className='h-[1.2rem] w-[1.2rem]'/>
        </TabsTrigger>
    </TabsList>
   </Tabs>
  )
}

export default ThemeSwitcher