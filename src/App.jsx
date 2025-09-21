import { BrowserRouter } from 'react-router-dom'

import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

import AppRoutes from '../src/routes/Routes'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App