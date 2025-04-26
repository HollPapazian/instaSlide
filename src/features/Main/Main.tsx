import { useRef } from 'react'
import { Frame } from '../../components/Frame/Frame'
import { useStore } from '../../store/useStore'
import { FileSelector } from '../../components/FileSelector/FileSelector'
import { RatioSelector } from '../../components/RatioSelector/RatioSelector'
import { SlidesSelector } from '../../components/SlidesSelector/SlidesSelector'
import { FormatSelector } from '../../components/FormatSelector/FormatSelector'
import { CropAndSlice } from '../../components/CropAndSlice/CropAndSlice'
import { Instructions } from '../../components/Instructions/Instructions'

export const Main = () => {
  const {
    selectedImage,
    isImageLoaded,
    setIsImageLoaded
  } = useStore()
  const containerRef = useRef<HTMLDivElement>(null!)

  return (
    <main className="w-[min(100%,1024px)] mx-auto px-4 min-h-screen pt-22 pb-16">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <FileSelector />
          <RatioSelector />
          <SlidesSelector />
          <FormatSelector />
        </div>

        <div
          ref={containerRef}
          id="container"
          className="w-full min-h-[50px] bg-gray-100 relative overflow-hidden"
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
            <div className="h-32 flex items-center justify-center text-gray-400">
              Upload an image to see preview
            </div>
          )}
        </div>
        <CropAndSlice containerRef={containerRef} />
        <Instructions />
      </div>
    </main>
  )
} 