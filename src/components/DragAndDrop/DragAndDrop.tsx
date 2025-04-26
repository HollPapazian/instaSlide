import { ReactNode, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useImageUpload } from '../../hooks/useImageUpload'

interface DragAndDropProps {
  children: ReactNode
}

export const DragAndDrop = ({ children }: DragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const { handleImageUpload } = useImageUpload()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const event = { target: { files: acceptedFiles } } as unknown as React.ChangeEvent<HTMLInputElement>
      handleImageUpload(event)
    }
    setIsDragging(false)
  }, [handleImageUpload])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    noClick: true,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: (e) => {
      if (!e.relatedTarget) {
        setIsDragging(false)
      }
    }
  })

  return (
    <div {...getRootProps()} className="min-h-screen">
      <input {...getInputProps()} />
      {isDragging && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              Drop your image here to upload it
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  )
} 