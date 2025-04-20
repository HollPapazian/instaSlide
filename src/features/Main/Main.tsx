import { useState, ChangeEvent } from 'react'

type AspectRatio = '1:1' | '1.91:1' | '4:5'

export const Main = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('1:1')
  const [slides, setSlides] = useState(3)

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
        
        <div id="container" className="w-full bg-gray-100 relative overflow-hidden">
          {selectedImage ? (
            <>
              <img 
                src={selectedImage} 
                alt="Uploaded preview" 
                className="max-w-full h-auto mx-auto"
              />
              <div 
                id="frame" 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] border-2 border-white"
              />
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