import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { SpeedInsights } from "@vercel/speed-insights/next"

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#1c1c1c",
          color: "#fff",
          borderRadius: "0.75rem",
          padding: "0.75rem 1rem",
        },
        success: {
          iconTheme: { primary: "#C5A253", secondary: "#fff" },
        },
      }}
    />
    </BrowserRouter>
  </React.StrictMode>,
)
