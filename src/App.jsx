import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import AppRoutes from './routes/Routes'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-teal-800 to-cyan-700">
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App