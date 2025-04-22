import { useStore, type ImageFormat } from '../../store/useStore'

interface FormatOption {
  value: ImageFormat
  label: string
  quality?: number
}

const formatOptions: FormatOption[] = [
  { value: 'image/png', label: 'PNG' },
  { value: 'image/jpeg', label: 'JPG', quality: 1.0 },
  { value: 'image/webp', label: 'WebP', quality: 1.0 },
  { value: 'image/bmp', label: 'BMP' }
]

export const FormatSelector = () => {
  const { selectedFormat, setSelectedFormat } = useStore()

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">
        Format:
      </label>
      <div className="flex gap-2">
        {formatOptions.map((format) => (
          <button
            key={format.value}
            onClick={() => setSelectedFormat(format.value)}
            className={`
              px-4 py-2 rounded-lg font-medium
              ${selectedFormat === format.value
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
              transition-colors duration-200
            `}
          >
            {format.label}
          </button>
        ))}
      </div>
    </div>
  )
} 