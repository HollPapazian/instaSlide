export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 fixed top-0 w-full">
      <div className="max-w-[1024px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/assets/logo_mini.webp" alt="instaslide logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold">InstaSlide</h1>
        </div>
      </div>
    </header>
  )
} 