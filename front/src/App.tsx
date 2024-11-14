import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import AttackPage from './pages/attackPage/AttackPage'

function App() {


  return (
    <>
 <Routes>
 <Route path="/register" element={<RegisterPage />} />
 <Route path="/login" element={<LoginPage />} /> 
 <Route path="/" element={<LoginPage />} />
 <Route path="/attackPage" element={<AttackPage/>} /> 
 </Routes>
    </>
  )
}

export default App
