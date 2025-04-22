import { useState, RefObject } from 'react'
import { useStore } from '../../store/useStore'

interface CropAndSliceProps {
    containerRef: RefObject<HTMLDivElement>
}

interface CroppedImage {
    url: string
    index: number
}

const getFileExtension = (mimeType: string): string => {
    switch (mimeType) {
        case 'image/jpeg':
            return 'jpg'
        case 'image/png':
            return 'png'
        case 'image/webp':
            return 'webp'
        case 'image/bmp':
            return 'bmp'
        default:
            return 'png'
    }
}

export const CropAndSlice = ({ containerRef }: CropAndSliceProps) => {
    const { size, position, slides, selectedImage, selectedFormat } = useStore()
    const [croppedImages, setCroppedImages] = useState<CroppedImage[]>([])
    const [isProcessing, setIsProcessing] = useState(false)

    const cropAndSplit = async () => {
        if (!containerRef.current || !selectedImage) return
        setIsProcessing(true)
        setCroppedImages([])
        try {
            // Load the original image
            const img = new Image()
            img.src = selectedImage
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

                // Convert to data URL with selected format
                const quality = selectedFormat === 'image/jpeg' || selectedFormat === 'image/webp' ? 1.0 : undefined
                newCroppedImages.push({
                    url: slideCanvas.toDataURL(selectedFormat, quality),
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
        link.download = `slide-${index}.${getFileExtension(selectedFormat)}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex flex-col gap-2 z-20 items-start">
            <button
                onClick={cropAndSplit}
                disabled={isProcessing || !selectedImage}
                className="w-fit px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? 'Processing...' : 'Crop and Split'}
            </button>
            <div className="flex flex-col gap-2">
                {croppedImages.map((img) => (
                    <button
                        key={img.index}
                        onClick={() => downloadImage(img.url, img.index)}
                        className="w-fit px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Download Slide {img.index}
                    </button>
                ))}
            </div>
        </div>
    )
} 