import { ChangeEvent } from 'react'
import { useStore } from '../../store/useStore'

export const SlidesSelector = () => {
  const { slides, setSlides } = useStore()

  const handleSlidesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    if (value >= 1 && value <= 10) {
      setSlides(value)
    }
  }

  return (
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
  )
} 