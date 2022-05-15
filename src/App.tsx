import React, { Suspense } from 'react'
import Layout from './components/common/Layout'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Ranking from './pages/Ranking'
import { QueryClient, QueryClientProvider } from 'react-query'
import Kart from './pages/Kart'
import Track from './pages/Track'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="rank" element={<Ranking />} />
            <Route path="kart" element={<Kart />} />
            <Route path="track" element={<Track />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
