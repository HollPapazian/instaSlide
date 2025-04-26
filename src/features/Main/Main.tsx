import { useRef } from 'react'
import { FileSelector } from '../../components/FileSelector/FileSelector'
import { RatioSelector } from '../../components/RatioSelector/RatioSelector'
import { SlidesSelector } from '../../components/SlidesSelector/SlidesSelector'
import { FormatSelector } from '../../components/FormatSelector/FormatSelector'
import { CropAndSlice } from '../../components/CropAndSlice/CropAndSlice'
import { Instructions } from '../../components/Instructions/Instructions'
import { ImageBlock } from '../../components/ImageBlock/ImageBlock'

export const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null!)

  return (
    <main className="w-[min(100%,1024px)] mx-auto px-4 min-h-screen pt-22 pb-16">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <FileSelector />
          <RatioSelector />
          <SlidesSelector />
          <FormatSelector />
        </div>

        <ImageBlock containerRef={containerRef} />
        <CropAndSlice containerRef={containerRef} />
        <Instructions />
      </div>
    </main>
  )
} 