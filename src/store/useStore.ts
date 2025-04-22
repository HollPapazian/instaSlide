import { create } from 'zustand'

export type AspectRatio = '1:1' | '1.91:1' | '4:5'
export type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp'

interface Size {
  width: number
  height: number
}

interface Position {
  x: number
  y: number
}

const initialState = {
  selectedImage: null,
  selectedRatio: '1:1' as AspectRatio,
  selectedFormat: 'image/png' as ImageFormat,
  slides: 3,
  isImageLoaded: false,
  size: { width: 0, height: 0 },
  position: { x: 0, y: 0 },
}

interface Store {
  selectedImage: string | null
  selectedRatio: AspectRatio
  selectedFormat: ImageFormat
  slides: number
  isImageLoaded: boolean
  size: Size
  position: Position
  setSelectedImage: (image: string | null) => void
  setSelectedRatio: (ratio: AspectRatio) => void
  setSelectedFormat: (format: ImageFormat) => void
  setSlides: (slides: number) => void
  setIsImageLoaded: (loaded: boolean) => void
  setSize: (size: Size) => void
  setPosition: (position: Position) => void
  reset: () => void
  isInitialState: () => boolean
}

export const useStore = create<Store>((set, get) => ({
  ...initialState,
  setSelectedImage: (image) => set({ selectedImage: image }),
  setSelectedRatio: (ratio) => set({ selectedRatio: ratio }),
  setSelectedFormat: (format) => set({ selectedFormat: format }),
  setSlides: (slides) => set({ slides }),
  setIsImageLoaded: (loaded) => set({ isImageLoaded: loaded }),
  setSize: (size) => set({ size }),
  setPosition: (position) => set({ position }),
  reset: () => set(initialState),
  isInitialState: () => {
    const state = get()
    return (
      state.selectedRatio === initialState.selectedRatio &&
      state.selectedFormat === initialState.selectedFormat &&
      state.slides === initialState.slides &&
      state.size.width === initialState.size.width &&
      state.size.height === initialState.size.height &&
      state.position.x === initialState.position.x &&
      state.position.y === initialState.position.y
    )
  }
})) 