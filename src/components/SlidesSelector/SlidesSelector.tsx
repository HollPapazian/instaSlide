import { useStore } from '../../store/useStore'

export const SlidesSelector = () => {
  const { slides, setSlides } = useStore()

  const increment = () => {
    if (slides < 10) {
      setSlides(slides + 1)
    }
  }

  const decrement = () => {
    if (slides > 1) {
      setSlides(slides - 1)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="slides" className="text-sm font-medium text-gray-700">
        Slides:
      </label>
      <div className="flex items-center">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-lg border border-gray-300 font-medium"
          aria-label="Decrease slides"
        >
          -
        </button>
        <input
          id="slides"
          type="number"
          readOnly
          value={slides}
          className="w-12 px-2 py-1 text-center border-y border-gray-300 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          onClick={increment}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-lg border border-gray-300 font-medium"
          aria-label="Increase slides"
        >
          +
        </button>
      </div>
    </div>
  )
} 