import { Rnd } from 'react-rnd'
import { useEffect, useState, RefObject } from 'react'

interface FrameProps {
  width?: string;
  height?: string;
  aspectRatio: number;
  slides: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export const Frame = ({ width, height, aspectRatio, slides, containerRef }: FrameProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (containerRef.current && (width === '100%' || height === '100%')) {
      const container = containerRef.current
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      if (width === '100%') {
        const newWidth = containerWidth
        const newHeight = newWidth / aspectRatio
        setSize({ width: newWidth, height: newHeight })
      } else if (height === '100%') {
        const newHeight = containerHeight
        const newWidth = newHeight * aspectRatio
        setSize({ width: newWidth, height: newHeight })
      }
    }
  }, [width, height, aspectRatio, containerRef])

  const renderDividers = () => {
    const dividers = []
    for (let i = 1; i < slides; i++) {
      const percentage = (i / slides) * 100
      dividers.push(
        <div
          key={i}
          className="absolute top-0 bottom-0 border-l-1 border-blue-500/70"
          style={{ left: `${percentage}%` }}
        />
      )
    }
    return dividers
  }

  const handleResize = (e: any, direction: any, ref: any, delta: any, position: any) => {
    const newWidth = ref.offsetWidth
    const newHeight = ref.offsetHeight

    // Maintain aspect ratio during resize
    if (direction.includes('left') || direction.includes('right')) {
      const height = newWidth / aspectRatio
      setSize({ width: newWidth, height })
    } else {
      const width = newHeight * aspectRatio
      setSize({ width, height: newHeight })
    }
    setPosition(position)
  }

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y })
      }}
      onResize={handleResize}
      bounds="parent"
      minWidth={100}
      lockAspectRatio={aspectRatio}
      className="border-2 border-blue-500/70"
      resizeHandleStyles={{
        topRight: { cursor: 'ne-resize' },
        topLeft: { cursor: 'nw-resize' },
        bottomRight: { cursor: 'se-resize' },
        bottomLeft: { cursor: 'sw-resize' },
      }}
      enableResizing={{
        top: false,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true
      }}
    >
      {renderDividers()}
    </Rnd>
  )
} 