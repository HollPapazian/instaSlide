import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <header className="bg-gray-800 text-white p-4 fixed top-0 w-full">
        <div className="max-w-[1024px] mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">InstaSlide</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">About</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="w-[min(100%,1024px)] mx-auto px-4 min-h-screen pt-20 pb-16">
      </main>

      <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full">
        <div className="max-w-[1024px] mx-auto text-center">
          <p>&copy; 2024 InstaSlide. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
