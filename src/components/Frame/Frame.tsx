import { Rnd } from 'react-rnd'
import { useEffect, useState, RefObject } from 'react'
import { FrameDividers } from '../FrameDividers/FrameDividers'

interface FrameProps {
    aspectRatio: number;
    slides: number;
    containerRef: RefObject<HTMLDivElement>;
    imageUrl: string;
    isImageLoaded: boolean;
}

interface CroppedImage {
    url: string;
    index: number;
}

export const Frame = ({ aspectRatio, slides, containerRef, isImageLoaded, imageUrl }: FrameProps) => {
    const [size, setSize] = useState({ width: 0, height: 0 })
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [croppedImages, setCroppedImages] = useState<CroppedImage[]>([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [frameStyle, setFrameStyle] = useState<{ width?: string; height?: string }>({})

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
    }, [frameStyle, aspectRatio, containerRef])

    const handleResize = (e: any, direction: any, ref: any, delta: any, position: any) => {
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

    const cropAndSplit = async () => {
        if (!containerRef.current) return;
        setIsProcessing(true)

        try {
            // Load the original image
            const img = new Image()
            img.src = imageUrl
            await new Promise((resolve) => {
                img.onload = resolve
            })

            // Get container and frame dimensions
            const container = containerRef.current
            const containerRect = container.getBoundingClientRect()

            // Calculate scale factors
            const scaleX = img.width / containerRect.width
            const scaleY = img.height / containerRect.height

            // Calculate crop dimensions in original image coordinates
            const cropX = position.x * scaleX
            const cropY = position.y * scaleY
            const cropWidth = size.width * scaleX
            const cropHeight = size.height * scaleY

            // Create canvas for the cropped area
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) return

            canvas.width = cropWidth
            canvas.height = cropHeight

            // Draw the cropped region
            ctx.drawImage(
                img,
                cropX, cropY, cropWidth, cropHeight,
                0, 0, cropWidth, cropHeight
            )

            // Split the cropped image into slides
            const slideWidth = cropWidth / slides
            const newCroppedImages: CroppedImage[] = []

            for (let i = 0; i < slides; i++) {
                const slideCanvas = document.createElement('canvas')
                const slideCtx = slideCanvas.getContext('2d')
                if (!slideCtx) continue

                slideCanvas.width = slideWidth
                slideCanvas.height = cropHeight

                // Draw portion of the cropped image
                slideCtx.drawImage(
                    canvas,
                    i * slideWidth, 0, slideWidth, cropHeight,
                    0, 0, slideWidth, cropHeight
                )

                // Convert to data URL
                newCroppedImages.push({
                    url: slideCanvas.toDataURL('image/png'),
                    index: i + 1
                })
            }

            setCroppedImages(newCroppedImages)
        } catch (error) {
            console.error('Error processing image:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    const downloadImage = (url: string, index: number) => {
        const link = document.createElement('a')
        link.href = url
        link.download = `slide-${index}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <div className="absolute inset-0 bg-transparent" />
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

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {croppedImages.length === 0 ? (
                    <button
                        onClick={cropAndSplit}
                        disabled={isProcessing}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? 'Processing...' : 'Crop and Split'}
                    </button>
                ) : (
                    croppedImages.map((img) => (
                        <button
                            key={img.index}
                            onClick={() => downloadImage(img.url, img.index)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Download Slide {img.index}
                        </button>
                    ))
                )}
            </div>
        </>
    )
} 