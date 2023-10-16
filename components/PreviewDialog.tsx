import React from 'react'
import { Button } from './ui/button'
import { MdPreview } from 'react-icons/md'
const PreviewDialog = () => {
  return <Button variant={"outline"} className='gap-2'> 
    <MdPreview  className="h-6 w-6"/>
    preview
    </Button>;
}

export default PreviewDialog