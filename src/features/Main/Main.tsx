import { useState, ChangeEvent, useMemo, useRef, useEffect } from 'react'
import { Frame } from '../../components/Frame/Frame'

type AspectRatio = '1:1' | '1.91:1' | '4:5'

export const Main = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('1:1')
  const [slides, setSlides] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)
  const [frameStyle, setFrameStyle] = useState<{ width?: string; height?: string }>({})

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const handleSlidesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    if (value >= 1 && value <= 10) {
      setSlides(value)
    }
  }

  const frameRatio = useMemo(() => {
    const ratioMap = {
      '1:1': { width: 1, height: 1 },
      '1.91:1': { width: 1.91, height: 1 },
      '4:5': { width: 4, height: 5 }
    }

    const baseRatio = ratioMap[selectedRatio]
    return {
      width: baseRatio.width * slides,
      height: baseRatio.height
    }
  }, [selectedRatio, slides])

  useEffect(() => {
    setIsImageLoaded(false)
  }, [selectedImage])

  useEffect(() => {
    const updateFrameSize = () => {
      const container = containerRef.current
      if (!container || !isImageLoaded) return

      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight
      const aspectRatio = frameRatio.width / frameRatio.height

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
  }, [frameRatio, isImageLoaded])


  return (
    <main className="w-[min(100%,1024px)] mx-auto px-4 min-h-screen pt-20 pb-16">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-800 file:text-white
            hover:file:bg-gray-700
            cursor-pointer"
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Ratio:
            </label>
            <div className="flex gap-2">
              {(['1:1', '1.91:1', '4:5'] as AspectRatio[]).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setSelectedRatio(ratio)}
                  className={`
                    px-4 py-2 rounded-lg font-medium
                    ${selectedRatio === ratio
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                    transition-colors duration-200
                  `}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="slides" className="text-sm font-medium text-gray-700">
              Slides:
            </label>
            <input
              id="slides"
              type="number"
              min="1"
              max="10"
              value={slides}
              onChange={handleSlidesChange}
              className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>

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
                  width={frameStyle.width}
                  height={frameStyle.height}
                  aspectRatio={frameRatio.width / frameRatio.height}
                  slides={slides}
                  containerRef={containerRef}
                  imageUrl={selectedImage}
                />
              )}
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              Upload an image to see preview
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 