import { RefObject, useRef } from 'react'
import { useStore } from '../../store/useStore'
import { Frame } from '../Frame/Frame'
import { useImageUpload } from '../../hooks/useImageUpload'

interface ImageBlockProps {
  containerRef: RefObject<HTMLDivElement>
}

export const ImageBlock = ({ containerRef }: ImageBlockProps) => {
  const {
    selectedImage,
    isImageLoaded,
    setIsImageLoaded
  } = useStore()
  const { handleImageUpload } = useImageUpload()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleContainerClick = () => {
    if (!selectedImage) {
      fileInputRef.current?.click()
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <div
        ref={containerRef}
        className={`w-full min-h-[50px] bg-gray-100 relative overflow-hidden ${!selectedImage ? 'cursor-pointer' : ''}`}
      >
        {selectedImage ? (
          <>
            <img
              src={selectedImage}
              alt="Uploaded preview"
              className="max-w-full h-auto mx-auto"
              onLoad={() => setIsImageLoaded(true)}
            />
            {isImageLoaded && (
              <Frame
                containerRef={containerRef}
                isImageLoaded={isImageLoaded}
              />
            )}
          </>
        ) : (
          <div className="h-32 flex items-center justify-center text-gray-400" onClick={handleContainerClick}>
            Click here to upload an image
          </div>
        )}
      </div>
    </>
  )
} 