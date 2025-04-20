import { useState, ChangeEvent } from 'react'

export const Main = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
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