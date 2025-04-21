import { useStore } from '../../store/useStore'

type AspectRatio = '1:1' | '1.91:1' | '4:5'

export const RatioSelector = () => {
  const { selectedRatio, setSelectedRatio } = useStore()

  return (
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
  )
} 