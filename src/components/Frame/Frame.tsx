import { Rnd } from 'react-rnd'
import { useEffect, useState, RefObject, useMemo } from 'react'
import { FrameDividers } from '../FrameDividers/FrameDividers'
import { useStore } from '../../store/useStore'

interface FrameProps {
    containerRef: RefObject<HTMLDivElement>;
    isImageLoaded: boolean;
}

export const Frame = ({ containerRef, isImageLoaded }: FrameProps) => {
    const {
        selectedRatio,
        slides,
        size,
        position,
        setSize,
        setPosition
    } = useStore()
    const [frameStyle, setFrameStyle] = useState<{ width?: string; height?: string }>({})

    const aspectRatio = useMemo(() => {
        const ratioMap = {
            '1:1': { width: 1, height: 1 },
            '1.91:1': { width: 1.91, height: 1 },
            '4:5': { width: 4, height: 5 }
        }

        const baseRatio = ratioMap[selectedRatio]
        return (baseRatio.width * slides) / baseRatio.height
    }, [selectedRatio, slides])

    useEffect(() => {
        const updateFrameSize = () => {
            const container = containerRef.current
            if (!container || !isImageLoaded) return

            const containerWidth = container.clientWidth
            const containerHeight = container.clientHeight
            const heightIfWidthIs100 = containerWidth / aspectRatio

            if (heightIfWidthIs100 <= containerHeight) {
                setFrameStyle({
                    width: '100%',
                    height: 'auto',
                })
            } else {
                setFrameStyle({
                    width: 'auto',
                    height: '100%',
                })
            }
            setPosition({ x: 0, y: 0 })
        }

        updateFrameSize()
        window.addEventListener('resize', updateFrameSize)
        return () => window.removeEventListener('resize', updateFrameSize)
    }, [aspectRatio, containerRef, isImageLoaded])

    useEffect(() => {
        if (containerRef.current && (frameStyle.width === '100%' || frameStyle.height === '100%')) {
            const container = containerRef.current
            const containerWidth = container.clientWidth
            const containerHeight = container.clientHeight

            if (frameStyle.width === '100%') {
                const newWidth = containerWidth
                const newHeight = newWidth / aspectRatio
                setSize({ width: newWidth, height: newHeight })
            } else if (frameStyle.height === '100%') {
                const newHeight = containerHeight
                const newWidth = newHeight * aspectRatio
                setSize({ width: newWidth, height: newHeight })
            }
        }
    }, [frameStyle, aspectRatio, containerRef, setSize])

    const handleResize = (_e: any, direction: any, ref: any, _delta: any, position: any) => {
        const newWidth = ref.offsetWidth
        const newHeight = ref.offsetHeight

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
            onDragStop={(_e, d) => {
                setPosition({ x: d.x, y: d.y })
            }}
            onResize={handleResize}
            bounds="parent"
            minWidth={100}
            lockAspectRatio={aspectRatio}
            className="bg-transparent"
            style={{
                zIndex: 10
            }}
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
            <div
                className="absolute inset-0"
                style={{
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)'
                }}
            />
            <FrameDividers slidesCount={slides} />
        </Rnd>
    )
} 