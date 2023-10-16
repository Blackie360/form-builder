import { useDndMonitor } from '@dnd-kit/core'
import React from 'react'

const DragOverlayWrapper = () => {

    useDndMonitor({
        onDragStart: (event) => {
            console.log('onDragStart', event)
        }
    })

  return (
    <div>DragOverlayWrapper</div>
  )
}

export default DragOverlayWrapper