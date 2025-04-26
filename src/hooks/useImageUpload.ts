import { ChangeEvent } from 'react'
import { useStore, type ImageFormat } from '../store/useStore'

const getMimeType = (file: File): ImageFormat => {
  const supportedFormats: ImageFormat[] = ['image/png', 'image/jpeg', 'image/webp', 'image/bmp']
  return supportedFormats.includes(file.type as ImageFormat) 
    ? file.type as ImageFormat 
    : 'image/jpeg'
}

export const useImageUpload = () => {
  const { setSelectedImage, setIsImageLoaded, setSelectedFormat } = useStore()

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setIsImageLoaded(false)
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setSelectedFormat(getMimeType(file))
    }
  }

  return { handleImageUpload }
} 