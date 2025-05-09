import { InstallPWA } from './InstallPWA'

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 fixed left-0 right-0 top-0 w-full z-50">
      <div className="max-w-[1024px] mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <img src="/assets/logo_mini.webp" alt="instaslide logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">InstaSlide</h1>
        </div>
        <InstallPWA />
      </div>
    </header>
  )
} 