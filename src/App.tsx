import React, { Suspense } from 'react'
import Template from './components/Template'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './routes/Home'
import Ranking from './routes/Ranking'
import { QueryClient, QueryClientProvider } from 'react-query'

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
          <Route path="/" element={<Template />}>
            <Route index element={<Home />} />
            <Route path="rank" element={<Ranking />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
