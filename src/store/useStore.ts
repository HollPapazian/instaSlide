import { create } from 'zustand'

type AspectRatio = '1:1' | '1.91:1' | '4:5'

interface Store {
  selectedImage: string | null
  selectedRatio: AspectRatio
  slides: number
  isImageLoaded: boolean
  setSelectedImage: (image: string | null) => void
  setSelectedRatio: (ratio: AspectRatio) => void
  setSlides: (slides: number) => void
  setIsImageLoaded: (loaded: boolean) => void
}

export const useStore = create<Store>((set) => ({
  selectedImage: null,
  selectedRatio: '1:1',
  slides: 3,
  isImageLoaded: false,
  setSelectedImage: (image) => set({ selectedImage: image }),
  setSelectedRatio: (ratio) => set({ selectedRatio: ratio }),
  setSlides: (slides) => set({ slides }),
  setIsImageLoaded: (loaded) => set({ isImageLoaded: loaded }),
})) 