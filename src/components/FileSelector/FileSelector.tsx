import { ChangeEvent } from 'react'
import { useStore } from '../../store/useStore'

export const FileSelector = () => {
  const { setSelectedImage, setIsImageLoaded } = useStore()

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setIsImageLoaded(false)
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  return (
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
  )
} 