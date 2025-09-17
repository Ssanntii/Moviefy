import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'


import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Routes from './routes/Routes'

function App() {

  return (
    <BrowserRouter>
      <Route 
        render={(props) => (
          <>
            <Header {...props}/>

            <Routes />

            <Footer />
          </>
        )}
      />
    </BrowserRouter>
  )
}

export default App
