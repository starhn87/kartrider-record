import React from 'react'
import Template from './components/Template'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Home from './routes/Home'
import Ranking from './routes/Ranking'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Home />} />
          <Route path="rank" element={<Ranking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
