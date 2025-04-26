import './App.css'
import { Header } from './features/Header/Header'
import { Footer } from './features/Footer/Footer'
import { Main } from './features/Main/Main'
import { DragAndDrop } from './components/DragAndDrop/DragAndDrop'

function App() {
  return (
    <DragAndDrop>
      <Header />
      <Main />
      <Footer />
    </DragAndDrop>
  )
}

export default App
