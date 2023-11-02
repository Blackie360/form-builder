"use client";

import React, { use, useEffect, useState } from 'react'
import { Button } from './ui/button';

const VisitBtn  = ({ shareUrl}: {shareUrl: string}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if(!mounted) {
        return null;
    } // prevent ssr warning (window is undefined)

    const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <Button 
    className='w-[200px]'
    onClick={() => {
        window.open(shareLink, '_blank');
    }}
    >
        visit
    </Button>
  )
}

export default VisitBtn 