"use client";

import React, { use, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';
import { ImShare } from 'react-icons/im';

const FormLinkShare  = ({ shareUrl}: {shareUrl: string}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if(!mounted) {
        return null;
    } // prevent ssr warning (window is undefined)

    const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
        <Input value={shareLink} readOnly />
        <Button 
        className='w-[250px]'
        onClick={() => {
            navigator.clipboard.writeText(shareLink);
            toast({
                title: 'Copied to clipboard',
                description: "Link copied to clipboard"
            });
        }}>
            <ImShare className="mr-2 h-4 w-4" />
            Share Link
        </Button>
    </div>
  )
}

export default FormLinkShare ;