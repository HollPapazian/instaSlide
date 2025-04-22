import { useStore } from '../../store/useStore'

export const ResetButton = () => {
    const { reset, isInitialState } = useStore()

    if (isInitialState()) {
        return null
    }

    return (
        <button
            onClick={reset}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
            Reset
        </button>
    )
} 